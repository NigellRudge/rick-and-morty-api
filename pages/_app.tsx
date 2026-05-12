import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavigationStateProvider from "@/src/providers/NavigationStateProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavigationStateProvider>
      <Component {...pageProps} />;
    </NavigationStateProvider>
  );
}
