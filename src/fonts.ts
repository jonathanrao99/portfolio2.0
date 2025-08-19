import localFont from "next/font/local";

export const saans = localFont({
  src: [
    {
      path: "./fonts/Saans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Saans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Saans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Saans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-saans",
});

export const saansMono = localFont({
  src: [
    {
      path: "./fonts/SaansMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

import { Playfair_Display } from 'next/font/google';

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-playfair',
});

export const lcddot = localFont({
  src: [
    {
      path: "./fonts/lcddot.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lcddot",
});

 