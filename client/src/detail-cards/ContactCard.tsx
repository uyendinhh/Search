import React from "react";
import moment from "moment";
import { Contact } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { PinIcon } from "../common/PinIcon";

interface CardProps {
    contact: Contact;
    pinItem: (contact: Contact) => void;
    unpinItem: (contact: Contact) => void;
}

interface CardStates {
    isToggled: boolean;
}

export class ContactCard extends React.Component<CardProps, CardStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            isToggled: false,
        };
    }

    togglePinIcon = () => {
        const { contact, pinItem, unpinItem } = this.props;
        if (!this.state.isToggled) {
            pinItem(contact);
        } else {
            unpinItem(contact);
        }
        this.setState({ isToggled: !this.state.isToggled });
    };

    render() {
        const { contact } = this.props;
        const { name, company, emails, phones } = contact;
        const lastContact = moment(contact.last_contact).format("MMMM Do YYYY");

        return (
            <Card raised>
                <PinIcon
                    isToggled={this.state.isToggled}
                    togglePinIcon={() => this.togglePinIcon()}
                />
                <CardHeader
                    avatar={<PersonIcon />}
                    title={name}
                    subheader={`Company: ${company}`}
                />
                <CardContent>
                    <Divider light />
                    <h4>Emails:</h4>
                    {emails.map((email, idx) => (
                        <p key={idx} style={{ paddingLeft: "30px" }}>
                            {email}
                        </p>
                    ))}
                    <Divider light />

                    <h4>Phones:</h4>
                    {phones.map((phone, idx) => (
                        <p key={idx} style={{ paddingLeft: "30px" }}>
                            {phone}
                        </p>
                    ))}
                    <Divider light />

                    <h4>
                        {`Last contact: `}
                        <span style={{ fontWeight: "normal" }}>{lastContact}</span>
                    </h4>
                </CardContent>
            </Card>
        );
    }
}
