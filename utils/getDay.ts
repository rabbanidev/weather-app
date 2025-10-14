export const getDayName = (date: Date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = date.getDay();
  return days[dayIndex];
};
