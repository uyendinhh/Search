import React from 'react';
import TextField from '@material-ui/core/TextField';

interface SearchProperty {
    query: string,
    results: any[],
    loading: boolean,
    message: string,
}

export class SearchTool extends React.Component<{}, SearchProperty> {
    constructor(props: any) {
        super(props);
        this.state = {
            query: '',
            results: [
                {
                    "id": "12345",
                    "title": "Acme Proposal Meeting",
                    "invitees": "dave, john, bob, carol",
                    "matching_terms": [
                      "dave",
                      "john",
                      "bob",
                      "carol",
                      "acme"
                    ],
                    "date": "2019-01-10 10:00:00"
                },
                {
                    "id": "12346",
                    "title": "Acme Final Delivery Meeting",
                    "invitees": "dave, john, bob, alice",
                    "matching_terms": [
                        "dave",
                        "john",
                        "bob",
                        "alice",
                        "acme"
                    ],
                    "date": "2019-03-01 11:00:00"
                }
            ],
            loading: false,
            message: ''
        }
    }

    handleOnInputChange = (event: any) => {
        const query = event.target.value;
        if (!query ) {
            // this.setState({ query, results: [], message: '' } );
        } else {
            this.setState({ query, loading: true, message: '' }, () => {
                // this.fetchSearchResults(1, query);
            });
        }
    };

    renderSearchResults = () => {
        const { results } = this.state;
        if (Object.keys(results).length) {
            return (
                <div className="results-container">
                    {
                        results.map((result: any) => {
                            return (
                                <div key={result.id}>{result.title || ''}</div>
                            );
                        })
                    }
                </div>
            );
        }
    };

    render() {
      return <div>
        <label className="search-label">
        <TextField 
            fullWidth 
            placeholder="Type to search ..." 
            id="search-bar" 
            label="Search" 
            variant="outlined"
            onChange={this.handleOnInputChange}
        />
            {/* <i className="fa fa-search search-icon"/> */}
        </label>
        { this.renderSearchResults() }
      </div>;
    }
  }