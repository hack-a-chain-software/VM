import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";

export const EthersProviderContext = React.createContext(null);

export const Web3ConnectButton = ({ connectingLabel, disconnectLabel, connectLabel, ...args}) => {
  const ethersProviderContext = useContext(EthersProviderContext);
  const [{ wallet, connecting }, connect, disconnect] =
    ethersProviderContext?.useConnectWallet
      ? ethersProviderContext?.useConnectWallet()
      : [{}];

  return (
    <Button
      {...args}
      disabled={(wallet ? !disconnect : !connect) || connecting}
      onClick={() => (wallet ? disconnect?.(wallet) : connect?.())}
    >
      <div>
        {connecting
          ? connectingLabel ?? "Connecting"
          : wallet
          ? disconnectLabel ?? "Disconnect Web3 Wallet"
          : connectLabel ?? "Connect Web3 Wallet"}
      </div>
    </Button>
  );
};
