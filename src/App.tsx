import Dashboard from "./components/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SolanaWallet from "./components/SolanaWallet";
import EthWallet from "./components/EthWallet";

function App() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/solana-wallet" element={<SolanaWallet />} />
          <Route path="/eth-wallet" element={<EthWallet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
