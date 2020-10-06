export interface Calendar {
    "id": string,
    "title": string,
    "invitees": string,
    "matching_terms": string[],
    "date": "string",
}

export interface Contact {
    "id": string,
    "name": string,
    "company": string,
    "emails": string[],
    "phones": string[],
    "matching_terms": string[],
    "last_contact": string,
} 

export interface Dropbox {
    "id": string,
    "path": string,
    "title": string,
    "shared_with": string[],
    "matching_terms": string[],
    "created": string,
}

export interface Slack {
    "id": string,
    "channel": string,
    "author": string,
    "message": string,
    "timestamp": string,
    "matching_terms": string[],
}

export interface Tweet {
    "user": string,
    "message": string,
    "timestamp": string,
    "matching_terms": string[],
}