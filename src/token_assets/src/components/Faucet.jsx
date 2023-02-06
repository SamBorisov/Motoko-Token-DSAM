import React, { useState } from "react";
import { token } from "../../../declarations/token"

//with Auth + uncome app Faucet (remove token import)
// import { canisterId, createActor } from "../../../declarations/token";
// import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {

  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setBtnText] = useState("Gimme gimme")

  async function handleClick(event) {
    setIsDisabled(true);
    const result = await token.payOut();
    setBtnText(result);

    // Auth + {props.userPrincipal} to the account text down

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    // const result = await authenticatedCanister.payOut();
    // setBtnText(result);
    }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DSamuel tokens here! Claim 10,000 DSAM coins to your account. </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
