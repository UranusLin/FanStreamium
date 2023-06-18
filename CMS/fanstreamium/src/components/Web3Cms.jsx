import ShareModal from "lit-share-modal-v3";
import { useState } from "react";

import fakeUserActivities from "./fakeData";
// import { Database } from "@tableland/sdk";
// import { providers } from "ethers";

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
      <div className="left-bar">
        <h1>CMS</h1>
        <button onClick={() => setShowShareModal(true)}>
          Show Share Modal
        </button>

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
        <div className="table-list">
          <span>User List</span>
          <span>User Activities</span>
          <span>User Donate</span>
          <span>User Level</span>
          <span>User State</span>
        </div>
      </div>
      <hr ></hr>
      <div className="right-content">
        <h3>User Activities</h3>
        <ul className="user-list">
          {fakeUserActivities.map((user) => (
            <li key={user.userId} className="user-list-item">
              <div className="user-details">
                <p>{user.userName}</p>
                <p>{user.timestamp}</p>
                <p>{user.activity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Web3Cms;
