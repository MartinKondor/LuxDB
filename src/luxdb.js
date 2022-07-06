'use strict';
const fs = require('fs');


const debug = (a='') => {
    console.log('LuxDB: ' + a);
}

/**
 * The main API class for users.
 */
class LuxDB {
    /**
     * 
     * @param {string} filename Database main file name,
     * can be non existent file
     */
    constructor(filename=false) {

        // If there is no filename, or
        // if it's undefined
        if (typeof filename !== 'string') {
            filename = 'luxdb.json';
        }

        // Pass filename to the engine
        if (!fs.existsSync(filename)) {
            // Create file
            fs.appendFile(filename, '{}', (err) => {
                if (err) throw err;
                debug('Database created (' + filename + ') ...');
            }); 
        }
        
        // Load in database from file
        let db = {};
        const data = fs.readFileSync(filename, 'utf8');
        if (!data) {
            data = '{}';
        }
        db = JSON.parse(data);

        this.dbFilename = filename;
        this.db = db;
        this.lastPointer = this.db;
        this.lastPointerName = '.';
        this.pointer = this.db;
    }

    /**
     * Sets the point value to the selected value
     * 
     * @param {string} where Of key or expresson from
     * the below list
     */
    point(where) {

        // Do not move the pointer
        if (this.lastPointerName === where) {
            return this;
        }

        // The pointer cannot be null or undefined
        if (this.pointer === null || this.pointer === undefined) {
            this.pointer = this.db;
        }

        // Set back to base 
        if (where === '.') {
            this.pointer = this.db;
        }
        // Go up with one key
        else if (where === '..') {
            this.pointer = this.lastPointer;
        }
        else {
            this.pointer = this.pointer[where];
        }

        this.lastPointerName = where;
        return this;
    }

    /**
     * Function for quering from DB
     * @param {object} key Search by attribute
     * @param {function} key Search with function (must return bool)
     */
    get(key) {

        // Find object based on key
        if (typeof key === 'object') {
            const founds = [];

            // For each element in the pointer
            for (const element of this.pointer) {

                // For each search key
                for (const k of Object.keys(key)) {
                    if (element[k] === key[k]) {
                        founds.push(element);
                    }
                }
            }
            
            return founds;
        }
        else if (typeof key === 'function') {
            const founds = [];
            for (const element of this.pointer) {

                if (key(element) === true) {
                    founds.push(element);
                }
            }
            return founds;
        }

        return this.pointer[key];
    }

    /**
     * Function for setting an attribute in DB
     * @param {string} key The name of the table
     * @param {any} value The value of the table ({}, [] etc.)
     */
    set(key, value) {
        this.pointer[key] = value;
        return this;
    }
    
    /**
     * Function for updating an attribute in DB
     * @param {string} key The identificator of the row
     * @param {any} value The attribute and the value to change
     */
    update(key, value) {
        if (typeof key === 'object') {
            let rows = this.get(key);
            for (let row of rows) {
                for (const change_key of Object.keys(value)) {
                    row[change_key] = value[change_key]
                }
            }
        }
        else if (typeof key === 'function') {
            let rows = this.get(key);
            for (let row of rows) {
                row = value(row);
            }
        }
        return this;
    }

    /**
     * 
     * @param {object} obj Add the given obj to the current point array
     */
    push(obj) {
        this.pointer.push(obj);
        return this;
    }

    /**
     * Function for saving DB to file
     */
    save() {
        fs.writeFileSync(this.dbFilename, JSON.stringify(this.db));
        this.pointer = this.db;  // Set back pointer to the database
        return this;
    }

    /**
     * Remove everything from the database file
     */
    clear() {
        this.db = {};
        fs.writeFileSync(this.dbFilename, "{}");
        return this;
    }
}

/*
let start = new Date();

setTimeout(() => {
    // Add 100 test elements
    const luxdb = new LuxDB('cache/testdb.json');
    luxdb.set('n', []).point('n');

    for (let i = 0; i < 1000000; i++) {
        luxdb.push(i);
    }

    console.log('Execution time: %dms', new Date() - start);
    luxdb.save();
}, 10);
*/

/*
Test data structure

{'n': [Attributes]}

----------------------------------------------------------------------------------------------------
No. of Attributes Written |   Time Elapsed  |   Data Size Wrote
----------------------------------------------------------------------------------------------------
100,000                   |   30ms          |   575 KB
----------------------------------------------------------------------------------------------------
1,000,000                 |   40ms          |   6,56 MB

*/
module.exports = LuxDB;
