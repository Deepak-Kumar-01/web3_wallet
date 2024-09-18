import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    return <div>
        <button onClick={async function()  {
            const seed = await mnemonicToSeed(mnemonic);
            console.log("Seed:", seed);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path,seed.toString("hex")).key;
            console.log("Derived Seed :",derivedSeed);
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            console.log("Secret:",secret);
            const keypair = Keypair.fromSecretKey(secret);
            console.log("Public Key:", keypair);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
        }}>
            Add wallet
        </button>
        {publicKeys.map(p => <div>
            {p.toBase58()}
        </div>)}
    </div>
 }