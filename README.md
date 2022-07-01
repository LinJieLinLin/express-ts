# express-ts

## Installation

```shell
npm i yarn -g
yarn initPro
# need set DATABASE_URL in /packages/serve/.env.development first
yarn startServe
yarn startWeb
```

## dev Env

| Env            | Version |
| -------------- | ------- |
| system         | win11   |
| node           | 16.\*   |
| yarn           | 1.22.\* |
| docker desktop | 4.9.1   |

## Description

- [express-ts-server](https://github.com/LinJieLinLin/express-ts/blob/master/packages/serve/README.md)
- [express-ts-web](https://github.com/LinJieLinLin/express-ts/blob/master/packages/web/README.md)

## webDemo

[https://linjielinlin.github.io/express-ts](https://linjielinlin.github.io/express-ts)

[https://www.lj4.top/express-ts/](https://www.lj4.top/express-ts/)

## Test

- [report](https://linjielinlin.github.io/express-ts/coverage/)
- [coverage](https://linjielinlin.github.io/express-ts/coverage/lcov-report/index.html)

## Docker

Start the services

```sh
docker-compose up -d
```

Local view:

[serve: http://localhost:3001](http://localhost:3001)

[web: http://localhost:3002](http://localhost:3002)

View the logs

```sh
docker-compose logs -f
```

## License

Apache2.0

## Contribution

1. Fork the repository
2. Create Feat_xxx branch
3. Commit your code
4. Create Pull Request
