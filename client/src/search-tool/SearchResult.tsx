import React from "react";
import Grid from "@material-ui/core/Grid";
import { CalendarCard } from "../detail-cards/CalendarCard";
import { ContactCard } from "../detail-cards/ContactCard";
import { DropboxCard } from "../detail-cards/DropboxCard";
import { SlackCard } from "../detail-cards/SlackCard";
import { TweetCard } from "../detail-cards/TweetCard";
import { Calendar, Contact, Slack, Dropbox, Tweet } from "./types";
import _ from "lodash";

interface ResultsProps {
    results: Array<Calendar | Contact | Slack | Dropbox | Tweet>;
}

interface ResultsStates {
    pinnedItems: any[];
}

export class SearchResult extends React.Component<ResultsProps, ResultsStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            pinnedItems: [],
        };
    }

    pinItem = (item: Calendar | Contact | Slack | Dropbox | Tweet) => {
        const { pinnedItems } = this.state;
        this.setState({ pinnedItems: [...pinnedItems, item] });
    };

    unpinItem = (item: Calendar | Contact | Slack | Dropbox | Tweet) => {
        const { pinnedItems } = this.state;
        this.setState({
            pinnedItems: [pinnedItems.filter((i) => i.id !== item.id)],
        });
    };

    renderCard = (result: Calendar | Contact | Slack | Dropbox | Tweet) => {
        switch (result.type) {
            case "calendar":
                return (
                    <CalendarCard
                        pinItem={this.pinItem}
                        unpinItem={this.unpinItem}
                        calendar={result as Calendar}
                    />
                );
            case "contacts":
                return (
                    <ContactCard
                        pinItem={this.pinItem}
                        unpinItem={this.unpinItem}
                        contact={result as Contact}
                    />
                );
            case "dropbox":
                return (
                    <DropboxCard
                        pinItem={this.pinItem}
                        unpinItem={this.unpinItem}
                        dropbox={result as Dropbox}
                    />
                );
            case "slack":
                return (
                    <SlackCard
                        pinItem={this.pinItem}
                        unpinItem={this.unpinItem}
                        slack={result as Slack}
                    />
                );
            case "tweet":
                return (
                    <TweetCard
                        pinItem={this.pinItem}
                        unpinItem={this.unpinItem}
                        tweet={result as Tweet}
                    />
                );
        }
    };

    render() {
        const { results } = this.props;
        const { pinnedItems } = this.state;
        const allItems = [...results, ...pinnedItems];
        const uniqueItems = _.uniqBy(allItems, (x) => x.id);
        return (
            <div>
                <div>
                    {uniqueItems.length ? (
                        <Grid container spacing={3}>
                            {uniqueItems.map((result: any, idx: number) => {
                                return (
                                    <Grid
                                        item
                                        key={idx}
                                        xs={4}
                                        style={{ textAlign: "left" }}
                                    >
                                        {this.renderCard(result)}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : null}
                </div>
            </div>
        );
    }
}
