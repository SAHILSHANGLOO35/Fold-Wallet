import { WalletMinimal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-w-screen">
      <div className="sticky min-h-screen mx-44 px-4 border-l border-r border-neutral-400/20">
        {/* Navbar */}
        <div className="flex gap-2 items-center h-32">
          <div className="flex">
            <WalletMinimal className="text-white" size={32} />
          </div>
          <div className="font-extrabold text-4xl text-white manrope bold">
            Fold
          </div>
        </div>
        {/* Hero section */}
        <div className=" flex flex-col gap-2">
          <div className="manrope text-5xl font-bold tracking-tight text-white">
            From Solana to Ethereum - Seamless.
          </div>
          <div className="text-neutral-300 text-xl manrope">
            Choose you preferable Blockchain and get started.
          </div>
          <div className="flex gap-2">
            <div
              className="bg-white hover:bg-neutral-200 transition-all duration-200 text-black px-8 py-2 manrope regular rounded-md cursor-pointer"
              onClick={() => navigate("/solana-wallet")}
            >
              Solana
            </div>
            <div className="bg-white hover:bg-neutral-200 transition-all duration-200 text-black px-8 py-2 manrope regular rounded-md cursor-pointer">
              Etherium
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
