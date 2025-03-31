"use client";

import { account } from "@/appwriteConfig";
import { useEffectOnce } from "@craftjs/utils";
import { Models, ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    createUserUsingEmailAndPassword: (
        email: string,
        password: string,
        displayName: string,
    ) => Promise<void>;
    loginUserUsingEmailAndPassword: (
        email: string,
        password: string,
    ) => Promise<void>;
    fetchSavedUser: () => Promise<Models.User<Models.Preferences>>;
    logOut: () => Promise<void>;
};

const Context = createContext({} as UserContextType);

export const DeviceWidthContext = Context;

export function useUser() {
    return useContext(Context);
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
        null,
    );

    useEffect(() => {
        const fetchSavedUser = async () => {
            try {
                const fetchedUser = await account.get();
                setUser(fetchedUser);
            } catch (error) {
                console.log("No user found");
            }
        };
        fetchSavedUser();
    }, []);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSavedUser = async () => {
        return await account.get();
    };

    const createUserUsingEmailAndPassword = async (
        email: string,
        password: string,
        displayName: string,
    ) => {
        setIsLoading(true);
        const user = await account.create(
            ID.unique(),
            email,
            password,
            displayName,
        );
        setUser(user);
        setIsLoading(false);
    };

    const loginUserUsingEmailAndPassword = async (
        email: string,
        password: string,
    ) => {
        setIsLoading(true);
        await account.createEmailPasswordSession(email, password);
        const fetchedUser = await fetchSavedUser();
        setUser(fetchedUser);
        setIsLoading(false);
    };

    const logOut = async () => {
        await account.deleteSession("current");
        setUser(null);
    };
    return (
        <Context.Provider
            value={{
                user,
                isLoading,
                createUserUsingEmailAndPassword,
                loginUserUsingEmailAndPassword,
                fetchSavedUser,
                logOut,
            }}
        >
            {children}
        </Context.Provider>
    );
};
