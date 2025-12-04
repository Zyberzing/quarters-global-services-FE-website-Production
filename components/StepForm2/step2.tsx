"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stepOtherDetailsSchema,
  StepOtherDetailsData,
} from "@/lib/validationSchemas";

type Props = {
  onNext: (data: StepOtherDetailsData) => void;
  onBack: () => void;
};
 

export default function StepOtherDetails({ onNext, onBack }: Props) {
  const form = useForm<StepOtherDetailsData>({
    resolver: zodResolver(stepOtherDetailsSchema),
    defaultValues: {
      appliedEarlier: false,
      surrenderedOci: false,
      citizenOfPakBangladesh: false,
      parentsFromPakBangladesh: false,
      workedInForces: false,
      presentNationality: "",
      referenceName: "",
      referenceAddress: "",
      referenceRelationship: "",
      referenceAge: "",
      familyDetails: [],
      soughtAsylum: false,
      convicted: false,
      refusedEntry: false,
      ngoViolation: false,
      humanTrafficking: false,
      cybercrime: false,
      glorifyTerrorism: false,
      criminalPending: false,
      familyFullName: "",
      ociCardRefNo: "",
      placeOfIssue: "",
    },
  });

  const onSubmit = (data: StepOtherDetailsData) => {
    onNext(data);
  };

  const yesNoOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Other Details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Example Yes/No fields */}
          {[
            { name: "appliedEarlier", label: "Have you or family applied for OCI earlier?" },
            { name: "surrenderedOci", label: "Have you surrendered an OCI card before?" },
            { name: "citizenOfPakBangladesh", label: "Ever citizen of Pakistan or Bangladesh?" },
            { name: "parentsFromPakBangladesh", label: "Parents/Grandparents ever citizens of Pakistan or Bangladesh?" },
            { name: "workedInForces", label: "Worked/working in Armed Forces/Police/Security/Intelligence?" },
          ].map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof StepOtherDetailsData}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <div className="flex gap-6">
                    {yesNoOptions.map((opt) => (
                      <label key={opt.label} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={f.value === opt.value}
                          onChange={() => f.onChange(opt.value)}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Present Nationality */}
          <FormField
            control={form.control}
            name="presentNationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acquisition of Present Nationality</FormLabel>
                <FormControl>
                  <Input placeholder="Enter nationality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reference Person */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="referenceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referenceAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="referenceRelationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input placeholder="Relationship" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referenceAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Family Details Checkboxes */}
          <FormField
            control={form.control}
            name="familyDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Details of family members/relatives staying in India
                </FormLabel>
                <div className="flex gap-4 flex-wrap">
                  {["Birth", "Descent", "Registration", "Naturalisation"].map(
                    (opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.value?.includes(opt as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, opt]);
                            } else {
                              field.onChange(
                                field.value.filter((v) => v !== opt)
                              );
                            }
                          }}
                        />
                        {opt}
                      </label>
                    )
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* More Yes/No questions */}
          {[
            { name: "soughtAsylum", label: "Sought asylum before?" },
            { name: "convicted", label: "Convicted by court?" },
            { name: "refusedEntry", label: "Refused entry/deported?" },
            { name: "ngoViolation", label: "Associated with any political/NGO accused of rights violation?" },
            { name: "humanTrafficking", label: "Involved in human trafficking/financial fraud?" },
            { name: "cybercrime", label: "Cybercrime/terrorist activity/espionage?" },
            { name: "glorifyTerrorism", label: "Expressed views glorifying terrorism?" },
            { name: "criminalPending", label: "Criminal proceedings pending?" },
          ].map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof StepOtherDetailsData}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <div className="flex gap-6">
                    {yesNoOptions.map((opt) => (
                      <label key={opt.label} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={f.value === opt.value}
                          onChange={() => f.onChange(opt.value)}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* OCI Card Holder Relative */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="familyFullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ociCardRefNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OCI Card Reference Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Reference Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeOfIssue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Issue</FormLabel>
                  <FormControl>
                    <Input placeholder="Place of Issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
