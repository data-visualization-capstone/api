# Data-Visualization Capstone API

A RESTful backend API for storing and retrieving GPS data for use in location data visualizations.
MEAN: MongoDB, Express, Angular, Node.js

Running:
---

1.) Open Terminal (MAC OSX)

2.) Change directory into desired folder:

```javascript
$ cd ~/path/to/folder/api
```

3.) Download repository from GitHub

```javascript
$ git clone git@github.com:data-visualization-capstone/api.git
```

4.) Install Node Package Manager

> Node Package Manager (NPM) is used for managing packages and dependenices.

5.) Download Dependencies:

```javascript
$ npm install
```

6.) Start Server

```javascript
$ node server.js
```

For Local Development:
___

1.) Install nodemon for watching changes and auto-restarting the server.

```javascript
$ npm install -g nodemon
```

> sudo if you have to

2.) Run:

```javascript
$ nodemon server.js
```

The local node.js server should now restart when
it detects changes to the files.


Testing the API
---

Test the API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)

When the local development server is running, API requests can be send to [localhost:8080/api](http://localhost:8080/api), for example: [localhost:8080/api/users](http://localhost:8080/api/users)

Models:
---

Models are the underlying data structure currently supported.

> Users:
>  - (String) id
>  - (String) source
> 
> Location:
>  - (String) id
>  - (String) userId
>  - (int) timestamp -> epoch time
>  - (float) latitude
>  - (float) longitude


Forked From: 
--- 

Scotch.io's tutorial on building a RESTful API in Node, Express, and Mongo:

- [Read the tutorial](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4)

- [View the Author's GitHub Project](https://github.com/scotch-io/node-api)

- [Thank you Chris Sevilleja](http://scotch.io/author/chris)

Additional Sources and Libraries:
--- 

- [William Mora](http://www.williammora.com/)'s [Node.js & Socket.io Tutorial](http://www.williammora.com/2013/03/nodejs-tutorial-building-chatroom-with.html) & [Github Repo](https://github.com/wmora/nodejs-express-socketio-chatroom)
- Node.js
- Express
- Socket.io

Authors
---
- [Alex Johnson](https://github.com/alexjohnson505)
- [Dana Bucci](https://github.com/danabucci)
