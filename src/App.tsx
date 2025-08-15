import Dashboard from "./components/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SolanaWallet from "./components/SolanaWallet";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-neutral-950 text-neutral-200 overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/solana-wallet" element={<SolanaWallet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
