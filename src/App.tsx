import Dashboard from "./components/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SolanaWallet from "./components/SolanaWallet";
import EthWallet from "./components/EthWallet";
import SolanaInfo from "./pages/SolanaInfo";
import EthereumInfo from "./pages/EthereumInfo";

function App() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/solana-wallet" element={<SolanaWallet />} />
          <Route path="/eth-wallet" element={<EthWallet />} />
          <Route path="/solana-wallet/:publicKey" element={<SolanaInfo />} />
          <Route path="/eth-wallet/:publicKey" element={<EthereumInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
