import React from 'react';
import axios from 'axios';
import moment from 'moment'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import { Calendar, Contact, Dropbox, Slack, Tweet } from './types';
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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
                                        {/* <ListItemText primary={result.title} /> */}
                                        {this.renderCardResult(result)}
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </div>
            );
        }
    };

    renderCardResult = (result: Calendar | Contact | Slack | Dropbox | Tweet) => {
        if (result.type === 'calendar') {
            const calendar = result as Calendar;
            const title = calendar.title;
            const date = moment(calendar.date).format("MMMM Do YYYY"); 
            const invitees = calendar.invitees;
            
            return (
                <Card>
                    <CardHeader
                        avatar={<CalendarTodayIcon/>}
                        title={title}
                        subheader={date}
                    />
                    <CardContent>
                        <h4>Invitees: {invitees}</h4>
                    </CardContent>
                </Card>
            )
        } else if (result.type === 'contact') {
            
        }
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
        { this.renderSearchResults() || <div>No matching results found!</div> }
      </div>;
    }
  }