import React from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import { Calendar, Contact, Dropbox, Slack, Tweet } from "./types";
import { CalendarCard } from "../detail-cards/CalendarCard";
import { ContactCard } from "../detail-cards/ContactCard";
import { DropboxCard } from "../detail-cards/DropboxCard";
import { SlackCard } from "../detail-cards/SlackCard";
import { TweetCard } from "../detail-cards/TweetCard";
import { SearchResult } from "./SearchResult";

interface SearchProperty {
    query: string;
    results: any[];
    loading: boolean;
    message: string;
}

export class SearchTool extends React.Component<{}, SearchProperty> {
    private readonly baseUrl: string = "http://localhost:3001";

    constructor(props: any) {
        super(props);
        this.state = {
            query: "",
            results: [],
            loading: false,
            message: "",
        };
    }

    fetchSearchResults = (query: string) => {
        // Search for result with the given input
        axios
            .get(`${this.baseUrl}/search`, {
                params: { query },
            })
            .then((res) => {
                this.setState({ results: res.data });
                console.log("response", res);
            })
            .catch(function (error) {
                console.log("Error while searching for events", error);
            });
    };

    handleOnInputChange = (query: string) => {
        if (!query) {
            this.setState({ query, results: [], message: "" });
        } else {
            this.fetchSearchResults(query);
        }
    };

    render() {
        return (
            <div>
                <label className="search-label">
                    <TextField
                        fullWidth
                        placeholder="Type to search ..."
                        id="search-bar"
                        label="Search"
                        variant="outlined"
                        onChange={(event) =>
                            this.handleOnInputChange(event.target.value)
                        }
                    />
                </label>
                <SearchResult results={this.state.results}></SearchResult>
            </div>
        );
    }
}
