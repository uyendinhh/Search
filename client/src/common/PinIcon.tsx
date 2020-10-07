import React from "react";
import Icon from "@mdi/react";
import { mdiPinOutline } from "@mdi/js";
import IconButton from "@material-ui/core/IconButton";

interface ToggleProps {
    togglePinIcon: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isToggled: boolean;
}

export const PinIcon = (props: ToggleProps) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px 10px 0 0",
                cursor: "pointer",
            }}
        >
            <IconButton size="small" onClick={props.togglePinIcon}>
                <Icon
                    path={mdiPinOutline}
                    size={1}
                    horizontal
                    vertical
                    rotate={195}
                    style={!props.isToggled ? { color: "black" } : { color: "red" }}
                />
            </IconButton>
        </div>
    );
};
