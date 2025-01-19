import { useState, useEffect } from "react";

const useTimer = (timestamp) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeLeft;
};

const calculateTimeLeft = (timestamp) => {
  const difference = timestamp * 1000 - new Date().getTime();
  let timeLeft = {};
  let timeEnded = false;

  if (difference > 0) {
    timeLeft = {
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  } else {
    timeEnded = true;
    timeLeft = { hours: "00", minutes: "00", seconds: "00" };
  }

  return { timeLeft, timeEnded };
};

export default useTimer;
