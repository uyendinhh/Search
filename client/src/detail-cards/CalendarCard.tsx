import React from "react";
import moment from "moment";
import { Calendar } from "../search-tool/types";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

interface CardProps {
    calendar: Calendar;
}

export const CalendarCard = (props: CardProps) => {
    const { calendar } = props;
    const { title, invitees } = calendar;
    const date = moment(calendar.date).format("MMMM Do YYYY");
    return (
        <Card>
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
};
