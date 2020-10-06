import React from "react";
import moment from "moment";
import { Slack } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
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
};
