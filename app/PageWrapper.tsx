"use client";

import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Text } from "./editor/components/Elements/Text";
import Header from "./editor/components/Header";
import SettingsPanel from "./editor/components/SettingsPanel";
import Toolbox from "./editor/components/Toolbox";
import { Container } from "./editor/components/Elements/Container";
import RenderNode from "./editor/components/RenderNode";
import Viewport from "./editor/components/Viewport";
import { Heading } from "./editor/components/Elements/Heading";
import { LinkComponent } from "./editor/components/Elements/Link";
import { ImageComponent } from "./editor/components/Elements/ImageComponent";
import { ButtonComponent } from "./editor/components/Elements/ButtonComponent";
import { ThemeButtonComponent } from "./editor/components/Elements/ThemeButtonComponent";
import { DeviceWidthProvider } from "@/contexts/DeviceWidthContext";
import { cn } from "@/lib/utils";

export default function PageWrapper() {
    return (
        <DeviceWidthProvider>
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
