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
// ---------- TYPES ----------
export type FieldType = "text" | "number" | "select" | "email" | "textarea" | "checkbox" | "date" | "phone";;

export interface FieldConfig {
  name: string;
  label: string;
  type: any; // <— STRICT type, not string
  placeholder?: string;
  options?: { label: string; value: string }[]; // only for select
}

export interface DynamicFormProps<TSchema extends ZodObject<any>> {
  schema: TSchema;
  fields: FieldConfig[];
  onSubmit: (values: z.infer<TSchema>) => void;
  serviceType: string
}

// ---------- COMPONENT ----------
export function DynamicForm<TSchema extends ZodObject<any>>({
  schema,
  fields,
  onSubmit,
  serviceType,
}: DynamicFormProps<TSchema>) {
  type FormValues = z.input<TSchema>;
  type InputValues = z.input<TSchema>;   // raw form values
  type OutputValues = z.output<TSchema>; // parsed values

  const form = useForm<InputValues>({
    resolver: zodResolver(schema) as any, // cast to avoid TS mismatch
    defaultValues: {
      ...Object.fromEntries(fields.map(f => [f.name, ""])),
      serviceType: serviceType
    } as unknown as DefaultValues<InputValues>,
  });


  const handleSubmit = (values: InputValues) => {
    // zodResolver guarantees values are already parsed to OutputValues
    onSubmit(values as unknown as OutputValues);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full px-4 sm:px-6 md:px-8"
        >
          {fields.map((field) => (
            <FormField<FormValues>
              key={field.name}
              control={form.control}
              name={field.name as unknown as Path<FormValues>}
              render={({ field: f }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                    {field.label}
                  </FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={f.onChange}
                        value={f.value as string}
                      >
                        <SelectTrigger className="border rounded-lg p-2 w-full text-sm sm:text-base">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          {field.options?.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value}
                              className="text-sm sm:text-base"
                            >
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
                        onBlur={f.onBlur}
                        className="border rounded-lg px-3 py-2 w-full text-sm"
                      />) : field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.placeholder}
                          {...f}
                          value={f.value as unknown as string}
                          className="border rounded-lg p-2 w-full min-h-[80px] text-sm sm:text-base"
                        />
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={!!f.value}
                            onCheckedChange={(checked) => f.onChange(checked)}
                            onBlur={f.onBlur}
                            name={f.name}
                            ref={f.ref}
                          />
                          <span className="text-sm sm:text-base text-gray-700">{field.label}</span>
                        </div>
                      ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...f}
                        value={f.value as unknown as string}
                        className="border rounded-lg p-2 w-full text-sm sm:text-base"
                      />
                    )}
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1 text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          ))}

          <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-end items-center mt-6 gap-3 sm:gap-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-6 py-2 rounded-lg text-sm sm:text-base transition"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>

    </div>
  );
}
