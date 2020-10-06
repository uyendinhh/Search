import React from "react";
import moment from "moment";
import { Slack } from "../search-tool/types";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";

interface CardProps {
    slack: Slack;
}

export const SlackCard = (props: CardProps) => {
    const { slack } = props;
    const { channel, author, message } = slack;
    const timestamp = moment(slack.timestamp).format("MMMM Do YYYY");
    return (
        <Card>
            <CardHeader
                avatar={<MessageIcon />}
                title={channel}
                subheader={timestamp}
            />
            <CardContent>
                <h4>Author: {timestamp}</h4>
                <h4>Message: {message}</h4>
            </CardContent>
        </Card>
    );
};
