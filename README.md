# Employee Data

## The project manages a database with a list of employees, using advanced MERN stack operations and advanced routing.

## Client-side routing: Client-side routing refers to the process of routing in a web application, where the routing is managed entirely on the client-side, usually through JavaScript. In a client-side routing system, the routing logic and navigation are handled by the client (typically the web browser) rather than on the server. This allows for faster navigation, as the browser can update the URL and render new content without having to make a request to the server.

## Server-side routing: Server-side routing refers to the process of routing in a web application, where the routing is managed on the server. In a server-side routing system, the routing logic and navigation are handled by the server, and the server returns a complete HTML page for each request made by the client. In server-side routing, the server handles each request for a specific URL and returns the appropriate HTML content for that URL. For example, when a user navigates to the homepage of a website, the server receives the request, processes it, and returns the HTML content for the homepage.

## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

### Runnig the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit the http://localhost:3000 on your preferred browser.
