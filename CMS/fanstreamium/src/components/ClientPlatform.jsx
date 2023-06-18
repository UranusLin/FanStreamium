import { useState } from "react";

const ClientPlatform = () => {
  const [openShareModal, setOpenShareModal] = useState(false);

  const onAccessControlConditionsSelected = (shareModalOutput) => {
    // do things with share modal output
  };

  return (
    <div>
      <h1>ClientPlatform</h1>
    </div>
  );
};

export default ClientPlatform;
