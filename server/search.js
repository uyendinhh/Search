import fs, { readFileSync } from 'fs';

const filterDataByMatchingTerm = (data, key, term) => {
    return data[key].filter(
        res => res['matching_terms'].includes(term)
    ).map(res => ({...res, 'type': key }));
}

export async function search(searchTerms) {
    var results = [];
    const fileNames = fs.readdirSync('data');

    await Promise.all(fileNames.map(name => {
        const file = readFileSync('data/' + name);
        if (!file) {
            return {}
        }
        return JSON.parse(file);
    })).then(files => {
        searchTerms.forEach(term => {
            files.forEach(file => {
                Object.keys(file).forEach(key => {
                    const matches = filterDataByMatchingTerm(file, key, term);
                    if (!!matches && matches.length) {
                        results = [...results, ...matches];
                    }
                })
            })
        })
    });

    return results;
}