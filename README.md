# ☀ LuxDB

[![version](https://img.shields.io/badge/version-v0.1.0-red.svg)](https://github.com/MartinKondor/LuxDB) [![Project Status](https://img.shields.io/badge/status-active-brightgreen.svg)](https://github.com/MartinKondor/SimpleComposer) ![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg) [![GitHub Issues](https://img.shields.io/github/issues/MartinKondor/LuxDB.svg)](https://github.com/MartinKondor/LuxDB/issues) ![Size](https://img.shields.io/bundlephobia/minzip/stormdb?color=brightgreen) [![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

☀ LuxDB is a tiny, lightweight, 0 dependency, easy-to-use JSON-based database

```js
const luxdb = new LuxDB('cache/testdb.json');
luxdb.set('users', []);
luxdb.point('users');
luxdb.push({'id': 0, 'name': 'Joe Doe'})
console.log(luxdb.get({'id': 0}));
// Prints { id: 0, name: 'Joe Doe' }
```

## Examples

```js
const luxdb = new LuxDB('cache/testdb.json');
luxdb.set('text', 'Some data')
    .set('number', 7)
    .set('array', [])
    .set('object', {})
    .save();
```

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

<p align="center">
<a title="Fiverr" href="https://www.fiverr.com/martinkondor">
<img id="fiverr-img" class="img-responsive" alt="Hire me on fiverr!" title="Hire me on fiverr!" src="https://martinkondor.github.io/img/hire_me_on_fiverr_button.png" width="222">
</a>
</p>

<p align="center"><a href="https://www.patreon.com/bePatron?u=17006186" data-patreon-widget-type="become-patron-button"><img width="222" class="img-responsive" alt="Become a Patron!" title="Become a Patron!" src="https://martinkondor.github.io/img/become_a_patron_button.png"></a></p>

## License

Copyright &copy; Martin Kondor 2020.

MIT license, see the [LICENSE](./LICENSE) file for more details.
