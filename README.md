# CurrencyBird Challenge

## Getting Started

First, run the development server:

```bash
npm run dev

# or

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test application

For run the test just run:

```bash
npm run test

# or

yarn test
```

## Build

You can run locally or with docker integration

#### Local build

```bash
npm run build
npm run start # for run the compiled files

# or

yarn build
yarn start # for run the compiled files
```

#### Docker build

```bash
# build the container
docker build -t currencybird-aj-challenge .

# run the container
docker run -it --rm -p 3000:3000 --name aj-challenge currencybird-aj-challenge
```
