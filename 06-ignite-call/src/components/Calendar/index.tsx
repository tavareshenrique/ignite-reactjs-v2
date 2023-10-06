import { useMemo, useState } from 'react';

import dayjs from 'dayjs';

import { CaretLeft, CaretRight } from 'phosphor-react';

import { getWeekDays } from '../../utils/get-week-days';

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { api } from '../../lib/axios';

interface ICalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    disabled: boolean;
  }>;
}

interface ICalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

interface IBlockedDates {
  blockedWeekDays: number[];
  blockedDates: number[];
}

type TCalendarWeeks = ICalendarWeek[];

export function Calendar({ onDateSelected, selectedDate }: ICalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1);
  });

  const router = useRouter();

  const username = String(router.query.username);
  const year = currentDate.get('year');
  const month = currentDate.get('month') + 1;

  const { data: blockedDates } = useQuery<IBlockedDates>(
    ['blocked-dates', year, month],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year,
          month,
        },
      });

      return response.data;
    },
  );

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month');

    setCurrentDate(previousMonthDate);
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month');

    setCurrentDate(nextMonthDate);
  }

  const shortWeekDays = getWeekDays({ short: true });

  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return [];
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1);
    });

    const firstWeekDay = currentDate.get('day');

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day');
      })
      .reverse();

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    );
    const lastWeekDay = lastDayInCurrentMonth.get('day');

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day');
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')) ||
            blockedDates.blockedDates.includes(date.get('date')),
        };
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
    ];

    const calendarWeeks = calendarDays.reduce<TCalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0;

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          });
        }

        return weeks;
      },
      [],
    );

    return calendarWeeks;
  }, [blockedDates, currentDate]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button
            type="button"
            onClick={handlePreviousMonth}
            title="Previous month"
          >
            <CaretLeft />
          </button>
          <button type="button" onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        disabled={disabled}
                        onClick={() => onDateSelected(date.toDate())}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
