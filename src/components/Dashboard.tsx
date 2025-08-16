import { Github, WalletMinimal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="min-h-screen mx-44 px-4 border-l border-r border-neutral-400/20 pb-32 overflow-x-hidden">
        {/* Navbar */}
        <div className="flex gap-2 items-center justify-between h-32">
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex">
              <WalletMinimal className="text-white" size={32} />
            </div>
            <div className="font-extrabold text-4xl text-white manrope bold">
              Fold
            </div>
          </div>
          <a
            href="https://github.com/SAHILSHANGLOO35/Fold-Wallet"
            target="_blank"
          >
            <div className="text-white hover:bg-neutral-800 px-3 py-3 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
              <Github size={28} />
            </div>
          </a>
        </div>

        <div className="border-b border-neutral-400/20 absolute left-0 right-0"></div>

        {/* Hero section */}
        <div className="flex flex-col gap-2 pt-8 pb-8">
          <div className="manrope text-5xl font-bold tracking-tight text-white">
            From Solana to Ethereum - Seamless.
          </div>
          <div className="text-neutral-300 text-xl manrope">
            Choose your preferable Blockchain and get started.
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

        <div className="border-b bottom-20 border-neutral-400/20 absolute left-0 right-0" />

        <div className="absolute bottom-7">
          <div className="text-white text-md manrope regular">
            Designed and Developed by Sahil Shangloo ~ AKA{" "}
            <a
              className="hover:text-neutral-400 inline-block scale-100 hover:scale-105 transition-all duration-200"
              href="https://x.com/doubleSdotdev"
              target="_blank"
            >
              {"{"} doubleSdotdev {"}"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
