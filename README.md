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
npm install -g bower
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
npm test
```

Which is an alias for:

```bash
grunt test
```

#### Enter dev/test mode (watch for changes and auto-run Mocha):

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
- The benchmark code itself is simply `benchmark`
- Can combine with commas: `DEBUG=benchmark,benchmark:RecordFactory`
- Uses wildcards: `DEBUG=benchmark:*`
- Examples:
    - `DEBUG=benchmark npm start`
    - `DEBUG=benchmark:* npm test`
    - `DEBUG=benchmark:TrialFactory npm start`

**Notes**:

- In Windows, the commands look like `SET DEBUG=benchmark & npm test`
- Using wildcards (`benchmark:*`) will cause a LOT of extra output

Resources:
- [Implementation Details][wiki]
- [Benchmark Results][results]

[results]: http://johnbatte.me/node-template-benchmarks
[wiki]: https://github.com/jbatte47/node-template-benchmarks/wiki
