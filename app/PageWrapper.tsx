"use client";

import { Editor, Frame, Element } from "@craftjs/core";
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
import { generalPropsDefault } from "./components/Elements/GeneralSettings";
import { ButtonComponent } from "./components/Elements/ButtonComponent";
import { ThemeButtonComponent } from "./components/Elements/ThemeButtonComponent";
import { DeviceWidthProvider } from "@/contexts/DeviceWidthContext";

export default function PageWrapper() {
    return (
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
            <DeviceWidthProvider>
                <Header />
                <div className="flex flex-row gap-4 justify-between page-container relative max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-visible">
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
                                {/* <Element
                                canvas
                                id="1"
                                is={Text}
                                text="Hello world"
                            />
                            <Element
                                canvas
                                id="1"
                                is={Text}
                                text="Hello world"
                            /> */}
                            </Element>
                        </Frame>
                    </Viewport>
                    <SettingsPanel />
                </div>
            </DeviceWidthProvider>
        </Editor>
    );
}
