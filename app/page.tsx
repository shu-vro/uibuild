"use client";

import { Editor, Frame, Element } from "@craftjs/core";
import { Text } from "./components/Elements/Text";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import Toolbox from "./components/Toolbox";
import { Container } from "./components/Elements/Container";
import RenderNode from "./components/RenderNode";
import { generalPropsDefault } from "./components/Elements/GeneralSettings";

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
                <div className="grow border-x-2">
                    <Frame>
                        <Element
                            canvas
                            is={Container}
                            normal={{
                                ...generalPropsDefault,
                                // paddingOption: "all",
                                paddingAll: "20px",
                                // backgrounds: [
                                //     {
                                //         id: -1,
                                //         fields: {
                                //             type: "color",
                                //             color: {
                                //                 color: "rgba(255,0,0,1)",
                                //             },
                                //             gradient: {
                                //                 gradient:
                                //                     "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 100%)",
                                //             },
                                //         },
                                //     },
                                // ],
                            }}
                            // data-cy="root-container"
                        >
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
                            />
                            <Element
                                canvas
                                id="1"
                                is={Text}
                                text="Hello world"
                            /> */}
                        </Element>
                    </Frame>
                </div>

                <SettingsPanel />
            </div>
        </Editor>
    );
}
