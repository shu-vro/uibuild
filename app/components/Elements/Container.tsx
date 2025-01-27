import React from "react";
import { Resizer } from "../Resizer";
import {
    generalPropsDefault,
    GeneralSettings,
    GeneralSettingsProps,
    generalStyles,
} from "./GeneralSettings";

type ContainerProps = {
    children?: React.ReactNode;
};

export function Container({
    children,
    // width = "100px",
    // height = "100px",
    ...props
}: GeneralSettingsProps & ContainerProps) {
    return (
        <>
            <Resizer
                propKey={{ width: "width", height: "height" }}
                style={{
                    ...generalStyles(props),
                    // justifyContent: "flex-start",
                    // flexDirection: "column",
                    // alignItems: "flex-start",
                    // background,
                    // // color: `rgba(${Object.values(color)})`,
                    // margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
                    // boxShadow:
                    //     shadow === 0
                    //         ? "none"
                    //         : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
                    // borderRadius: `${radius}px`,
                    // flex: fillSpace === "yes" ? 1 : "unset",
                }}
            >
                {children}
            </Resizer>
        </>
    );
}

// export const ContainerSettings = () => {
//     const {
//         background,
//         padding,
//         width,
//         height,
//         actions: { setProp },
//     } = useNode((node) => ({
//         background: node.data.props.background,
//         padding: node.data.props.padding,
//         width: node.data.props.width,
//         height: node.data.props.height,
//     }));

//     return (
//         <div>
//             <div>
//                 <Input
//                     label="Width"
//                     value={width}
//                     onValueChange={(e) => {
//                         setProp((props) => (props.width = e), 500);
//                     }}
//                 />
//                 <Input
//                     label="Height"
//                     value={height}
//                     onValueChange={(e) => {
//                         setProp((props) => (props.height = e), 500);
//                     }}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="choose-color">Background</label>
//                 <input
//                     id="choose-color"
//                     type="color"
//                     value={background}
//                     onChange={(e) => {
//                         setProp(
//                             (props) => (props.background = e.target.value),
//                             500,
//                         );
//                     }}
//                 />
//             </div>
//             <Slider
//                 defaultValue={padding}
//                 label="Padding"
//                 onChange={(value) =>
//                     setProp((props) => (props.padding = value), 500)
//                 }
//             />
//         </div>
//     );
// };

export const ContainerDefaultProps = {};

Container.craft = {
    displayName: "Container",
    props: generalPropsDefault,
    related: {
        settings: GeneralSettings,
    },
    rules: {
        canDrag: () => true,
    },
};
