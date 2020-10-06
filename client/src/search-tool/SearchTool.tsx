import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { SearchResult } from "./SearchResult";

interface SearchProperty {
    query: string;
    results: any[];
}

export class SearchTool extends React.Component<{}, SearchProperty> {
    private readonly baseUrl: string = "http://localhost:3001";

    constructor(props: any) {
        super(props);
        this.state = {
            query: "",
            results: [],
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
            })
            .catch(function (error) {
                console.error("Error while searching for events", error);
            });
    };

    handleOnInputChange = (query: string) => {
        if (!!query) {
            this.fetchSearchResults(query);
        }
    };

    render() {
        return (
            <div style={{ marginBottom: "30px" }}>
                <TextField
                    fullWidth
                    placeholder="Type to search ..."
                    style={{ marginBottom: "30px", backgroundColor: "white" }}
                    label="Search"
                    variant="outlined"
                    autoFocus
                    onChange={(event) =>
                        this.handleOnInputChange(event.target.value)
                    }
                />

                <SearchResult results={this.state.results}></SearchResult>
            </div>
        );
    }
}
