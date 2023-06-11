import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivepeerClient = createReactClient({
    provider: studioProvider({ apiKey: "02dcd062-e509-4087-ad1e-971ad6e60696" }),
});

export default LivepeerClient;
