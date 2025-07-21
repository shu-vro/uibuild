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
import { Html } from "./components/Elements/Html";
import { generalPropsDefault } from "./components/Elements/GeneralSettings";

export default function PageWrapper() {
    return (
        <Providers>
            <Editor
                resolver={{
                    Text,
                    Html,
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
                            <Element canvas is={Html}>
                                <Element
                                    canvas
                                    is={Container}
                                    normal={{
                                        ...generalPropsDefault,
                                        marginLeft: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginRight: "auto",
                                        marginOption: "custom",
                                    }}
                                >
                                    <Element
                                        canvas
                                        is={Container}
                                        normal={{
                                            ...generalPropsDefault,
                                            background:
                                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            paddingAll: "120px 40px",
                                            textAlign: "center",
                                            width: "100%",
                                            position: "relative",
                                            minHeight: "100vh",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Element
                                            is={Heading}
                                            heading="h1"
                                            text="Build Beautiful Websites with Ease"
                                            normal={{
                                                ...generalPropsDefault,
                                                fontSize: "4rem",
                                                fontWeight: "800",
                                                color: "#ffffff",
                                                marginBottom: "1.5rem",
                                                textAlign: "center",
                                                lineHeight: "1.1",
                                                textShadow:
                                                    "0 4px 8px rgba(0, 0, 0, 0.3)",
                                                maxWidth: "800px",
                                            }}
                                        />
                                        <Element
                                            is={Text}
                                            text="Create stunning, responsive websites with our powerful drag-and-drop editor. No coding required - just pure creativity unleashed."
                                            normal={{
                                                ...generalPropsDefault,
                                                fontSize: "1.4rem",
                                                color: "rgba(255, 255, 255, 0.9)",
                                                marginBottom: "3rem",
                                                maxWidth: "700px",
                                                lineHeight: "1.6",
                                                textAlign: "center",
                                                textShadow:
                                                    "0 2px 4px rgba(0, 0, 0, 0.2)",
                                            }}
                                        />
                                        <Element
                                            canvas
                                            is={Container}
                                            normal={{
                                                ...generalPropsDefault,
                                                display: "flex",
                                                gap: "1.5rem",
                                                flexWrap: "wrap",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                paddingAll: "0.5rem",
                                            }}
                                        >
                                            <Element
                                                is={ButtonComponent}
                                                text="Start Building Now"
                                                variant="solid"
                                                color="primary"
                                                normal={{
                                                    ...generalPropsDefault,
                                                    paddingAll: "1rem",
                                                    fontSize: "1.2rem",
                                                    borderRadiusAll: "12px",
                                                    overflowAll: "hidden",
                                                    fontWeight: "700",
                                                    backgroundColor: "#4f46e5",
                                                    fontColor: "#ffffff",
                                                    boxShadow:
                                                        "0 8px 25px rgba(79, 70, 229, 0.4)",
                                                    transition: "all 0.3s ease",
                                                    transform: "translateY(0)",
                                                }}
                                                hover={{
                                                    ...generalPropsDefault,
                                                    boxShadow:
                                                        "0 12px 35px rgba(79, 70, 229, 0.6)",
                                                    transition: "all 0.3s ease",
                                                    transform:
                                                        "translateY(-2px)",
                                                }}
                                            />
                                            <Element
                                                is={ButtonComponent}
                                                text="Watch Demo"
                                                variant="bordered"
                                                color="default"
                                                normal={{
                                                    ...generalPropsDefault,
                                                    paddingAll: "1rem",
                                                    fontSize: "1.2rem",
                                                    borderRadiusAll: "12px",
                                                    borderWidth: "2px",
                                                    borderColor:
                                                        "rgba(255, 255, 255, 0.8)",
                                                    color: "#ffffff",
                                                    fontWeight: "600",
                                                    overflowAll: "hidden",
                                                    backgroundColor:
                                                        "rgba(255, 255, 255, 0.1)",
                                                    backdropFilter:
                                                        "blur(10px)",
                                                    transition: "all 0.3s ease",
                                                }}
                                                hover={{
                                                    ...generalPropsDefault,
                                                    paddingAll: "1rem",
                                                    fontSize: "1.2rem",
                                                    borderRadiusAll: "12px",
                                                    borderWidth: "2px",
                                                    borderColor: "#ffffff",
                                                    color: "#667eea",
                                                    fontWeight: "600",
                                                    backgroundColor: "#ffffff",
                                                    overflowAll: "hidden",
                                                    backdropFilter:
                                                        "blur(10px)",
                                                    transition: "all 0.3s ease",
                                                }}
                                            />
                                        </Element>

                                        {/* Trust indicators */}
                                        <Element
                                            is={Text}
                                            text="⭐ Trusted by 10,000+ creators worldwide"
                                            normal={{
                                                ...generalPropsDefault,
                                                fontSize: "1rem",
                                                color: "rgba(255, 255, 255, 0.7)",
                                                marginTop: "3rem",
                                                textAlign: "center",
                                            }}
                                        />
                                    </Element>

                                    <Element
                                        canvas
                                        is={Container}
                                        normal={{
                                            ...generalPropsDefault,
                                            paddingOption: "custom",
                                            paddingTop: "80px",
                                            paddingBottom: "80px",
                                            paddingLeft: "40px",
                                            paddingRight: "40px",
                                            backgroundColor: "#f8fafc",
                                            width: "100%",
                                        }}
                                    >
                                        <Element
                                            is={Heading}
                                            heading="h2"
                                            text="Amazing Features"
                                            normal={{
                                                ...generalPropsDefault,
                                                fontSize: "2.5rem",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                marginBottom: "3rem",
                                                color: "#1a202c",
                                            }}
                                        />

                                        <Element
                                            canvas
                                            is={Container}
                                            normal={{
                                                ...generalPropsDefault,
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: "2rem",
                                                maxWidth: "1200px",
                                                margin: "0 auto",
                                                flexWrap: "wrap",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {/* Feature 1 */}
                                            <Element
                                                canvas
                                                is={Container}
                                                normal={{
                                                    ...generalPropsDefault,
                                                    backgroundColor: "#ffffff",
                                                    paddingAll: "2rem",
                                                    borderRadiusAll: "12px",
                                                    boxShadow:
                                                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                                    textAlign: "center",
                                                    flex: "1 1 300px",
                                                    minWidth: "300px",
                                                    maxWidth: "380px",
                                                }}
                                            >
                                                <Element
                                                    is={ImageComponent}
                                                    src="https://picsum.photos/80/80?random=1"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        width: "80px",
                                                        height: "80px",
                                                        margin: "0 auto 1rem auto",
                                                        borderRadiusAll: "50%",
                                                    }}
                                                />
                                                <Element
                                                    is={Heading}
                                                    heading="h3"
                                                    text="Fast & Reliable"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        fontSize: "1.5rem",
                                                        fontWeight: "600",
                                                        marginBottom: "1rem",
                                                        color: "#1a202c",
                                                    }}
                                                />
                                                <Element
                                                    is={Text}
                                                    text="Lightning-fast performance with 99.9% uptime. Your website will always be ready for your visitors."
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        color: "#4a5568",
                                                        lineHeight: "1.6",
                                                    }}
                                                />
                                            </Element>

                                            {/* Feature 2 */}
                                            <Element
                                                canvas
                                                is={Container}
                                                normal={{
                                                    ...generalPropsDefault,
                                                    backgroundColor: "#ffffff",
                                                    paddingAll: "2rem",
                                                    borderRadiusAll: "12px",
                                                    boxShadow:
                                                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                                    textAlign: "center",
                                                    flex: "1 1 300px",
                                                    minWidth: "300px",
                                                    maxWidth: "380px",
                                                }}
                                            >
                                                <Element
                                                    is={ImageComponent}
                                                    src="https://picsum.photos/80/80?random=2"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        width: "80px",
                                                        height: "80px",
                                                        margin: "0 auto 1rem auto",
                                                        borderRadiusAll: "50%",
                                                    }}
                                                />
                                                <Element
                                                    is={Heading}
                                                    heading="h3"
                                                    text="Beautiful Design"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        fontSize: "1.5rem",
                                                        fontWeight: "600",
                                                        marginBottom: "1rem",
                                                        color: "#1a202c",
                                                    }}
                                                />
                                                <Element
                                                    is={Text}
                                                    text="Stunning, modern designs that look great on any device. Customize every detail to match your brand."
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        color: "#4a5568",
                                                        lineHeight: "1.6",
                                                    }}
                                                />
                                            </Element>

                                            {/* Feature 3 */}
                                            <Element
                                                canvas
                                                is={Container}
                                                normal={{
                                                    ...generalPropsDefault,
                                                    backgroundColor: "#ffffff",
                                                    paddingAll: "2rem",
                                                    borderRadiusAll: "12px",
                                                    boxShadow:
                                                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                                    textAlign: "center",
                                                    flex: "1 1 300px",
                                                    minWidth: "300px",
                                                    maxWidth: "380px",
                                                }}
                                            >
                                                <Element
                                                    is={ImageComponent}
                                                    src="https://picsum.photos/80/80?random=3"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        width: "80px",
                                                        height: "80px",
                                                        margin: "0 auto 1rem auto",
                                                        borderRadiusAll: "50%",
                                                    }}
                                                />
                                                <Element
                                                    is={Heading}
                                                    heading="h3"
                                                    text="Easy to Use"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        fontSize: "1.5rem",
                                                        fontWeight: "600",
                                                        marginBottom: "1rem",
                                                        color: "#1a202c",
                                                    }}
                                                />
                                                <Element
                                                    is={Text}
                                                    text="No coding required! Drag and drop to create your perfect website in minutes, not hours."
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        color: "#4a5568",
                                                        lineHeight: "1.6",
                                                    }}
                                                />
                                            </Element>
                                        </Element>
                                    </Element>

                                    {/* About Section */}
                                    <Element
                                        canvas
                                        is={Container}
                                        normal={{
                                            ...generalPropsDefault,
                                            paddingAll: "80px 40px",
                                            backgroundColor: "#ffffff",
                                            width: "100%",
                                        }}
                                    >
                                        <Element
                                            canvas
                                            is={Container}
                                            normal={{
                                                ...generalPropsDefault,
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: "4rem",
                                                alignItems: "center",
                                                maxWidth: "1200px",
                                                margin: "0 auto",
                                            }}
                                        >
                                            <Element canvas is={Container}>
                                                <Element
                                                    is={Heading}
                                                    heading="h2"
                                                    text="About Our Company"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        fontSize: "2.5rem",
                                                        fontWeight: "bold",
                                                        marginBottom: "1.5rem",
                                                        color: "#1a202c",
                                                    }}
                                                />
                                                <Element
                                                    is={Text}
                                                    text="We're passionate about helping businesses succeed online. Our platform combines cutting-edge technology with intuitive design to deliver exceptional results."
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        fontSize: "1.1rem",
                                                        color: "#4a5568",
                                                        lineHeight: "1.7",
                                                        marginBottom: "2rem",
                                                    }}
                                                />
                                                <Element
                                                    is={LinkComponent}
                                                    text="Learn More About Us →"
                                                    href="/about"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        color: "#4f46e5",
                                                        fontWeight: "600",
                                                        textDecoration: "none",
                                                    }}
                                                />
                                            </Element>
                                            <Element
                                                is={ImageComponent}
                                                src="https://picsum.photos/600/400?random=4"
                                                normal={{
                                                    ...generalPropsDefault,
                                                    width: "100%",
                                                    height: "400px",
                                                    borderRadiusAll: "12px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Element>
                                    </Element>

                                    {/* CTA Section */}
                                    <Element
                                        canvas
                                        is={Container}
                                        normal={{
                                            ...generalPropsDefault,
                                            backgroundColor: "#1e293b",
                                            paddingAll: "80px 40px",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Element
                                            is={Heading}
                                            heading="h2"
                                            text="Ready to Get Started?"
                                            normal={{
                                                ...generalPropsDefault,
                                                fontSize: "2.5rem",
                                                fontWeight: "bold",
                                                color: "#ffffff",
                                                marginBottom: "1rem",
                                                textAlign: "center",
                                            }}
                                        />
                                        <Element
                                            is={Text}
                                            text="Join thousands of satisfied customers who have transformed their online presence with our platform."
                                            normal={{
                                                ...generalPropsDefault,
                                                fontSize: "1.2rem",
                                                color: "#cbd5e1",
                                                maxWidth: "600px",
                                                marginOption: "custom",
                                                marginTop: "2.5rem",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                marginBottom: "2.5rem",
                                                textAlign: "center",
                                            }}
                                        />
                                        <Element
                                            canvas
                                            is={Container}
                                            normal={{
                                                ...generalPropsDefault,
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Element
                                                is={ButtonComponent}
                                                text="Start Your Free Trial"
                                                variant="solid"
                                                color="primary"
                                                normal={{
                                                    ...generalPropsDefault,
                                                    paddingAll: "1rem",
                                                    fontSize: "1.2rem",
                                                    borderRadiusAll: "8px",
                                                    backgroundColor: "#4f46e5",
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                    marginOption: "custom",
                                                    overflowAll: "hidden",
                                                    width: "300px",
                                                    maxWidth: "100%",
                                                    fontColor: "#ffffff",
                                                    textAlign: "center",
                                                    boxShadow:
                                                        "0 4px 12px rgba(79, 70, 229, 0.3)",
                                                    transition: "all 0.3s ease",
                                                }}
                                                hover={{
                                                    ...generalPropsDefault,
                                                    backgroundColor: "#4338ca",
                                                    boxShadow:
                                                        "0 6px 16px rgba(79, 70, 229, 0.4)",
                                                }}
                                            />
                                        </Element>
                                    </Element>

                                    <Element
                                        canvas
                                        is={Container}
                                        normal={{
                                            ...generalPropsDefault,
                                            backgroundColor: "#0f172a",
                                            paddingAll: "40px",
                                            width: "100%",
                                        }}
                                    >
                                        <Element
                                            canvas
                                            is={Container}
                                            normal={{
                                                ...generalPropsDefault,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                maxWidth: "1200px",
                                                margin: "0 auto",
                                                flexWrap: "wrap",
                                                gap: "2rem",
                                            }}
                                        >
                                            <Element
                                                is={Text}
                                                text="© 2025 Your Company Name. All rights reserved."
                                                normal={{
                                                    ...generalPropsDefault,
                                                    color: "#94a3b8",
                                                }}
                                            />
                                            <Element
                                                canvas
                                                is={Container}
                                                normal={{
                                                    ...generalPropsDefault,
                                                    display: "flex",
                                                    gap: "2rem",
                                                }}
                                            >
                                                <Element
                                                    is={LinkComponent}
                                                    text="Privacy Policy"
                                                    href="/privacy"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        color: "#94a3b8",
                                                        textDecoration: "none",
                                                    }}
                                                />
                                                <Element
                                                    is={LinkComponent}
                                                    text="Terms of Service"
                                                    href="/terms"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        color: "#94a3b8",
                                                        textDecoration: "none",
                                                    }}
                                                />
                                                <Element
                                                    is={LinkComponent}
                                                    text="Contact"
                                                    href="/contact"
                                                    normal={{
                                                        ...generalPropsDefault,
                                                        color: "#94a3b8",
                                                        textDecoration: "none",
                                                    }}
                                                />
                                            </Element>
                                            <Element
                                                is={ThemeButtonComponent}
                                            />
                                        </Element>
                                    </Element>
                                </Element>
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
