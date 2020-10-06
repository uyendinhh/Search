import React from "react";
import moment from "moment";
import { Tweet } from "../search-tool/types";
import { Card, CardHeader, CardContent } from "@material-ui/core";
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
            <CardHeader
                avatar={<MessageIcon />}
                title={user}
                subheader={timestamp}
            />
            <CardContent>
                <h4>Message: {message}</h4>
            </CardContent>
        </Card>
    );
};
