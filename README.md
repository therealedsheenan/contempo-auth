![logo contempo](https://github.com/therealedsheenan/contempo-auth/blob/master/repo-assets/contempo-auth.png)

# contempo-auth [![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)
This repo is about how to create an authentication using JWT on
Single Page Applications specifically for React.

## Requirements
The prerequisites are the following:

1.) Mongo Database

2.) contempo-node-api [contempo-node-api](https://github.com/therealedsheenan/contempo-node-api)

Make sure you have mongo database in your system.
Setup the API by following the instruction from the link provided.

### Under the hood
With the recent react-router v4, rendering of restricted routes are slightly changed.

Wrapping the router into an HOC and add the authentication function.

![sampe code](https://github.com/therealedsheenan/contempo-auth/blob/master/repo-assets/samplecode.png)

You can checkout the [react-router v4](https://reacttraining.com/react-router/) documentation for more information.

### Dependencies
- Contempo repo
- Server API

### How To
- run the development environment with `npm run dev`
- run isomorphic app with `npm run server`
- run tests with `npm run test` or `npm run test:update`
- run eslints with `npm run eslint`


