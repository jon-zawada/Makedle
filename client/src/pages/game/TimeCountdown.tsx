import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const TimeCountDown: React.FC = () => {
  const [timeToMidnight, setTimeToMidnight] = useState("");

  const calculateTimeToMidnight = () => {
    const nowPT = moment.tz("America/Los_Angeles");
    const midnightPT = nowPT.clone().endOf("day");
    const duration = moment.duration(midnightPT.diff(nowPT));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setTimeToMidnight(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    calculateTimeToMidnight(); // Initial calculation
    const timer = setInterval(calculateTimeToMidnight, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="text-center">
      <h1>Time to next champion in</h1>
      <p>{timeToMidnight}</p>
    </div>
  );
};

export default TimeCountDown;
