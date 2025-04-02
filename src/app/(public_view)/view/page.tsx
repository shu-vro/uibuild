"use client";

import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import React from "react";
import { Text } from "@/src/app/(protected_routes)/editor/components/Elements/Text";
import { Container } from "@/src/app/(protected_routes)/editor/components/Elements/Container";
import ConfigComponent from "./ConfigComponent";
import { Heading } from "@/src/app/(protected_routes)/editor/components/Elements/Heading";
import { LinkComponent } from "@/src/app/(protected_routes)/editor/components/Elements/Link";
import { ImageComponent } from "@/src/app/(protected_routes)/editor/components/Elements/ImageComponent";
import { ButtonComponent } from "@/src/app/(protected_routes)/editor/components/Elements/ButtonComponent";
import RenderNode from "@/src/app/(protected_routes)/editor/components/RenderNode";
import { ThemeButtonComponent } from "@/src/app/(protected_routes)/editor/components/Elements/ThemeButtonComponent";

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
                ThemeButtonComponent,
            }}
            onRender={RenderNode}
        >
            <div className="flex flex-row gap-4 justify-between page-container relative">
                <Frame>
                    <Element canvas is={Container}>
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
