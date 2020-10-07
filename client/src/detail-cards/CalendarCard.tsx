import React from "react";
import moment from "moment";
import { Calendar } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { PinIcon } from "../common/PinIcon";

interface CardProps {
    calendar: Calendar;
    pinItem: (calendar: Calendar) => void;
    unpinItem: (calendar: Calendar) => void;
}

interface CardStates {
    isToggled: boolean;
}

export class CalendarCard extends React.Component<CardProps, CardStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            isToggled: false,
        };
    }

    togglePinIcon = () => {
        const { calendar, pinItem, unpinItem } = this.props;

        if (!this.state.isToggled) {
            pinItem(calendar);
        } else {
            unpinItem(calendar);
        }
        this.setState({ isToggled: !this.state.isToggled });
    };

    render() {
        const { calendar } = this.props;
        const { title, invitees } = calendar;
        const date = moment(calendar.date).format("MMMM Do YYYY");
        return (
            <Card raised>
                <PinIcon
                    togglePinIcon={() => this.togglePinIcon()}
                    isToggled={this.state.isToggled}
                />
                <CardHeader
                    avatar={<CalendarTodayIcon />}
                    title={title}
                    subheader={`Date: ${date}`}
                />
                <CardContent>
                    <Divider />
                    <h4>
                        {`Invitees: `}
                        <span style={{ fontWeight: "normal" }}>{invitees}</span>
                    </h4>
                </CardContent>
            </Card>
        );
    }
}
