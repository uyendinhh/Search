import React from "react";
import moment from "moment";
import { Tweet } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import { PinIcon } from "../common/PinIcon";

interface CardProps {
    tweet: Tweet;
    pinItem: (tweet: Tweet) => void;
    unpinItem: (tweet: Tweet) => void;
}

interface CardStates {
    isToggled: boolean;
}

export class TweetCard extends React.Component<CardProps, CardStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            isToggled: false,
        };
    }

    togglePinIcon = () => {
        const { tweet, pinItem, unpinItem } = this.props;
        if (!this.state.isToggled) {
            pinItem(tweet);
        } else {
            unpinItem(tweet);
        }
        this.setState({ isToggled: !this.state.isToggled });
    };

    render() {
        const { tweet } = this.props;
        const { user, message } = tweet;
        const timestamp = moment(tweet.timestamp).format("MMMM Do YYYY");

        return (
            <Card raised>
                <PinIcon
                    isToggled={this.state.isToggled}
                    togglePinIcon={() => this.togglePinIcon()}
                />
                <CardHeader avatar={<MessageIcon />} title={user} />
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
