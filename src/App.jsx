import { useState } from 'react'
import { generateMnemonic } from "bip39";
import { Buffer } from 'buffer';
import './App.css'

import { SolanaWallet } from './components/addSolWallet';
import { EthWallet } from './components/addEthWallet';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}
function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <input type="text" value={mnemonic} disabled></input>
      <button onClick={function () {
        const mn =generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <SolanaWallet mnemonic={mnemonic}/>
      <EthWallet mnemonic={mnemonic}/>
    </>
  )
}

export default App

