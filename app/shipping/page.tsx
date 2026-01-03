"use client";

import { useEffect, useState } from "react";
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
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const applicationIds = searchParams.get("applicationIds");
  const token = searchParams.get("token");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentMethod: "upload",
      documents: [],
      uploadFiles: undefined,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("applications");
    if (!stored) return;

    const parsed = JSON.parse(stored);

    let matchedDocs: string[] = [];
    let matchedAppName = "";

    // 🔍 Loop through all applications in localStorage
    parsed.applications?.forEach((app: any) => {
      const country = window.localStorage.getItem("county") ?? "";
      const serviceName = app.type;
      const checklistArray = CHECKLIST_PACKAGES[serviceName]?.[country]

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
      const query = new URLSearchParams();

      if (applicationIds) {
        query.set("applicationIds", applicationIds);
      }

      if (token) {
        query.set("token", token);
      }

      router.push(`/shipping/by-shipping-documents?${query.toString()}`);
    } else {
      localStorage.removeItem("applicationStatus");
      localStorage.removeItem("applications");

      router.replace("/login");
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
          {/* NOTE: Show when Uploading is selected */}
          {form.watch("documentMethod") === "upload" && (
            <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              <p>
                Please check your email. Login credentials have been sent to your registered
                email address. Log in to upload and submit your documents.
              </p>
            </div>
          )}

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
