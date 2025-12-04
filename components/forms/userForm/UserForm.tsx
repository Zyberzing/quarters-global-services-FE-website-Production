'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import handleAsync from '@/lib/handleAsync';
import { createUser, editUser } from '@/services/usersService';
import { parsePhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { commonFieldSchema, emailSchema, passwordSchema } from '@/lib/formSchemaFunctions';
import { RoleDataType, UserDataType } from '@/lib/Types';
import { getRoles } from '@/services/rolesService';

const formSchema = z.object({
    firstName: commonFieldSchema(),
    lastName: commonFieldSchema(),
    email: emailSchema(),
    countryCode: commonFieldSchema(),
    phone: commonFieldSchema(),
    subAdminRoleId: commonFieldSchema(),
    password: passwordSchema().optional().or(z.literal('')),
});

export type UserFormSchemaType = z.infer<typeof formSchema>;

const UserForm = ({ isView = false, userData }: { isView?: boolean; userData?: UserDataType }) => {
    const router = useRouter();
    const [roles, setRoles] = useState<RoleDataType[]>([]);
    const form = useForm<UserFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            email: userData?.email || '',
            phone: userData?.phone || '',
            countryCode: userData?.countryCode || '',
            subAdminRoleId: userData?.subAdminRoleId?._id || '',
            password: '',
        },
    });
    console.log(form.formState.errors, ':Form Errors');

    const onSubmit = handleAsync(async (values: UserFormSchemaType) => {
        if (isView) return;
        const prePareData = {
            ...values,
            role: 'sub-admin',
        };
        if (userData) {
            await editUser(userData._id, prePareData);
            toast.success('User updated successfully');
        } else {
            await createUser(prePareData);
            toast.success('User created successfully');
        }
        form.reset({});
        router.push('/dashboard/users-and-roles?activeTab=users');
    });

    useEffect(() => {
        (async () => {
            const roles = await getRoles();
            setRoles(roles.data);
        })();
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
                    {isView && <div className=" font-semibold col-span-2 border-b pb-2">User Details</div>}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input readOnly={isView} placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input readOnly={isView} placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input readOnly={isView} type="email" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        readOnly={isView}
                                        placeholder=""
                                        {...field}
                                        onChange={(value) => {
                                            if (!value) {
                                                return;
                                            }

                                            const phoneNumber = parsePhoneNumber(value);
                                            if (phoneNumber) {
                                                form.setValue('countryCode', phoneNumber.countryCallingCode);
                                                field.onChange(value);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subAdminRoleId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roles.map((e) => (
                                            <SelectItem key={e._id + '-role'} value={e._id}>
                                                {e.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
                    {!isView && (
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input readOnly={isView} placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <div className="flex items-center gap-2 justify-end">
                    <Link href="/admin/users-and-roles">
                        <Button type="button" variant="outline" disabled={form.formState.isSubmitting}>
                            {isView ? 'Back' : 'Cancel'}
                        </Button>
                    </Link>
                    {!isView && (
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            Submit
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default UserForm;