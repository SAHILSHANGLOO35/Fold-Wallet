import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import {
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Eye,
  EyeOff,
  Github,
  WalletMinimal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Wallet, HDNodeWallet } from "ethers";
import { useNavigate } from "react-router-dom";

export default function EthWallet() {
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const [privateKeys, setPrivateKeys] = useState<string[]>([]);
  const [showPrivateKeys, setShowPrivateKeys] = useState<boolean[]>([]);

  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    const words = mn.split(" ");
    setMnemonic(words);
    setIsOpen(false);
    setWalletGenerated(true);
    saveToLocalStorage(words, publicKeys, privateKeys);
    await handleAddWallet(words);
  };

  const handleAddWallet = async (mnemonicWords = mnemonic) => {
    const seed = await mnemonicToSeed(mnemonicWords.join(" "));
    const path = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    const newPublicKeys = [...publicKeys, wallet.address];
    const newPrivateKeys = [...privateKeys, wallet.privateKey];

    setCurrentIndex(currentIndex + 1);
    setPublicKeys(newPublicKeys);
    setPrivateKeys(newPrivateKeys);
    setShowPrivateKeys((prev) => [...prev, false]);

    saveToLocalStorage(mnemonic, newPublicKeys, newPrivateKeys);
  };

  // Save to localStorage
  const saveToLocalStorage = (
    mnemonicWords: string[],
    pubKeys: string[],
    privKeys: string[]
  ) => {
    localStorage.setItem("ethMnemonic", JSON.stringify(mnemonicWords));
    localStorage.setItem("ethPublicKeys", JSON.stringify(pubKeys));
    localStorage.setItem("ethPrivateKeys", JSON.stringify(privKeys));
  };

  // Load from localStorage when component mounts
  useEffect(() => {
    const storedMnemonic = localStorage.getItem("ethMnemonic");
    const storedPublicKeys = localStorage.getItem("ethPublicKeys");
    const storedPrivateKeys = localStorage.getItem("ethPrivateKeys");

    if (storedMnemonic && storedPublicKeys && storedPrivateKeys) {
      setMnemonic(JSON.parse(storedMnemonic));
      setPublicKeys(JSON.parse(storedPublicKeys));
      setPrivateKeys(JSON.parse(storedPrivateKeys));
      setWalletGenerated(true);
      setShowPrivateKeys(
        new Array(JSON.parse(storedPublicKeys).length).fill(false)
      );
    }
  }, []);

  const togglePrivateKey = (index: number) => {
    setShowPrivateKeys((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="min-h-screen text-neutral-200 overflow-x-hidden">
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

          {/* Content */}
          <div className="max-w-full max-h-full relative pt-6 pb-6 sm:pt-7 sm:pb-7 md:pt-8 md:pb-8">
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
                  className="flex flex-col gap-4 absolute inset-0 pt-6 sm:pt-7 md:pt-8"
                >
                  <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                    Your Secret Recovery Seed Phrase.
                  </div>
                  <div className="text-neutral-300 text-lg sm:text-xl">
                    Memorize these, save these, or put them inside a locker.
                  </div>
                  <button
                    className="bg-white max-w-60 hover:bg-neutral-200 transition-all duration-200 text-black px-6 py-3 sm:px-8 sm:py-2 rounded-md cursor-pointer"
                    onClick={handleGenerateMnemonic}
                  >
                    Generate ETH Wallet
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
                    className="border border-neutral-400/20 rounded-md px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 cursor-pointer transition-all duration-200"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {/* Header */}
                    <div className="w-full flex items-center justify-between text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter manrope">
                      <span className="leading-none font-medium text-white">
                        See Your Secret Phrase
                      </span>
                      <span className="flex items-center justify-center hover:bg-neutral-800 rounded-md transition-all duration-200 px-2 py-1 sm:px-3 sm:py-2">
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
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
                            className="rounded-md px-3 py-3 sm:px-4 sm:py-4 text-start"
                            style={{
                              background: "rgba(250, 250, 250, 0.05)",
                            }}
                          >
                            <span className="text-neutral-400 text-sm">
                              {index + 1}.
                            </span>{" "}
                            <span className="text-sm sm:text-base">{word}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mt-4 flex-col sm:flex-row gap-4 sm:gap-0">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white manrope">
                        Ethereum Wallet
                      </div>

                      <button
                        className="bg-white hover:bg-neutral-200 transition-all duration-200 text-black px-6 py-3 sm:px-8 sm:py-2 manrope regular rounded-md cursor-pointer w-full sm:w-auto"
                        onClick={() => handleAddWallet()}
                      >
                        Add Wallet
                      </button>
                    </div>
                  </div>

                  <motion.div className="flex flex-col gap-4 w-full mt-4">
                    <AnimatePresence>
                      {publicKeys.map((pk, index) => (
                        <motion.div
                          key={pk}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="text-neutral-100 border border-neutral-400/20 flex flex-col gap-2 rounded-md manrope"
                        >
                          <div className="text-xl sm:text-2xl md:text-3xl p-4 font-semibold tracking-tight text-white flex items-center justify-between">
                            <div>Wallet {index + 1}</div>
                            <div
                              className="hover:bg-neutral-700 px-2 py-1.5 rounded-md transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center justify-center gap-2"
                              onClick={() =>
                                navigate(`/eth-wallet/${publicKeys[index]}`)
                              }
                            >
                              <div className="text-[18px]">Account</div>
                              <CircleDollarSign
                                className="text-white"
                                size={20}
                              />
                            </div>
                          </div>
                          <div className="bg-neutral-800/50 p-4 flex flex-col gap-y-6 sm:gap-y-8 rounded-md">
                            <div className="flex flex-col gap-1">
                              <span className="text-white text-sm sm:text-base">
                                Public Key
                              </span>
                              <span className="text-neutral-200/80 regular text-sm sm:text-base break-all">
                                {pk}
                              </span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-white text-sm sm:text-base">
                                Private Key
                              </span>
                              <div className="flex justify-between items-center">
                                <input
                                  type={
                                    showPrivateKeys[index] ? "text" : "password"
                                  }
                                  value={privateKeys[index]}
                                  className="text-neutral-200/80 regular pr-4 sm:pr-12 outline-none w-full bg-transparent text-sm sm:text-base"
                                  readOnly
                                />
                                <div
                                  className="hover:bg-neutral-700 px-2 py-1.5 rounded-md transition-all duration-200 cursor-pointer flex-shrink-0"
                                  onClick={() => togglePrivateKey(index)}
                                >
                                  {showPrivateKeys[index] ? (
                                    <Eye size={18} />
                                  ) : (
                                    <EyeOff size={18} />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-b bottom-16 sm:bottom-20 border-neutral-400/20 absolute left-0 right-0" />

          <div className="absolute bottom-4 sm:bottom-7 left-8 right-4 sm:left-12 md:left-20 lg:left-36 xl:left-48">
            <div className="text-white text-sm sm:text-md manrope regular">
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
    </div>
  );
}
