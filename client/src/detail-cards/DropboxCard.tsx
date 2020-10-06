import React from "react";
import moment from "moment";
import { Dropbox } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import EmailIcon from "@material-ui/icons/Email";

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
                avatar={<DescriptionIcon />}
                title={`Dropbox: ${title}`}
                subheader={`Created: ${created}`}
            />
            <CardContent>
                <Divider light />
                <h4>Shared with:</h4>
                {sharedWith.map((share) => (
                    <p style={{ paddingLeft: "30px" }}>{share}</p>
                ))}
                <Divider light />
                <h4>
                    {`Path: `}
                    <span style={{ fontWeight: "normal" }}>{path}</span>
                </h4>
            </CardContent>
        </Card>
    );
};
