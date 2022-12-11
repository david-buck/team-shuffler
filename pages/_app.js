import "../styles/globals.css";

import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MyApp({ Component, pageProps }) {
  <main className={`${inter.variable} font-sans`}>
    return <Component {...pageProps} />
  </main>;
}

export default MyApp;
