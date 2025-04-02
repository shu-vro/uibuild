"use client";

import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Text } from "./components/Elements/Text";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import Toolbox from "./components/Toolbox";
import { Container } from "./components/Elements/Container";
import RenderNode from "./components/RenderNode";
import Viewport from "./components/Viewport";
import { Heading } from "./components/Elements/Heading";
import { LinkComponent } from "./components/Elements/Link";
import { ImageComponent } from "./components/Elements/ImageComponent";
import { ButtonComponent } from "./components/Elements/ButtonComponent";
import { ThemeButtonComponent } from "./components/Elements/ThemeButtonComponent";
import { DeviceWidthProvider } from "@/src/contexts/DeviceWidthContext";
import { cn } from "@/src/lib/utils";
import WorkspaceInfoProvider from "@/src/contexts/WorkspaceInfoProvider";

export default function PageWrapper() {
    return (
        <Providers>
            <Editor
                resolver={{
                    Text,
                    Heading,
                    Container,
                    LinkComponent,
                    ImageComponent,
                    ButtonComponent,
                    ThemeButtonComponent,
                }}
                onRender={RenderNode}
            >
                <Header />
                <Wrapper>
                    <Toolbox />
                    <Viewport>
                        <Frame>
                            <Element canvas is={Container}>
                                <Element
                                    canvas
                                    id="1"
                                    is={Text}
                                    text="Hello world"
                                />
                            </Element>
                        </Frame>
                    </Viewport>
                    <SettingsPanel />
                </Wrapper>
            </Editor>
        </Providers>
    );
}

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <DeviceWidthProvider>
            <WorkspaceInfoProvider>{children}</WorkspaceInfoProvider>
        </DeviceWidthProvider>
    );
}

function Wrapper({ children }: { children: React.ReactNode }) {
    const { enabled } = useEditor((state, query) => ({
        enabled: state.options.enabled,
    }));
    return (
        <div
            className={cn(
                "flex flex-row justify-between page-container relative overflow-y-auto overflow-x-hidden",
                enabled ? "max-h-[calc(100vh-4rem)]" : "max-h-screen",
            )}
        >
            {children}
        </div>
    );
}
