import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
    email: string;
    setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<string>('');

    return (
        <UserContext.Provider value={{ email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
};
