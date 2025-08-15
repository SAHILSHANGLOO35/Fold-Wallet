import { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  WalletMinimal,
} from "lucide-react";
import { derivePath } from "ed25519-hd-key";
import { AnimatePresence, motion } from "motion/react";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export default function SolanaWallet() {
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const [privateKeys, setPrivateKeys] = useState<string[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn.split(" "));
    setIsOpen(false);
    setWalletGenerated(true);
  };

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic.join(" "));
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setCurrentIndex(currentIndex + 1);
    setPublicKeys((prev) => [...prev, keypair.publicKey.toBase58()]);
    setPrivateKeys((prev) => [
      ...prev,
      Buffer.from(keypair.secretKey).toString("hex"),
    ]);
  };

  return (
    <div className="min-h-screen text-neutral-200 overflow-x-hidden">
      <div className="min-h-screen mx-44 px-4 border-l border-r border-neutral-400/20 pb-32 overflow-x-hidden">
        {/* Navbar */}
        <div className="flex gap-2 items-center h-32">
          <WalletMinimal className="text-white" size={32} />
          <div className="font-extrabold text-4xl text-white manrope">Fold</div>
        </div>

        {/* Content */}
        <div className="max-w-full max-h-full relative">
          <AnimatePresence mode="wait">
            {!walletGenerated && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-4 absolute inset-0"
              >
                <div className="text-5xl font-bold tracking-tight text-white">
                  Your Secret Recovery Seed Phrase.
                </div>
                <div className="text-neutral-300 text-xl">
                  Memorize these, save these, or put them inside a locker.
                </div>
                <button
                  className="bg-white max-w-52 hover:bg-neutral-200 transition-all duration-200 text-black px-8 py-2 rounded-md cursor-pointer"
                  onClick={handleGenerateMnemonic}
                >
                  Generate Wallet
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {walletGenerated && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="flex flex-col inset-0"
              >
                <div
                  className="border border-neutral-400/20 rounded-md px-8 py-8 cursor-pointer transition-all duration-200"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {/* Header */}
                  <div className="w-full flex items-center justify-between text-2xl md:text-3xl font-bold tracking-tighter manrope">
                    <span className="leading-none font-medium text-white">
                      See Your Secret Phrase
                    </span>
                    <span className="flex items-center justify-center hover:bg-neutral-800 rounded-md transition-all duration-200 px-3 py-2">
                      {isOpen ? (
                        <ChevronUp size={22} />
                      ) : (
                        <ChevronDown size={22} />
                      )}
                    </span>
                  </div>

                  {/* Mnemonic Grid */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? 24 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {mnemonic.map((word, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{
                            opacity: isOpen ? 1 : 0,
                            y: isOpen ? 0 : -10,
                          }}
                          transition={{
                            delay: isOpen ? index * 0.03 : 0,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="rounded-md px-4 py-4 text-start"
                          style={{
                            background: "rgba(250, 250, 250, 0.05)",
                          }}
                        >
                          <span className="text-neutral-400 text-sm">
                            {index + 1}.
                          </span>{" "}
                          {word}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-2xl md:text-4xl font-bold tracking-tight text-white manrope">
                    Solana Wallet
                  </div>
                  <button
                    className="bg-white hover:bg-neutral-200 transition-all duration-200 text-black px-8 py-2 manrope regular rounded-md cursor-pointer"
                    onClick={handleAddWallet}
                  >
                    Add Wallet
                  </button>
                </div>
                <motion.div className="flex flex-col gap-4 w-full mt-4">
                  {publicKeys.map((pk, currentIndex) => (
                    <div
                      key={currentIndex}
                      className="text-neutral-100 border border-neutral-400/20 flex flex-col gap-2 rounded-md manrope"
                    >
                      <div className="text-2xl p-4 md:text-3xl font-semibold tracking-tight text-white">
                        Wallet {currentIndex + 1}
                      </div>
                      <div className="bg-neutral-800/50 p-4 flex flex-col gap-y-8 rounded-md">
                        <div className="flex flex-col gap-1">
                          <span className="text-white">Public Key</span>
                          <span className="text-neutral-200/80 regular tracking-tighter">
                            {pk}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-white">Private Key</span>
                          <div className="flex justify-between">
                            <input
                              type={showPrivateKey ? "text" : "password"}
                              value={privateKeys[currentIndex]}
                              className="text-neutral-200/80 regular tracking-tighter break-all pr-12 outline-none w-full"
                            />
                            <div className="hover:bg-neutral-700 px-2 py-1.5 rounded-md transition-all duration-200 cursor-pointer">
                              {showPrivateKey ? (
                                <Eye
                                  size={18}
                                  onClick={() =>
                                    setShowPrivateKey(!showPrivateKey)
                                  }
                                />
                              ) : (
                                <EyeOff
                                  size={18}
                                  onClick={() =>
                                    setShowPrivateKey(!showPrivateKey)
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
