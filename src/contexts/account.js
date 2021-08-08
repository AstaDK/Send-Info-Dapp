import React, { createContext, useState } from "react";
export const UserAccountContext = createContext();

const UserAccountProvider = ({ children }) => {
  const [accountETH, setAccountETH] = useState();
  console.log(
    "The network that the user connected",
    accountETH?.account?.networkAccount?.provider?.connection?.url
  );

  const accountContextData = {
    accountETH,
    setAccountETH,
  };

  return (
    <UserAccountContext.Provider value={accountContextData}>
      {children}
    </UserAccountContext.Provider>
  );
};

export default UserAccountProvider;
