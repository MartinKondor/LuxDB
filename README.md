# ☀ LuxDB

[![version](https://img.shields.io/badge/version-v0.2.1-yellow.svg)](https://github.com/MartinKondor/LuxDB) [![Project Status](https://img.shields.io/badge/status-active-brightgreen.svg)](https://github.com/MartinKondor/SimpleComposer) ![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg) [![GitHub Issues](https://img.shields.io/github/issues/MartinKondor/LuxDB.svg)](https://github.com/MartinKondor/LuxDB/issues) ![Size](https://img.shields.io/bundlephobia/minzip/stormdb?color=brightgreen) [![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

LuxDB is a tiny, lightweight, 0 dependency, easy-to-use JSON-based database

```js
const luxdb = new LuxDB('cache/testdb.json');
luxdb.set('users', []);
luxdb.point('users');
luxdb.push({'id': 0, 'name': 'Joe Doe'})
console.log(luxdb.get({'id': 0}));
// Prints { id: 0, name: 'Joe Doe' }
```

## Usage

### Pointer use
```js
luxdb.point('users');
luxdb.point('..');  // Sets the pointer to the last pointer
luxdb.point('.');  // Sets the pointer to the database (starting point)
```

### Creating a 'table' called _'users'_
```js
luxdb.set('users', []);
```

### Inserting a 'row' to the _'users'_ table
```js
luxdb.point('users');  // Always need to point to something first
luxdb.push({id: 0, name: 'Joe Doe'});
```

### Inserting multiple rows to the _'users'_ table
```js
luxdb.point('users')
    .push({id: 0, name: 'Joe Doe', gender: 'male'})
    .push({id: 1, name: 'Jane Doe', gender: 'female'})
    .push({id: 2, name: 'Aadam Doe', gender: 'male'})
    .push({id: 3, name: 'Eve Doe', gender: 'female'})
```

### Select a specific row by column value
```js
let query = luxdb.point('users').get({id: 2})
console.log(query);
>> [ {id: 2, name: 'Aadam Doe', gender: 'male'} ]
```

### Select row by column value
```js
let query = luxdb.point('users').get({gender: 'female'})
console.log(query);
>> [ {id: 0, name: 'Joe Doe', gender: 'male'}, {id: 2, name: 'Aadam Doe', gender: 'male'} ]
```

### Update a specific row by column value
```js
luxdb.update({name: 'Jane Doe'}, {name: 'Jane Janett Doe'})
```

### Set an attribute to be auto added and incremented (TODO)
```js
luxdb.point('users')
    .push({id: 0, name: 'Joe Doe', gender: 'male'})
    .push({id: 1, name: 'Jane Doe', gender: 'female'})
    .conf({id: luxdb.configs.AUTO_INCREMENT})
    .push({name: 'Aadam Doe', gender: 'male'})  // Will have id: 2
    .push({name: 'Eve Doe', gender: 'female'})  // Will have id: 3 
```

_For a full example implementation, see the file [tests/example.js](./tests/example.js)._

## Speed

Test data structure: `{'n': [Attributes]}`

| No. of Attributes Written | Time Elapsed | Attributes Wrote/sec | Data Size Wrote |
| ------------------------: | -----------: | -------------------: | --------------: |
|                   100,000 |         30ms |      3,333,333,333/sec |         575 KB |
|                 1,000,000 |         40ms |     25,000,000,000/sec |         6,56 MB |

## Contributing

Ways to contribute:

* Check for open issues
* Read the ```TODO``` file
* Make an improvement

### Steps

1. Fork this repository
2. Create a new branch (optional)
3. Clone it
4. Make your changes
5. Upload them
6. Make a pull request here

## Authors

* **[Martin Kondor](https://github.com/MartinKondor)**

## License

Copyright &copy; Martin Kondor 2022.

MIT license, see the [LICENSE](./LICENSE) file for more details.
