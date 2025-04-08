// AccountOverlayContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Contextの型定義
interface AccountOverlayContextType {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

// ✅ Contextの初期化
const AccountOverlayContext = createContext<AccountOverlayContextType>({
  isOpen: false,
  setOpen: () => {},
});

// ✅ Providerコンポーネント（childrenの型定義を追加）
export function AccountOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <AccountOverlayContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </AccountOverlayContext.Provider>
  );
}

// ✅ useContextを呼び出すフック
export const useAccountOverlay = () => useContext(AccountOverlayContext);
