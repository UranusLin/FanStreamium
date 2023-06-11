import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivepeerClient = createReactClient({
    provider: studioProvider({ apiKey: process.env.apiKey }),
});

export default LivepeerClient;
