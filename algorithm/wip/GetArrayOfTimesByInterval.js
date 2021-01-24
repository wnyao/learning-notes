export const getTimesWithInterval = (interval, twelveHourFormat) => {
  let times = [];
  let startTime = 0;
  let ap = ["AM", "PM"];

  for (let i = 0; startTime < 24 * 60; i++) {
    let hh = Math.floor(startTime / 60); // getting hours of day in 0-24 format
    let mm = startTime % 60; // getting minutes of the hour in 0-55 format

    if (twelveHourFormat) {
      times[i] =
        (hh % 12) + ":" + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    } else {
      times[i] = ("0" + hh).slice(-2) + ("0" + mm).slice(-2);
    }

    startTime = startTime + interval;
  }

  return times;
};
