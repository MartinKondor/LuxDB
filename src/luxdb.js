const fs = require('fs');


const debug = (a='') => 
{
    console.log('LuxDB: ' + a);
}


/**
 * The main API class for users.
 */
class LuxDB 
{
    /**
     * 
     * @param {string} filename Database main file name,
     * can be non existent file
     */
    constructor(filename=false)
    {
        // If there is no filename, or
        // if it's undefined
        if (typeof filename !== 'string')
        {
            filename = 'luxdb.json';
        }

        // Pass filename to the engine
        if (!fs.existsSync(filename))
        {
            // Create file
            fs.appendFile(filename, '{}', (err) => {
                if (err) throw err;
                debug('Database created (' + filename + ') ...');
            }); 
        }
        
        // Load in database from file
        let db = {};

        fs.readFile(filename, (err, data) =>
        {
            if (err) throw err; 
            if (!data) data = '{}';

            db = JSON.parse(data);
        });

        this.dbFilename = filename;
        this.db = db;
        this.lastPointer = this.db;
        this.pointer = this.db;
    }

    /**
     * Sets the point value to the selected value
     * 
     * @param {string} where Of key or expresson from
     * the below list
     */
    point(where)
    {
        if (where == '.')  // Set back to base
        {
            this.pointer = this.db;
        }
        else if (where == '..')  // Go up with one key
        {
            this.pointer = this.lastPointer;
        }
        else
        {
            this.pointer = this.pointer[where];
        }
        return this;
    }

    /**
     * Function for quering from DB
     */
    get(key)
    {
        // Find object based on key
        if (typeof key === 'object')
        {
            return this.pointer.find((element) => 
            {
                let keys = Object.keys(key);
                for (let k in keys)
                {
                    if (element[k] !== key[k])
                    {
                        return false;
                    }
                }
                return true;
            });
        }

        return this.pointer[key];
    }

    /**
     * Function for setting and attribute in DB
     */
    set(key, value)
    {
        this.pointer[key] = value;
        return this;
    }

    /**
     * 
     * @param {object} obj Add the given obj to the current point array
     */
    push(obj)
    {
        this.pointer.push(obj);
    }

    /**
     * Function for saving DB to file
     */
    save()
    {
        fs.writeFileSync(this.dbFilename, JSON.stringify(this.db));
    }
}

/*
let start = new Date();

setTimeout(() => 
{
    // Add 100 test elements
    const luxdb = new LuxDB('cache/testdb.json');
    luxdb.set('n', []).point('n');

    for (let i = 0; i < 1000000; i++)
    {
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
