import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const DateRangePicker = ({ dateRange, onDateRangeChange }: DateRangePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal gap-2",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
                {format(dateRange.to, "dd MMM yyyy", { locale: id })}
              </>
            ) : (
              format(dateRange.from, "dd MMM yyyy", { locale: id })
            )
          ) : (
            <span>Filter Tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={onDateRangeChange}
          numberOfMonths={2}
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
