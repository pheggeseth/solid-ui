export function getDaysInVisibleMonth(visibleYear: number, visibleMonth: number) {
  const startDate = new Date(visibleYear, visibleMonth);
  const endDate = new Date(visibleYear, visibleMonth + 1, 0);
  const dayCount = endDate.getDate();

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
