// import { Database } from "@tableland/sdk";
// import { providers } from "ethers";
import ShareModal from "lit-share-modal-v3";
import { useState } from "react";

const Web3Cms = () => {
  // Toggle the lit access dialog.
  const [showShareModal, setShowShareModal] = useState(false);

  const onUnifiedAccessControlConditionsSelected = (shareModalOutput) => {
    // do things with share modal output
  };

  // // Connect to a chain provider, such as a browser wallet
  // const provider = new providers.Web3Provider(window.ethereum);
  // // Request permission to connect to a users accounts
  // await provider.send("eth_requestAccounts", []);

  // // Create a signer from the connected browser wallet
  // const signer = provider.getSigner();
  // // Create a database connection; the signer passes the connected
  // // chain and is used for signing create table transactions
  // const db = new Database({ signer });

  return (
    <div>
      <h1>CMS</h1>
      <button onClick={() => setShowShareModal(true)}>Show Share Modal</button>

      {showShareModal && (
        <div className={"lit-share-modal"}>
          <ShareModal
            onClose={() => {
              setShowShareModal(false);
            }}
            onUnifiedAccessControlConditionsSelected={
              onUnifiedAccessControlConditionsSelected
            }
          />
        </div>
      )}
    </div>
  );
};

export default Web3Cms;
