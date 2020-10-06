import React from "react";
import moment from "moment";
import { Tweet } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";

interface CardProps {
    tweet: Tweet;
}

export const TweetCard = (props: CardProps) => {
    const { tweet } = props;
    const { user, message } = tweet;
    const timestamp = moment(tweet.timestamp).format("MMMM Do YYYY");
    return (
        <Card>
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
};
