import React, { createContext, useState } from "react";
export const ContractAliceContext = createContext();

const ContractAliceProvider = ({ children }) => {
    const [contractAlice, setContractAlice] = useState();
    
    const contractContextData = {
        contractAlice,
        setContractAlice,
    };

    return (
        <ContractAliceContext.Provider value={contractContextData}>
            {children}
        </ContractAliceContext.Provider>
    );
};

export default ContractAliceProvider;
