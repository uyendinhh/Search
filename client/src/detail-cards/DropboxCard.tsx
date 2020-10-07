import React from "react";
import moment from "moment";
import { Dropbox } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import { PinIcon } from "../common/PinIcon";

interface CardProps {
    dropbox: Dropbox;
    pinItem: (dropbox: Dropbox) => void;
    unpinItem: (dropbox: Dropbox) => void;
}

interface CardStates {
    isToggled: boolean;
}

export class DropboxCard extends React.Component<CardProps, CardStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            isToggled: false,
        };
    }

    togglePinIcon = () => {
        const { dropbox, pinItem, unpinItem } = this.props;
        if (!this.state.isToggled) {
            pinItem(dropbox);
        } else {
            unpinItem(dropbox);
        }
        this.setState({ isToggled: !this.state.isToggled });
    };

    render() {
        const { dropbox } = this.props;
        const { path, title, shared_with: sharedWith } = dropbox;
        const created = moment(dropbox.created).format("MMMM Do YYYY");
        return (
            <Card raised>
                <PinIcon
                    isToggled={this.state.isToggled}
                    togglePinIcon={() => this.togglePinIcon()}
                />
                <CardHeader
                    avatar={<DescriptionIcon />}
                    title={`Dropbox: ${title}`}
                    subheader={`Created: ${created}`}
                />
                <CardContent>
                    <Divider light />
                    <h4>Shared with:</h4>
                    {sharedWith.map((share, idx) => (
                        <p key={idx} style={{ paddingLeft: "30px" }}>
                            {share}
                        </p>
                    ))}
                    <Divider light />
                    <h4>
                        {`Path: `}
                        <span style={{ fontWeight: "normal" }}>{path}</span>
                    </h4>
                </CardContent>
            </Card>
        );
    }
}
