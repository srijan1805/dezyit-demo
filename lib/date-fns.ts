export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateDiffInDays(date1: Date, date2: Date): number {
  // Discard the time and time-zone information
  const utcDate1 = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );
  const utcDate2 = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );

  // Calculate the difference in milliseconds
  const msDiff = Math.abs(utcDate2 - utcDate1);

  // Convert the difference to days
  return Math.floor(msDiff / (1000 * 60 * 60 * 24));
}
