import '@/styles/globals.css'

import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "./livepeer";
function MyApp({ Component, pageProps }) {
  return (
      <LivepeerConfig client={LivepeerClient}>
        <Component {...pageProps} />
      </LivepeerConfig>
  );
}
export default MyApp;
