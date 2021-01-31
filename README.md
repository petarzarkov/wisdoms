# TS-starter
An app for wisdoms

Description
-

Techonologies used

* [node.js](https://nodejs.org/en/) ( [Koa](https://koajs.com/) for HTTP management)
* [npm](https://www.npmjs.com/)

How to start
-
1. Install dependecies:
```
$ npm i
```
2. Run:
* if using .env:
```
$ npm run bns
```
* else: 
```
$ npm run start
```

Example endpoints
-

Fetches a random dad joke
* _/api/getDadJoke_ 

Fetches a random dad joke based on query 'term'
* _/api/searchDadJoke_ 
* example: https://ts-starter-jokes.herokuapp.com/api/searchDadJoke?term=dad

Liveness probe
* _/api/healthcheck_
* Example response:
```
{
    "sucess": true,
    "version": "1.0.0",
    "name": "wisdoms"
}
```
 
