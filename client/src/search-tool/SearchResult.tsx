import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { CalendarCard } from "../detail-cards/CalendarCard";
import { ContactCard } from "../detail-cards/ContactCard";
import { DropboxCard } from "../detail-cards/DropboxCard";
import { SlackCard } from "../detail-cards/SlackCard";
import { TweetCard } from "../detail-cards/TweetCard";
import { Calendar, Contact, Slack, Dropbox, Tweet } from "./types";

interface ResultsProps {
    results: Object[];
}

const renderCard = (result: Calendar | Contact | Slack | Dropbox | Tweet) => {
    switch (result.type) {
        case "calendar":
            return <CalendarCard calendar={result as Calendar} />;
        case "contact":
            return <ContactCard contact={result as Contact} />;
        case "dropbox":
            return <DropboxCard dropbox={result as Dropbox} />;
        case "slack":
            return <SlackCard slack={result as Slack} />;
        case "tweet":
            return <TweetCard tweet={result as Tweet} />;
    }
};

export const SearchResult = (props: ResultsProps) => {
    const { results } = props;

    if (Object.keys(results).length) {
        return (
            <div className="results-container">
                <List component="nav" aria-label="main mailbox folders">
                    {results.map((result: any, idx: number) => {
                        return (
                            <ListItem button key={idx}>
                                {renderCard(result)}
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
    return null;
};
