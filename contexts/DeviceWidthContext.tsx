"use client";

import { createContext, useContext, useState } from "react";

type Mode = keyof typeof MOCK_DEVICE_BREAKPOINTS;
type DeviceWidthType = {
    mode: Mode;
    size: (typeof MOCK_DEVICE_BREAKPOINTS)[Mode];
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
};
const Context = createContext({
    mode: "full",
    size: "w-full",
} as DeviceWidthType);

export const DeviceWidthContext = Context;

export function useDeviceWidth() {
    return useContext(Context);
}

export const MOCK_DEVICE_BREAKPOINTS = {
    full: "w-full",
    laptop: "w-[1024px]",
    tablet: "w-[768px]",
    mobile: "w-[350px]",
} as const;

export const DeviceWidthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mode, setMode] = useState<Mode>("full");
    const size = MOCK_DEVICE_BREAKPOINTS[mode];
    return (
        <Context.Provider value={{ mode, size, setMode }}>
            {children}
        </Context.Provider>
    );
};
