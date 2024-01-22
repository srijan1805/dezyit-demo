"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@heroicons/react/24/outline";

export type DropdownOption = { label: string; value: string };

type Props = {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

function Dropdown({ options, value = "Select", onChange, disabled }: Props) {
  return (
    <div className="dropdown dropdown-end">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger disabled={disabled} asChild>
          <button className="btn uppercase" aria-label="Customise options">
            {value}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            sideOffset={5}
          >
            <DropdownMenu.RadioGroup
              className=""
              value={value}
              onValueChange={onChange}
            >
              {options.map((option, i) => (
                <DropdownMenu.RadioItem
                  key={`option-${option.value}-${i}`}
                  className="flex items-center px-5 py-3 pl-7 outline-none hover:bg-primary cursor-pointer text-white rounded-md relative"
                  value={option.value}
                >
                  <DropdownMenu.ItemIndicator className="absolute inline-flex items-center justify-center left-1">
                    <CheckIcon className="h-4 w-4" />
                  </DropdownMenu.ItemIndicator>
                  {option.label}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export default Dropdown;
