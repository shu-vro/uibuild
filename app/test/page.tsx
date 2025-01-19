"use client";

import { Resizable } from "re-resizable";
import React, { useState } from "react";

export default function page() {
    const [dim, setDim] = useState({ width: 200, height: 200 });
    return (
        <div>
            <Resizable
                size={dim}
                onResize={(_, __, ___, d) => {
                    console.log(d);
                }}
                className="border-border border-1"
            >
                <div>Resizable</div>
            </Resizable>
        </div>
    );
}
