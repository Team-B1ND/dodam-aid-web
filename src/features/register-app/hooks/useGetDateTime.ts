import { DAYS } from "@/features/register-app/constants/days";
import { useEffect, useState } from "react";

export const useGetDateTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const displayHours = (hours % 12 || 12).toString().padStart(2, "0");
  const ampm = hours < 12 ? "오전" : "오후";
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = DAYS[now.getDay()];

  const h1 = displayHours[0];
  const h2 = displayHours[1];
  const m1 = minutes[0];
  const m2 = minutes[1];

  return {
    ampm,
    month,
    date,
    day,
    h1,
    h2,
    m1,
    m2,
    displayHours,
    minutes
  };
};
