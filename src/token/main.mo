import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {
    
    let owner : Principal = Principal.fromText("6ezvh-oubxb-waeil-ckhzx-pgsyq-xszh5-nkl2r-gstzc-bwxth-6a6ro-kae");
    let totalSupply : Nat = 10000000000;
    let symbol : Text = "DSAM";

    private stable var balanceEntries: [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
            if (balances.size() < 1 ) {
            balances.put(owner, totalSupply);
        };


    public query func balanceOf(who: Principal) : async Nat {

    let balance : Nat = switch (balances.get(who)) {
        case null 0;
        case (?result) result;
    };

    return balance;
    };
    
    public query func symbolOf() : async Text {

    return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));

        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            let result = await transfer(msg.caller, amount);
            return result;
            return "Success";
        };
        return "Already Claimed";
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
        let fromBlance = await balanceOf(msg.caller);
        if (fromBlance > amount) {
        let newFromBalance : Nat = fromBlance -  amount;
        balances.put(msg.caller, newFromBalance);

        let toBalance = await balanceOf(to);
        let newToBalance = toBalance + amount;
        balances.put(to, newToBalance);

        return "Success";
        } else {

        return "Insufficient Funds";
        };
    };


    // to save the balances when we re-deploy (hashmap can't be stable)
    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1 ) {
            balances.put(owner, totalSupply);
        }
    };



};
// On start:
// 1. Save canister ID into a command line variable:
// ```
// CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
// ```

// 2. Check canister ID has been successfully saved:
// ```
// echo $CANISTER_PUBLIC_KEY
// ```

// 3. Transfer half a billion tokens to the canister Principal ID:
// ```
// dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"