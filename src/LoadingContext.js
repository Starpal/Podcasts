// LoadingContext.js
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
    loading: false,
    setLoading: null,
});

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const value = { loading, setLoading };
    return (
        <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}