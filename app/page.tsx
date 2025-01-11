"use client";

import { Editor, Frame, Element } from "@craftjs/core";
import { Text } from "./components/Elements/Text";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import Toolbox from "./components/Toolbox";
import { Container } from "./components/Elements/Container";
import RenderNode from "./components/RenderNode";

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
            <div className="flex flex-row gap-4 justify-between page-container relative">
                <Toolbox />
                <div className="grow border-x-2">
                    <Frame>
                        <Element
                            canvas
                            is={Container}
                            padding={20}
                            background={"#ffffff00"}
                            data-cy="root-container"
                        >
                            <Element
                                canvas
                                id="1"
                                is={Text}
                                text="Hello world"
                                fontSize={15}
                                textAlign="left"
                            />
                            <Element
                                canvas
                                id="1"
                                is={Text}
                                text="Hello world"
                                fontSize={15}
                                textAlign="left"
                            />
                            <Element
                                canvas
                                id="1"
                                is={Text}
                                text="Hello world"
                                fontSize={15}
                                textAlign="left"
                            />
                        </Element>
                    </Frame>
                </div>

                <SettingsPanel />
            </div>
        </Editor>
    );
}
