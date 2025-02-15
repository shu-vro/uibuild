"use client";

import { Editor, Frame, Element } from "@craftjs/core";
import { Text } from "./components/Elements/Text";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import Toolbox from "./components/Toolbox";
import { Container } from "./components/Elements/Container";
import RenderNode from "./components/RenderNode";
import { generalPropsDefault } from "./components/Elements/GeneralSettings";
import { defaultBackground } from "./components/BackgroundInput";
import Viewport from "./components/Viewport";

export default function App() {
    return (
        <Editor
            resolver={{
                Text,
                Container,
            }}
            onRender={RenderNode}
        >
            <Header />
            <div className="flex flex-row gap-4 justify-between page-container relative max-h-screen">
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
                            <Element
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
                            />
                        </Element>
                    </Frame>
                </Viewport>
                <SettingsPanel />
            </div>
        </Editor>
    );
}
