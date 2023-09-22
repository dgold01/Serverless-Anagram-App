### Requirements

- NodeJS v16.x (created using version 16.15.1)

### Installation

Install the Node.js packages

``` bash
npm install
```

### Usage

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline) (with hot reloading)

``` bash
npm start 
```
or
``` bash
serverless offline start --reloadHandler
```

The function will then be available at http://localhost:3000/[function-path]

### Running functions

To run a function on your local

``` bash
serverless invoke local --function hello
```

#### Running Tests

Run your tests using

``` bash
npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

#### Environment Variables

To add environment variables to your project

1. Rename `env.example` to `.env`.
2. Add environment variables for your local stage to `.env`.
3. Uncomment `environment:` block in the `serverless.yml` and reference the environment variable as `${env:MY_ENV_VAR}`. Where `MY_ENV_VAR` is added to your `.env` file.
