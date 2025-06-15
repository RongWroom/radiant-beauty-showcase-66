
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAvailableSlots } from '@/hooks/useTimeSlots';
import { format, isAfter, startOfDay } from 'date-fns';
import { Clock } from 'lucide-react';

interface BookingCalendarProps {
  onDateTimeSelect: (date: Date, time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  onDateTimeSelect,
  selectedDate,
  selectedTime,
}) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | undefined>(selectedDate);
  const { data: availableSlots = [], isLoading } = useAvailableSlots(internalSelectedDate);

  const handleDateSelect = (date: Date | undefined) => {
    setInternalSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    if (internalSelectedDate) {
      onDateTimeSelect(internalSelectedDate, time);
    }
  };

  const isDateDisabled = (date: Date) => {
    // Disable past dates and Sundays (day 0)
    return !isAfter(date, startOfDay(new Date())) || date.getDay() === 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={internalSelectedDate}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md border pointer-events-auto"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Times</CardTitle>
          {internalSelectedDate && (
            <p className="text-sm text-muted-foreground">
              {format(internalSelectedDate, 'EEEE, MMMM d, yyyy')}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {!internalSelectedDate ? (
            <p className="text-muted-foreground text-center py-8">
              Please select a date to view available times
            </p>
          ) : isLoading ? (
            <p className="text-muted-foreground text-center py-8">
              Loading available times...
            </p>
          ) : availableSlots.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No available times for this date
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTime === slot.start_time ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimeSelect(slot.start_time)}
                  className="justify-center"
                >
                  {format(new Date(`2000-01-01T${slot.start_time}`), 'h:mm a')}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;
