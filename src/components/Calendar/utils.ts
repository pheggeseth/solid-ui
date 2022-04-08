export function getDaysInVisibleMonth(visibleYear: number, visibleMonth: number) {
  const startDate = new Date(visibleYear, visibleMonth);
  const prevMonthDaysVisible = startDate.getDay();
  const endDate = new Date(visibleYear, visibleMonth + 1, 0);
  const nextMonthDaysVisible = 6 - endDate.getDay();
  const dayCount = endDate.getDate() + prevMonthDaysVisible + nextMonthDaysVisible;
  startDate.setDate(startDate.getDate() - prevMonthDaysVisible);
  endDate.setDate(endDate.getDate() + nextMonthDaysVisible);

  const weeks: Date[][] = [];

  for (let i = 0; i < dayCount / 7; i++) {
    const week: Date[] = [];
    for (let j = 0; j < 7; j++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i * 7 + j);
      week.push(date);
    }
    weeks.push(week);
  }

  return weeks;
}
