import { Lato } from "next/font/google";
import "@/styles/globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={lato.variable}>
      <Component {...pageProps} />
    </div>
  );
}

