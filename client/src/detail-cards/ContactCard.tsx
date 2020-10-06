import React from "react";
import moment from "moment";
import { Contact } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

interface CardProps {
    contact: Contact;
}

export const ContactCard = (props: CardProps) => {
    const { contact } = props;
    const { name, company, emails, phones } = contact;
    const lastContact = moment(contact.last_contact).format("MMMM Do YYYY");

    return (
        <Card>
            <CardHeader
                avatar={<PersonIcon />}
                title={name}
                subheader={`Company: ${company}`}
            />
            <CardContent>
                <Divider light />
                <h4>Emails:</h4>
                {emails.map((email) => (
                    <p style={{ paddingLeft: "30px" }}>{email}</p>
                ))}
                <Divider light />

                <h4>Phones:</h4>
                {phones.map((phone) => (
                    <p style={{ paddingLeft: "30px" }}>{phone}</p>
                ))}
                <Divider light />

                <h4>
                    {`Last contact: `}
                    <span style={{ fontWeight: "normal" }}>{lastContact}</span>
                </h4>
            </CardContent>
        </Card>
    );
};
