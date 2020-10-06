import { promisify } from 'util';
import fs, { readFileSync } from 'fs';
const readFile = promisify(fs.readFile)

export async function search(queries) {
    var results = [];
    const fileNames = fs.readdirSync('data');

    const data = await Promise.all(fileNames.map(name => {
        const file = readFileSync('data/' + name);
        if (!file) {
            return {}
        }
        return JSON.parse(file);
    })).then(files => {
        queries.forEach(query => {
            files.forEach(file => {
                Object.keys(file).forEach(key => {
                    const matches = file[key].filter(cal => cal['matching_terms'].includes(query));
                    if (!!matches.length) {
                        results = [...results, matches];
                    }
                });
            })
        })
    });

    console.log('res', results)
    return results;
}
const results = search(['dave', 'lunch']);