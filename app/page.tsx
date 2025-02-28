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

export default function App() {
    return (
        <Editor
            resolver={{
                Text,
                Heading,
                Container,
                LinkComponent,
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
