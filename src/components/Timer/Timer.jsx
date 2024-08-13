import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Setup: Create a timer
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup: Clear the timer
    return () => {
      clearInterval(timerId);
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div>
      <p>Time elapsed: {seconds} seconds</p>
    </div>
  );
}

export default Timer;
