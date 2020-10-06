import React from "react";
import moment from "moment";
import { Contact } from "../search-tool/types";
import { Card, CardHeader, CardContent } from "@material-ui/core";
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
                title={company}
                subheader={lastContact}
            />
            <CardContent>
                <h4>Name: {name}</h4>
                <h4>Emails:</h4>
                {emails.map((email, idx) => (
                    <li key={idx}>
                        <ul>{email}</ul>
                    </li>
                ))}
                <h4>Phones:</h4>
                {phones.map((phone, idx) => (
                    <li key={idx}>
                        <ul>{phone}</ul>
                    </li>
                ))}
            </CardContent>
        </Card>
    );
};
