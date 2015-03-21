# node-template-benchmarks

Just a few benchmarks for running node-based templating engines under various loads.

### Getting Started

#### Clone this repo:

```bash
git clone https://github.com/jbatte47/node-template-benchmarks.git benchmarks
cd benchmarks
```

#### Fetch all node dependencies:

```bash
npm install
```

#### Run the benchmarks:

```
npm start
```

### Development

#### Get the grunt CLI:

```bash
npm install -g grunt-cli
```

#### Run Mocha to ensure the engines being benchmarked behave as expected:

```bash
grunt test
```

#### Enter dev/test mode (watch for changes and auto-run Mocha):

```bash
npm test
```

This is equivalent to running:

```bash
grunt watch:tests
```

#### Debug modes:

- Uses `DEBUG` env variable
- Format: `benchmark:[ClassName]`
    - `benchmark:Handlebars`
    - `benchmark:Mustache`
    - `benchmark:RecordFactory`
    - `benchmark:Trial`
    - `benchmark:TrialFactory`
- Uses wildcards: `DEBUG=benchmark:*`
- Examples:
    - `DEBUG=benchmark:* npm test`
    - `DEBUG=benchmark:Trial npm start`

**Note**: in Windows, the commands look like `SET DEBUG=benchmark:* & npm test`

Resources:
- [Implementation Details][wiki]
- [Benchmark Results][results]

[results]: http://johnbatte.me/node-template-benchmarks
[wiki]: https://github.com/jbatte47/node-template-benchmarks/wiki
