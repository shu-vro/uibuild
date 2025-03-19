"use client";

import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import React from "react";
import { Text } from "../components/Elements/Text";
import { Container } from "../components/Elements/Container";
import ConfigComponent from "./ConfigComponent";
import { Heading } from "../components/Elements/Heading";
import { LinkComponent } from "../components/Elements/Link";
import { ImageComponent } from "../components/Elements/ImageComponent";
import { ButtonComponent } from "../components/Elements/ButtonComponent";
import RenderNode from "../components/RenderNode";
import { generalPropsDefault } from "../components/Elements/GeneralSettings";

export default function View() {
    return (
        <Editor
            enabled={false}
            resolver={{
                Text,
                Heading,
                Container,
                LinkComponent,
                ImageComponent,
                ButtonComponent,
            }}
            onRender={RenderNode}
        >
            <div className="flex flex-row gap-4 justify-between page-container relative">
                <Frame>
                    <Element
                        canvas
                        is={Container}
                        normal={{
                            ...generalPropsDefault,
                            paddingAll: "20px",
                            width: "100%",
                            backgrounds: [],
                        }}
                    >
                        <Element canvas id="1" is={Text} text="Hello world" />
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
                <ConfigComponent />
            </div>
        </Editor>
    );
}
