import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import NavigationStateProvider from "@/providers/NavigationStateProvider";

const carterFont = Inter({
  weight: "500",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavigationStateProvider>
      <main className={carterFont.className}>
        <Component {...pageProps} />
      </main>
    </NavigationStateProvider>
  );
}
