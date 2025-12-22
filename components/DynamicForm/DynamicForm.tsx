"use client";

import React from "react";
import { useForm, Path, DefaultValues } from "react-hook-form";
import { z, ZodObject } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import GoogleAddressInput from "../GoogleAddressInput";

// ---------- TYPES ----------
export type FieldType =
  | "text"
  | "number"
  | "select"
  | "email"
  | "textarea"
  | "checkbox"
  | "date"
  | "phone"
  | "address"; // ✅ NEW

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface DynamicFormProps<TSchema extends ZodObject<any>> {
  schema: TSchema;
  fields: FieldConfig[];
  onSubmit: (values: z.infer<TSchema>) => void;
  serviceType: string;
}

// ---------- COMPONENT ----------
export function DynamicForm<TSchema extends ZodObject<any>>({
  schema,
  fields,
  onSubmit,
  serviceType,
}: DynamicFormProps<TSchema>) {
  type FormValues = z.input<TSchema>;
  type InputValues = z.input<TSchema>;
  type OutputValues = z.output<TSchema>;

  const form = useForm<InputValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      ...Object.fromEntries(fields.map((f) => [f.name, ""])),
      serviceType,
    } as unknown as DefaultValues<InputValues>,
  });

  const handleSubmit = (values: InputValues) => {
    onSubmit(values as unknown as OutputValues);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {fields.map((field) => (
            <FormField<FormValues>
              key={field.name}
              control={form.control}
              name={field.name as Path<FormValues>}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === "address" ? (
                      <GoogleAddressInput
                        value={f.value as string}
                        onChange={f.onChange}
                        onSelect={(place) => {
                          const parts = place.address_components || [];

                          const get = (type: string) =>
                            parts.find((p) => p.types.includes(type))?.long_name || "";

                          fields.forEach((fld) => {
                            if (fld.name.includes("city")) {
                              //@ts-ignore
                              form.setValue(fld.name as any, get("locality"));
                            }
                            if (fld.name.includes("state")) {
                              form.setValue(
                                fld.name as any,
                                 //@ts-ignore
                                get("administrative_area_level_1")
                              );
                            }
                            if (fld.name.includes("country")) {
                               //@ts-ignore
                              form.setValue(fld.name as any, get("country"));
                            }
                            if (fld.name.includes("zip")) {
                               //@ts-ignore
                              form.setValue(fld.name as any, get("postal_code"));
                            }
                          });
                        }}
                      />
                    ) : field.type === "select" ? (
                      <Select onValueChange={f.onChange} value={f.value as string}>
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "phone" ? (
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={f.value as string}
                        onChange={f.onChange}
                        className="border rounded-lg px-3 py-2 w-full"
                      />
                    ) : field.type === "textarea" ? (
                       //@ts-ignore
                      <Textarea {...f} placeholder={field.placeholder} />
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={!!f.value}
                          onCheckedChange={(v) => f.onChange(v)}
                        />
                        <span>{field.label}</span>
                      </div>
                    ) : (
                       //@ts-ignore
                      <Input
                        {...f}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="col-span-full flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
