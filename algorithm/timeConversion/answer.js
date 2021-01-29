// answer 1 ------------------------------------------------------

function timeConversion(s) {
  let [hour, minute, second] = s.split(":");

  let hourInt = parseInt(hour);
  if (second.includes("AM") && hourInt == 12) hour = "00";
  if (second.includes("PM") && hourInt !== 12) {
    hourInt += 12;
    hour = hourInt.toString();
  }

  second = second.replace(/\D/g, "");
  return `${hour}:${minute}:${second}`;
}

// answer 2 ------------------------------------------------------

function timeConversion(s) {
  let [hour, minute, second] = s.replace(/\D/g, " ").split(" ");

  hour = parseInt(hour);
  hour = (hour % 12) + s.includes("PM") * 12;

  const time = `${formatToTwoDigits(hour)}:${minute}:${second}`;
  return time;
}

function formatToTwoDigits(num) {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
