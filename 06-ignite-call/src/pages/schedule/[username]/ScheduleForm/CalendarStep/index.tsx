import { useState } from 'react';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../../lib/axios';

import { Calendar } from '../../../../../components/Calendar';

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles';

interface IAvaliability {
  possibleTimes: number[];
  availableTimes: number[];
}

interface ICalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export function CalendarStep({ onSelectDateTime }: ICalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  const isDateSelected = !!selectedDate;
  const username = String(router.query.username);

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null;
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null;

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null;

  const { data: availability } = useQuery<IAvaliability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      });

      return response.data;
    },
    {
      enabled: !!selectedDate,
    },
  );

  function handleSelectTime(time: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', time)
      .startOf('hour')
      .toDate();

    onSelectDateTime(dateWithTime);
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay},git <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((time) => (
              <TimePickerItem
                key={time}
                disabled={!availability.availableTimes.includes(time)}
                onClick={() => handleSelectTime(time)}
              >
                {String(time).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
