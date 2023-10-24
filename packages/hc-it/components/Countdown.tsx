import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({targetDate}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);
    return () => {
        clearInterval(intervalId);
      };
    }, [targetDate]);
  
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  

  return (
    <>
        <span className="text-[#d3ab7b] bg-black inline-block px-1 ml-1 mr-1 rounded-md">{days}일</span>
        <span className="text-[#d3ab7b] bg-black inline-block px-1 mr-1 rounded-md">{hours}시간</span>
        <span className="text-[#d3ab7b] bg-black inline-block px-1 mr-1 rounded-md">{minutes}분</span>
    </>
  );
}
