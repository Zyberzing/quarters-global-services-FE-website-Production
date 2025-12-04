'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileInput } from '@/components/ui/file-input';
import { useRouter } from 'next/navigation';
import { CustomerDataType } from '@/services/customerService';

import { fetcher } from '@/lib/fetcher';
import { UserDataType } from '@/lib/Types';
import { uploadFile } from '@/lib/uploadFile';

const ticketFormSchema = z.object({
  status: z.enum(['Open', 'Closed', 'Resolved', 'Waiting on Customer', 'Urgent']),
  priority: z.enum(['Low', 'Normal', 'High', 'Urgent']),
  customer: z.string().min(1, 'Customer is required'),
  applicationId: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().optional(),
  assignedStaff: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().optional(),
  passportScan: z.any().optional(),
  serviceForm: z.any().optional(),
  signature: z.any().optional(),
});

type TicketFormData = z.infer<typeof ticketFormSchema>;

interface TicketFormProps {
  isView?: boolean;
  isEdit?: boolean;
  customers?: CustomerDataType[];
  staff?: UserDataType[];
  ticketData?: {
    _id?: string;
    status?: TicketFormData['status'];
    priority?: TicketFormData['priority'];
    customer?: string;
    applicationId?: string;
    category?: string;
    subCategory?: string;
    assignedStaff?: string;
    subject?: string;
    description?: string;
    attachments?: {
      passportScan?: string;
      serviceForm?: string;
      signature?: string;
    };
  };
}

const TicketForm = ({
  isView = false,
  isEdit = false,
  ticketData,
  customers = [],
  staff = [],
}: TicketFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      status: ticketData?.status || 'Open',
      priority: ticketData?.priority || 'Normal',
      customer: ticketData?.customer || '',
      applicationId: ticketData?.applicationId || '',
      category: ticketData?.category || '',
      subCategory: ticketData?.subCategory || '',
      assignedStaff: ticketData?.assignedStaff || '',
      subject: ticketData?.subject || '',
      description: ticketData?.description || '',
      passportScan: null,
      serviceForm: null,
      signature: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof ticketFormSchema>) => {
    if (isView) return;

    try {
      setIsLoading(true);

      // Step 1: Upload files if they are new File objects
      let passportScanUrl = ticketData?.attachments?.passportScan || '';
      let serviceFormUrl = ticketData?.attachments?.serviceForm || '';
      let signatureUrl = ticketData?.attachments?.signature || '';

      if (data.passportScan instanceof File) {
        console.log('Uploading passport scan...');
        const uploadedUrl = await uploadFile(data.passportScan, 'ticket-passport-scan');
        if (!uploadedUrl) {
          throw new Error('Failed to upload passport scan');
        }
        passportScanUrl = uploadedUrl;
      }

      if (data.serviceForm instanceof File) {
        console.log('Uploading service form...');
        const uploadedUrl = await uploadFile(data.serviceForm, 'ticket-service-form');
        if (!uploadedUrl) {
          throw new Error('Failed to upload service form');
        }
        serviceFormUrl = uploadedUrl;
      }

      if (data.signature instanceof File) {
        console.log('Uploading signature...');
        const uploadedUrl = await uploadFile(data.signature, 'ticket-signature');
        if (!uploadedUrl) {
          throw new Error('Failed to upload signature');
        }
        signatureUrl = uploadedUrl;
      }

      // Step 2: Prepare the payload with uploaded URLs
      const payload = {
        customer: data.customer,
        applicationId: data.applicationId || '',
        category: data.category,
        subCategory: data.subCategory || '',
        assignedStaff: data.assignedStaff || '',
        subject: data.subject,
        description: data.description || '',
        priority: data.priority,
        status: data.status,
        attachments: {
          passportScan: passportScanUrl,
          serviceForm: serviceFormUrl,
          signature: signatureUrl,
        },
      };

      console.log('Payload being sent:', payload);

      if (isEdit && ticketData?._id) {
        // Update existing ticket
        await fetcher(`/ticket/update-ticket/${ticketData._id}`, {
          method: 'PUT',
          body: payload,
        });
        toast.success('Ticket Updated Successfully');
      } else {
        // Create new ticket
        await fetcher('/ticket/create-ticket', {
          method: 'POST',
          body: payload,
        });
        // await createTicket(payload);
        toast.success('Ticket Created Successfully');
      }

      // Redirect to tickets list
      router.push('/admin/tickets');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
      console.error(`Error ${isEdit ? 'updating' : 'creating'} ticket:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToTickets = () => {
    router.push('/admin/tickets');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4 p-4 border rounded-lg">
          <div className="col-span-2 border-b pb-2 flex items-center justify-between">
            <p className="font-semibold">
              {isEdit && ticketData?._id
                ? `Ticket ID : #${ticketData._id.slice(-8)}`
                : 'Create New Ticket'}
            </p>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                      <SelectItem value="Waiting on Customer">Waiting</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Customer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer._id} value={customer._id}>
                        {customer.firstName} {customer.lastName} ({customer.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linked Application ID</FormLabel>
                <FormControl>
                  <Input placeholder="App ID" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Application Process">Application Process</SelectItem>
                    <SelectItem value="Status Inquiry">Status Inquiry</SelectItem>
                    <SelectItem value="Complaint">Complaint</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Sub Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Staff</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff..." />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((staffMember) => (
                      <SelectItem key={staffMember._id} value={staffMember._id}>
                        {staffMember.firstName} {staffMember.lastName} ({staffMember.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Attachments */}
        <div className="p-4 border rounded-lg space-y-4">
          <p className="font-semibold col-span-2 border-b pb-2">Attachments</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField<z.infer<typeof ticketFormSchema>>
              control={form.control}
              name="passportScan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Scan</FormLabel>
                  <FormControl>
                    <FileInput
                      onFileChange={field.onChange}
                      existingFileUrl={ticketData?.attachments?.passportScan}
                      existingFileName="passport-scan.pdf"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField<z.infer<typeof ticketFormSchema>>
              control={form.control}
              name="serviceForm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Form</FormLabel>
                  <FormControl>
                    <FileInput
                      onFileChange={field.onChange}
                      existingFileUrl={ticketData?.attachments?.serviceForm}
                      existingFileName="service-form.pdf"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField<z.infer<typeof ticketFormSchema>>
              control={form.control}
              name="signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Signature</FormLabel>
                  <FormControl>
                    <FileInput
                      onFileChange={field.onChange}
                      existingFileUrl={ticketData?.attachments?.signature}
                      existingFileName="signature.pdf"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        {!isView && (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={handleBackToTickets}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? isEdit
                  ? 'Updating...'
                  : 'Creating...'
                : isEdit
                  ? 'Update Ticket'
                  : 'Create Ticket'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default TicketForm;
