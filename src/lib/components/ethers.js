import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";

export const EthersProviderContext = React.createContext(null);

export const Web3ConnectButton = (props) => {
  const ethersProviderContext = useContext(EthersProviderContext);
  const [{ wallet, connecting }, connect, disconnect] =
    ethersProviderContext?.useConnectWallet
      ? ethersProviderContext?.useConnectWallet()
      : [{}];

  return (
    <Button
      {...props}
      disabled={(wallet ? !disconnect : !connect) || connecting}
      onClick={() => (wallet ? disconnect?.(wallet) : connect?.())}
    >
      <div>
        {connecting
          ? props.connectingLabel ?? "Connecting"
          : wallet
          ? props.disconnectLabel ?? "Disconnect Web3 Wallet"
          : props.connectLabel ?? "Connect Web3 Wallet"}
      </div>
    </Button>
  );
};
