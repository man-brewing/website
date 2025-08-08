import React, { createContext, useState } from 'react';

export interface ConfigContextType {
  isAgeVerified: boolean;
  setIsAgeVerified: (value: boolean) => void;
}

const defaultConfig: ConfigContextType = {
  isAgeVerified: false,
  setIsAgeVerified: (value: boolean) => {
    defaultConfig.isAgeVerified = value;
  },
};

const ConfigContext = createContext(defaultConfig);

export default ConfigContext;

export const ConfigProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);

  return (
    <ConfigContext.Provider value={{ isAgeVerified, setIsAgeVerified }}>
      {children}
    </ConfigContext.Provider>
  );
};
