import { Github, WalletMinimal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="min-h-screen mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-44 px-4 border-l border-r border-neutral-400/20 pb-32 overflow-x-hidden">
        {/* Navbar */}
        <div className="flex gap-2 items-center justify-between h-20 sm:h-24 md:h-28 lg:h-32">
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex">
              <WalletMinimal className="text-white" size={32} />
            </div>
            <div className="font-extrabold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white manrope bold">
              Fold
            </div>
          </div>
          <a
            href="https://github.com/SAHILSHANGLOO35/Fold-Wallet"
            target="_blank"
          >
            <div className="text-white hover:bg-neutral-800 px-2 py-2 sm:px-3 sm:py-3 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
              <Github size={28} />
            </div>
          </a>
        </div>

        <div className="border-b border-neutral-400/20 absolute left-0 right-0"></div>

        {/* Hero section */}
        <div className="flex flex-col gap-2 pt-6 pb-6 sm:pt-7 sm:pb-7 md:pt-8 md:pb-8">
          <div className="manrope text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            From Solana to Ethereum - Seamless.
          </div>
          <div className="text-neutral-300 text-lg sm:text-xl manrope">
            Choose your preferable Blockchain and get started.
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <div
              className="bg-white hover:bg-neutral-200 transition-all duration-200 text-black px-6 py-3 sm:px-8 sm:py-2 manrope regular rounded-md cursor-pointer text-center"
              onClick={() => navigate("/solana-wallet")}
            >
              Solana
            </div>
            <div
              className="bg-white hover:bg-neutral-200 transition-all duration-200 text-black px-6 py-3 sm:px-8 sm:py-2 manrope regular rounded-md cursor-pointer text-center"
              onClick={() => navigate("/eth-wallet")}
            >
              Ethereum
            </div>
          </div>
        </div>

        <div className="border-b bottom-16 sm:bottom-20 border-neutral-400/20 absolute left-0 right-0" />

        {/* Footer */}
        <div className="absolute bottom-4 sm:bottom-7 left-8 sm:left-12 md:left-20 lg:left-36 xl:left-48">
          <div className="text-white text-sm sm:text-md manrope regular text-start">
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
