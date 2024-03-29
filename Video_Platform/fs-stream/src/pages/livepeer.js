import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivepeerClient = createReactClient({
    provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_apiKey }),
});

export default LivepeerClient;
