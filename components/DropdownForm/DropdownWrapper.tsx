"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import Flags from "react-world-flags";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DropdownOption {
  _id?: string | number;
  code?: string;
  name: string;
  slug: string
}

interface DropdownWrapperProps {
  value: DropdownOption | string | null;
  setValue: React.Dispatch<React.SetStateAction<DropdownOption | null>>;
  search: string;
  setSearch: (search: string) => void;
  filteredOptions: DropdownOption[];
  errors?: string;
  placeholder: string;
  type?: string;
  
}

const DropdownWrapper = ({
  value,
  setValue,
  search,
  setSearch,
  filteredOptions,
  errors,
  placeholder,
  type,
}: DropdownWrapperProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full md:w-1/3 flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="md:w-[250px] w-full justify-between bg-[#161616CC]/80 hover:bg-unset hover:text-white"
          >
            <div className="flex items-center gap-2 capitalize">
              {value && type === "flag" && typeof value === "object" && (
                <Flags code={value.code} style={{ width: 20, height: 15 }} />
              )}
              {value
                ? typeof value === "string"
                  ? value
                  : value.name
                : placeholder}
            </div>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0 ">
          <Command>
            <div className="sticky top-0 z-10 bg-black text-white">
              <CommandInput
                placeholder={`Search ${placeholder}...`}
                className="h-9 "
                value={search}
                onValueChange={setSearch}
              />
            </div>

            <CommandList className="bg-black custom-scrollbar">
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option: DropdownOption, index:number) => (
                  <CommandItem
                    key={index}
                    value={option.name}
                    className="data-[selected=true]:bg-neutral-900"
                    onSelect={() => {
                      if (typeof value === "string") {
                        setValue(option);
                      } else {
                        setValue(option);
                      }
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center  text-white gap-2">
                      {type === "flag" && (
                        <Flags
                          code={option.code}
                          style={{ width: 20, height: 15 }}
                        />
                      )}
                      {option.name}
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        (
                          typeof value === "string"
                            ? value === option.name
                            : value?.name === option.name
                        )
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {errors && <span className="text-red-500 mt-1 text-sm text-left">{errors}</span>}
    </div>
  );
};

export default DropdownWrapper;
