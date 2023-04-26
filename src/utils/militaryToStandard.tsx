const BASE_TEN = 10;
const BEGIN_MILITARY_AM_TIME = 0;
const MIDNIGHT = 2400;
const END_MILITARY_AM_TIME = 1159;
const HOURS_IN_AFTERNOON = 12;

export default function convertMilitaryToStandardTime(
  militaryTime: string
): string {
  const time: number = parseInt(militaryTime, BASE_TEN);

  if (time === BEGIN_MILITARY_AM_TIME || time === MIDNIGHT) {
    return "12:00 AM";
  } else if (time >= BEGIN_MILITARY_AM_TIME && time <= END_MILITARY_AM_TIME) {
    const parsedHour =
      militaryTime.slice(0, 2) === "00" ? "12" : militaryTime.slice(0, 2);
    const parsedMinutes = militaryTime.slice(2, 4);
    return `${parsedHour}:${parsedMinutes} AM`;
  } else {
    const parsedHour = militaryTime.slice(0, 2);
    const pmHour: string =
      parseInt(parsedHour, BASE_TEN) === HOURS_IN_AFTERNOON
        ? parsedHour
        : (parseInt(parsedHour, BASE_TEN) - HOURS_IN_AFTERNOON).toString();
    const parsedMinutes = militaryTime.slice(2, 4);
    return `${pmHour}:${parsedMinutes} PM`;
  }
}
