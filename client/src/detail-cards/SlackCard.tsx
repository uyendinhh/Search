import React from "react";
import moment from "moment";
import { Slack } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import { PinIcon } from "../common/PinIcon";

interface CardProps {
    slack: Slack;
    pinItem: (slack: Slack) => void;
    unpinItem: (slack: Slack) => void;
}

interface CardStates {
    isToggled: boolean;
}
export class SlackCard extends React.Component<CardProps, CardStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            isToggled: false,
        };
    }

    togglePinIcon = () => {
        const { slack, pinItem, unpinItem } = this.props;
        if (!this.state.isToggled) {
            pinItem(slack);
        } else {
            unpinItem(slack);
        }
        this.setState({ isToggled: !this.state.isToggled });
    };

    render() {
        const { slack } = this.props;
        const { channel, author, message } = slack;
        const timestamp = moment(slack.timestamp).format("MMMM Do YYYY");
        return (
            <Card raised>
                <PinIcon
                    isToggled={this.state.isToggled}
                    togglePinIcon={() => this.togglePinIcon()}
                />
                <CardHeader
                    avatar={<MessageIcon />}
                    title={author}
                    subheader={`Slack channel: ${channel}`}
                />
                <CardContent>
                    <Divider />
                    <h4>
                        {`Message: `}
                        <span style={{ fontWeight: "normal" }}>{message}</span>
                    </h4>
                    <h4>
                        {`Timestamp: `}
                        <span style={{ fontWeight: "normal" }}>{timestamp}</span>
                    </h4>
                </CardContent>
            </Card>
        );
    }
}
