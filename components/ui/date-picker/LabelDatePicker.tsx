"use client";

import { useState } from "react";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Props {
  label: string;
  isReadOnly?: boolean;
}

const LabelDatePicker = ({ label, isReadOnly }: Props) => {
  const [date, setDate] = useState<Date>();
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </>
  );
};
export { LabelDatePicker };
