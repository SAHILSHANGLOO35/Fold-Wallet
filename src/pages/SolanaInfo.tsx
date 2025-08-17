import { useState, useEffect } from "react";
import { Github, Loader, WalletMinimal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useNavigate, useParams } from "react-router-dom";

const SOLANA_RPC_URL =
  "https://solana-mainnet.g.alchemy.com/v2/tlv2QFFNvRh8kBN0QY6W4";
const connection = new Connection(SOLANA_RPC_URL, "confirmed");

export default function SolanaWallet() {
  const navigate = useNavigate();
  const { publicKey } = useParams();
  const [walletPublicKey, setWalletPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [accountInfo, setAccountInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!publicKey) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const solanaPublicKey = new PublicKey(publicKey);
        setWalletPublicKey(solanaPublicKey.toBase58());

        // Get balance
        const balanceInLamports = await connection.getBalance(solanaPublicKey);
        setBalance(balanceInLamports / LAMPORTS_PER_SOL);

        // Get account info
        const accInfo = await connection.getAccountInfo(solanaPublicKey);
        setAccountInfo(accInfo);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [publicKey]);

  return (
    <div className="relative">
      <div className="min-h-screen text-neutral-200 overflow-x-hidden">
        <div className="min-h-screen mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-44 px-2 sm:px-4 border-l border-r border-neutral-400/20 pb-16 sm:pb-32 overflow-x-hidden">
          {/* Navbar */}
          <div className="flex gap-2 items-center justify-between h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32">
            <div
              className="flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <WalletMinimal className="text-white" size={32} />
              <div className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white manrope">
                Fold (SOL)
              </div>
            </div>
            <a
              href="https://github.com/SAHILSHANGLOO35/Fold-Wallet"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-white hover:bg-neutral-800 px-2 py-2 sm:px-3 sm:py-3 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
                <Github size={24} />
              </div>
            </a>
          </div>

          <div className="border-b border-neutral-400/20 absolute left-0 right-0"></div>

          {/* Content */}
          <div className="max-w-full relative pt-6 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="wallet-detail"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col gap-4"
              >
                <div className="manrope text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white flex flex-col">
                  <div>Solana Wallet Details</div>
                  <div className="text-neutral-300 text-base sm:text-lg md:text-xl manrope tracking-wide">
                    See your Solana Balance, Account Info and more.
                  </div>
                </div>

                {/* Loading Spinner */}
                {loading && (
                  <div className="text-neutral-300 flex items-center justify-center text-lg sm:text-xl manrope">
                    <Loader className="animate-spin" size={40} />
                  </div>
                )}

                {/* Wallet Info */}
                {!loading && walletPublicKey && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-neutral-100 border border-neutral-400/20 flex flex-col gap-2 rounded-md manrope mt-4"
                  >
                    {/* Wallet */}
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight flex flex-col sm:flex-row sm:items-baseline text-white p-4 manrope gap-2">
                      Wallet Address:
                      <span className="text-neutral-300 manrope regular text-base sm:text-lg break-all">
                        {walletPublicKey}
                      </span>
                    </div>

                    {/* Wallet details */}
                    <div className="bg-neutral-800/50 p-4 flex flex-col gap-y-6 rounded-md">
                      {/* Balance */}
                      <div className="flex flex-col gap-1">
                        <span className="text-white text-base sm:text-lg">
                          Balance
                        </span>
                        <span className="text-neutral-300 text-sm sm:text-base regular">
                          {balance !== null
                            ? `${balance.toFixed(4)} SOL`
                            : "0 SOL"}
                        </span>
                      </div>

                      {/* Account Info */}
                      <div className="flex flex-col gap-1">
                        <span className="text-white text-base sm:text-lg">
                          Account Info
                        </span>
                        {accountInfo ? (
                          <span className="text-neutral-200/80 break-all text-xs sm:text-sm">
                            Owner: {accountInfo.owner.toBase58()}
                            <br />
                            Executable: {accountInfo.executable ? "Yes" : "No"}
                            <br />
                            Lamports: {accountInfo.lamports}
                            <br />
                            Rent Epoch: {accountInfo.rentEpoch}
                            <br />
                            Space: {accountInfo.space} bytes
                          </span>
                        ) : (
                          <span className="text-neutral-400 text-sm font-medium">
                            No detailed account information found for this
                            address.
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {!loading && !walletPublicKey && (
                  <div className="text-neutral-400 text-base sm:text-lg md:text-xl manrope">
                    Please provide a wallet public key in the URL (e.g.,
                    /solana-wallet/YourPublicKeyHere).
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-b bottom-12 sm:bottom-16 md:bottom-20 border-neutral-400/20 absolute left-0 right-0" />
          <div className="absolute bottom-4 sm:bottom-7 left-4 right-4 sm:left-8 md:left-12 lg:left-20 xl:left-36 2xl:left-48">
            <div className="text-white text-xs sm:text-sm manrope">
              Designed and Developed by Sahil Shangloo ~ AKA{" "}
              <a
                className="hover:text-neutral-400 inline-block scale-100 hover:scale-105 transition-all duration-200"
                href="https://x.com/doubleSdotdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"{ doubleSdotdev }"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
