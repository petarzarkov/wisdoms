# Wisdoms App
An app for wisdoms

Description
-
Generates random wisdoms

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

Fetches a random wisdom, default lang -> bg
* _/api/getWisdom_ 

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
 
