# Data-Visualization Capstone
###  Node.js API for GPS Data.
---

A Node.JS RESTful API for storing and retreiving GPS data. 

Running:
---

1.) Open Terminal (MAC OSX)

2.) Change directory into desired folder:

``` $ cd ~/path/to/folder/api

3.) Download repository from GitHub

```javascript
$ git clone [git@github.com:data-visualization-capstone/api.git](https://github.com/data-visualization-capstone/api)
```

4.) Install Node Package Manager (NPM)

NPM is used for managing packages and dependenices.

5.) Download Dependencies:

```javascript
$ npm install
```

6.) Start Server

```javascript
$ node server.js
```

Testing the API
---

Test the API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)

When the local development server is running, API requests can be send to [localhost:8080/api](localhost:8080/api), for example: [localhost:8080/api/users](localhost:8080/api/users)

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

Scotch.io's tutorial on building a RESTful API in Node, Express, and Mongo.

[Read the tutorial](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4)

[View the Author's GitHub Project](https://github.com/scotch-io/node-api)

[Thank you Chris Sevilleja](http://scotch.io/author/chris)

Additional Sources and Libraries:
--- 

[William Mora](http://www.williammora.com/)'s [Node.js & Socket.io Tutorial](http://www.williammora.com/2013/03/nodejs-tutorial-building-chatroom-with.html) & [Github Repo](https://github.com/wmora/nodejs-express-socketio-chatroom)

Node.js
Express
Socket.io
