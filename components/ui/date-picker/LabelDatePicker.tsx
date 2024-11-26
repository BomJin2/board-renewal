"use client";

import { useState } from "react";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Props {
  label: string;
  isReadOnly?: boolean;
  value: Date | undefined;
  onChange?: (date: Date | undefined) => void;
}

const LabelDatePicker = ({ label, isReadOnly, onChange, value }: Props) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[280px] justify-start text-left font-normal", !value && "text-muted-foreground")}
            disabled={isReadOnly}
          >
            <CalendarIcon />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        {!isReadOnly && (
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
          </PopoverContent>
        )}
      </Popover>
    </>
  );
};
export { LabelDatePicker };
