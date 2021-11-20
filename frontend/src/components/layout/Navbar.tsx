import React, { ReactElement, useState } from "react";
import { useMessage } from "../../context/MessageContext";
import { useTransaction } from "../../context/TransactionContext";
import { useWallet } from "../../context/WalletContext";
import { getTruncatedAddress, joinClasses } from "../../helpers";
import { getSignerAddress } from "../../provider";
import Button from "../Button";
import CircularLoader from "../CircularLoader";
import GlobalMessage from "../GlobalMessage";
import { Link, useNavigate } from "react-router-dom";
import BootcampModal from "../modal/BootcampModal";
import GraduateStudentModal from "../modal/GraduateStudentsModal";

export default function Navbar(): ReactElement {
  const { pending } = useTransaction();
  const { walletAddress, setWalletAddress } = useWallet();
  const { setGlobalMessage } = useMessage();
  const [showCertify, setShowCertify] = useState(false);
  const [showBootcampModal, setShowBootcampModal] = useState(false);

  const navigate = useNavigate();

  const handleConnect = async () => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      await ethereum.request({ method: "eth_requestAccounts" });
      // try {
      //   await ethereum.request({
      //     method: "wallet_switchEthereumChain",
      //     params: [{ chainId: "0x4" }],
      //   });
      const address = await getSignerAddress();
      if (address && setWalletAddress && setGlobalMessage) {
        setWalletAddress(address);
        setGlobalMessage({
          message: "Wallet connected successfully!",
          type: "success",
        });
        setTimeout(() => {
          setGlobalMessage({});
        }, 3000);
      }
      // } catch (err: any) {
      //   console.log(err.message);
      // }
    }
  };

  return (
    <div>
      <div
        className={joinClasses(
          "py-4",
          "shadow-md",
          "flex",
          "justify-around",
          "items-center"
        )}
      >
        <div id="brand" className="inline-flex" onClick={() => navigate("/")}>
          <img
            className="object-cover cursor-pointer h-30 w-36 sm:h-14"
            src="/images/Logo.png"
            alt="Logo"
          />
        </div>
        <ul id="nav-links" className="flex items-center space-x-4">
          <li
            className={joinClasses(
              "cursor-pointer",
              "text-base",
              "tracking-wide "
            )}
          >
            <Link
              onClick={() => setShowCertify(true)}
              to="/"
              className={joinClasses(
                " py-3",
                "px-4",
                "rounded-md",
                "font-semibold",
                "shadow-md",
                "bg-blue-600",
                "text-white",
                "hover:shadow-lg "
              )}
            >
              Certify
            </Link>
          </li>
          <li className={joinClasses("cursor-pointer", "text-base")}>
            <Link
              onClick={() => setShowBootcampModal(true)}
              to="/"
              className={joinClasses(
                " py-3",
                "px-4",
                "rounded-md",
                "font-semibold",
                "shadow-md",
                "bg-blue-600",
                "text-white",
                "hover:shadow-lg "
              )}
            >
              Create Course
            </Link>
          </li>
          {pending && (
            <li>
              <Button
                color="warning"
                className="flex items-center justify-around mr-4"
              >
                <CircularLoader />
                Pending...
              </Button>
            </li>
          )}
          <li>
            {walletAddress ? (
              <Button className="px-2 py-1 border rounded">
                {getTruncatedAddress(walletAddress)}
              </Button>
            ) : (
              <Button color="success" onClick={handleConnect}>
                Connect
              </Button>
            )}
          </li>
        </ul>
      </div>
      <GlobalMessage />
      <BootcampModal
        showBootcampModal={showBootcampModal}
        setShowBootcampModal={setShowBootcampModal}
      />
      <GraduateStudentModal show={showCertify} setShow={setShowCertify} />
    </div>
  );
}
