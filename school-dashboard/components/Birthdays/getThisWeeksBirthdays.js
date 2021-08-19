// function to check if a date is within the next 7 days
function isWithinNext7Days(date) {
  const today = new Date();
  date.setYear(today.getFullYear());
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const threeWeeksAgo = new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000);
  return date >= threeWeeksAgo && date <= nextWeek;
}

export default function getThisWeeksBirthdays(birthdays = []) {
  const today = new Date();
  const thisWeeksBirthdays = birthdays.filter((birthday) => {
    const date = new Date(birthday.date);
    return isWithinNext7Days(date) && !birthday.hasDelivered;
  });
  return thisWeeksBirthdays;
}
