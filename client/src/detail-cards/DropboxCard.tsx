import React from "react";
import moment from "moment";
import { Dropbox } from "../search-tool/types";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

interface CardProps {
    dropbox: Dropbox;
}

export const DropboxCard = (props: CardProps) => {
    const { dropbox } = props;
    const { path, title, shared_with: sharedWith } = dropbox;
    const created = moment(dropbox.created).format("MMMM Do YYYY");
    return (
        <Card>
            <CardHeader
                avatar={<PersonIcon />}
                title={title}
                subheader={created}
            />
            <CardContent>
                <h4>Shared with:</h4>
                {sharedWith.map((share, idx) => (
                    <li key={idx}>
                        <ul>{share}</ul>
                    </li>
                ))}
                <h4>Path: {path}</h4>
            </CardContent>
        </Card>
    );
};
