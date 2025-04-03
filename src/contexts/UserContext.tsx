"use client";

import { account } from "@/appwriteConfig";
import { Models, ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UserContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    isAuthing: boolean;
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
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthing, setIsAuthing] = useState(false);

    useEffect(() => {
        const fetchSavedUser = async () => {
            setIsLoading(true);
            try {
                const fetchedUser = await account.get();
                setUser(fetchedUser);
            } catch (error) {
                toast.warning("No user found");
                console.log("no user found", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSavedUser();
    }, []);

    const fetchSavedUser = async () => {
        return await account.get();
    };

    const createUserUsingEmailAndPassword = async (
        email: string,
        password: string,
        displayName: string,
    ) => {
        setIsAuthing(true);
        const user = await account.create(
            ID.unique(),
            email,
            password,
            displayName,
        );
        setUser(user);
        setIsAuthing(false);
    };

    const loginUserUsingEmailAndPassword = async (
        email: string,
        password: string,
    ) => {
        setIsAuthing(true);
        await account.createEmailPasswordSession(email, password);
        const fetchedUser = await fetchSavedUser();
        setUser(fetchedUser);
        setIsAuthing(false);
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
                isAuthing,
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
