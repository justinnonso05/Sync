import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    EVENT_DATE: process.env.EVENT_DATE || "May 23, 2026",
    EVENT_TIME: process.env.EVENT_TIME || "10:00 AM – 4:00 PM WAT",
    EVENT_LOCATION: process.env.EVENT_LOCATION || "Google Meet",
    EVENT_DTSTART: process.env.EVENT_DTSTART || "20260523T090000Z",
    EVENT_DTEND: process.env.EVENT_DTEND || "20260523T150000Z",
  },
  /* config options here */
};

export default nextConfig;
