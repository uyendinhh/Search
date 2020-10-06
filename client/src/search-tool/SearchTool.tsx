import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Calendar, Contact, Dropbox, Slack, Tweet } from './types';

interface SearchProperty {
    query: string,
    results: any[],
    loading: boolean,
    message: string,
}

export class SearchTool extends React.Component<{}, SearchProperty> {
    private readonly baseUrl: string = 'http://localhost:3001';

    constructor(props: any) {
        super(props);
        this.state = {
            query: '',
            results: [],
            loading: false,
            message: ''
        }
    }

    fetchSearchResults = (query: string) => {
        // Search for result with the given input
        axios.get(`${this.baseUrl}/search`, {
            params: { query }
        }).then( (res) => {
            this.setState({results: res.data});
            console.log('response', res);
        })
        .catch(function (error) {
            console.log('Error while searching for events', error);
        });
    }

    handleOnInputChange = (query: string) => {
        if (!query ) {
            this.setState({ query, results: [], message: '' } );
        } else {
            this.fetchSearchResults(query);
        }
    };

    renderSearchResults = () => {
        const { results } = this.state;
        console.log('results', results);
        
        if (Object.keys(results).length) {
            return (
                <div className="results-container">
                    <List component="nav" aria-label="main mailbox folders">
                        {
                            results.map((result: any, idx: number) => {
                                return (
                                    <ListItem button key={idx}>
                                        <ListItemText primary={result.title} />
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </div>
            );
        }
    };

    selectTitle = (result: Calendar | Contact | Slack | Dropbox | Tweet) => {
        console.log(typeof(result));
    }

    render() {
      return <div>
        <label className="search-label">
            <TextField 
                fullWidth 
                placeholder="Type to search ..." 
                id="search-bar" 
                label="Search" 
                variant="outlined"
                onChange={event => this.handleOnInputChange(event.target.value)}
            />
        </label>
        { this.renderSearchResults() || <div>No matched results found!</div> }
      </div>;
    }
  }