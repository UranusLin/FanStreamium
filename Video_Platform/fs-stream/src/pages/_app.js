import '@/styles/globals.css'
import Head from 'next/head';
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "./livepeer";
function MyApp({ Component, pageProps }) {
  return (
      <div>
          <Head>
              <title>FanStreamium</title>
          </Head>
          <LivepeerConfig client={LivepeerClient}>
            <Component {...pageProps} />
          </LivepeerConfig>
      </div>
  );
}
export default MyApp;
