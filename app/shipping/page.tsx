"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "nextjs-toploader/app";
import { CHECKLIST_PACKAGES } from "../data/checklists";

const formSchema = z.object({
  documentMethod: z
    .string()
    .refine((val) => val === "upload" || val === "shipping", {
      message: "Please select a document submission method",
    }),
  documents: z.array(z.string()).optional(),
  uploadFiles: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const [documentList, setDocumentList] = useState<string[]>([]);
  const [activeAppName, setActiveAppName] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentMethod: "upload",
      documents: [],
      uploadFiles: undefined,
    },
  });

  const router = useRouter();

  // ✅ Load active application and match by name
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("applications");
    if (!stored) return;

    const parsed = JSON.parse(stored);

    let matchedDocs: string[] = [];
    let matchedAppName = "";

    // 🔍 Loop through all applications in localStorage
    parsed.applications?.forEach((app: any) => {
      const country = localStorage.getItem("county")??"";
      const serviceName = app.type;
      const checklistArray = CHECKLIST_PACKAGES[serviceName]?.[country]

      console.log(checklistArray,"checklistArray")

      if (Array.isArray(checklistArray)) {
        checklistArray.forEach((item) => {
          // Direct title match (case-insensitive)
          if (
            item.title.trim().toLowerCase() ===
            app.name.trim().toLowerCase()
          ) {
            matchedDocs = item.documents;
            matchedAppName = app.name;
          }
        });
      }
    });


  if (matchedDocs.length > 0) {
    setDocumentList(matchedDocs);
    setActiveAppName(matchedAppName);
  }
}, []);



const onSubmit = (values: FormValues) => {
  if (values.documentMethod === "shipping") {
    router.push("/shipping/by-shipping-documents?");
  } else {
    router.push("/login");
  }
};

return (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h2 className="text-xl font-bold mb-6">Document Process</h2>
    {activeAppName && (
      <p className="text-sm text-gray-600 mb-4">
        Selected Application: <span className="font-semibold">{activeAppName}</span>
      </p>
    )}
    <p className="mb-4 text-gray-600">
      How would you like to send documents to us for further process?
    </p>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Choose Method */}
        <FormField
          control={form.control}
          name="documentMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-8"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="upload" />
                    </FormControl>
                    <FormLabel className="font-medium">
                      By Uploading Documents
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="shipping" />
                    </FormControl>
                    <FormLabel className="font-medium">
                      By Shipping Documents
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Step 2B: Show checklist when shipping */}
        {form.watch("documentMethod") === "shipping" &&
          (documentList.length > 0 ? (
            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium mb-2">
                    Select Documents you are Shipping
                  </FormLabel>
                  {documentList.map((item) => (
                    <FormItem
                      key={item}
                      className="flex items-center space-x-2"
                    >
                      <FormControl>
                        <Checkbox
                          defaultChecked
                          checked={true}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), item])
                              : field.onChange(
                                field.value?.filter((v) => v !== item)
                              );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="text-gray-500 italic">
              No checklist found for this application.
            </div>
          ))}

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 mt-4"
        >
          {form.watch("documentMethod") === "shipping"
            ? "Next"
            : "Login to Customer"}
        </Button>
      </form>
    </Form>
  </div>
);
};

export default Page;
