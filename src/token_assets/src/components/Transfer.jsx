import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { token } from "../../../declarations/token"

// Auth (remove token import when deployed to mainnet)
// import { canisterId, createActor } from "../../../declarations/token";
// import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

  const [addressTo, setAddressTo] = useState("");
  const [amountTokens, setAmountTokens] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setBtnText] = useState("Trasnfer")

  const [massageTrasnfer, setMassageTrasnfer] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  
  
  async function handleClick() {
    setIsDisabled(true);
    setBtnText("Trasnfering...");
    const recipient = Principal.fromText(addressTo);
    const amountTransfer = Number(amountTokens);

    //remove this for auth
    const result = await token.transfer(recipient, amountTransfer);
    setMassageTrasnfer(result)
    setIsHidden(false);
    setIsDisabled(false);
    setBtnText("Transfer")

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();
    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    // const result = await authenticatedCanister.transfer(recipient, amountToTransfer);
    // setMassageTrasnfer(result);
    // setIsHidden(false);
    // setIsDisabled(false);
    //setBtnText("Transfer")
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input value={addressTo}
                onChange={(e) => setAddressTo(e.target.value)}
                type="text"
                id="transfer-to-id"
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
               value={amountTokens}
               onChange={(e) => setAmountTokens(e.target.value)}
                type="number"
                id="amount"
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            {buttonText}
          </button>
        </p>
        <p hidden={isHidden} style={{textAlign:"center"}}>{massageTrasnfer}</p>
      </div>
    </div>
  );
}

export default Transfer;
