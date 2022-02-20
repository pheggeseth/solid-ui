import dayjs from 'dayjs';

export function getDaysInVisibleMonth(visibleMonth: number, visibleYear: number) {
  const startDate = dayjs([visibleYear, visibleMonth]).startOf('month').weekday(0);
  const endDate = dayjs([visibleYear, visibleMonth]).endOf('month').weekday(6);
  const dayCount = endDate.diff(startDate, 'days') + 1;

  const weeks: string[][] = [];

  for (let i = 0; i < dayCount / 7; i++) {
    const week: string[] = [];
    for (let j = 0; j < 7; j++) {
      week.push(startDate.add(i * 7 + j, 'days').format('YYYY-MM-DD'));
    }
    weeks.push(week);
  }

  return weeks;
}
