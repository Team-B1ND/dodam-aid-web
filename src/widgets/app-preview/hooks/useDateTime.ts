import { DAYS } from "@/widgets/app-preview/constants/days";
import { useEffect, useState } from "react";

export const useDateTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const displayHours = (hours % 12 || 12).toString().padStart(2, "0");

  return {
    ampm: hours < 12 ? "오전" : "오후",
    month: now.getMonth() + 1,
    date: now.getDate(),
    day: DAYS[now.getDay()],
    h1: displayHours[0],
    h2: displayHours[1],
    m1: minutes[0],
    m2: minutes[1],
    displayHours,
    minutes,
  };
};
