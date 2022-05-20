# Spotify web app

This project provides a simple web application that visualizes some of the data from Spotify web API. To be more precise, it displays information about three chosen artists and their albums. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Build

Recommended versions of node and npm:
* node : >=16.0.0
* npm : >=8.0.0

All dependencies can be installed with:

`<project-root> $ npm install`

## Usage

The user application needs to authenticate before it can use the Spotify REST API. Without that, Spotify data cannot be accessed. The authentication (as well as authorization) process requires valid client credentials - a client ID and a client secret. You can get them with this [turorial](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/). This project utilizes the [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/) to get the access token.

For simplicity, this application extracts the client credentials from the environment variables. That is not a very suitable approach for production (secret data can be accessed from the build files). It would be better to perform the API calls with these credentials in the backend (e.g., node server). 

Before the application is utilized, your client credentials should be stored in the provided `.env` file template. The resulting `.env` file should be like this (values are made up):

```
REACT_APP_CLIENT_ID=45fsdfsdf56fsdfsdfsdfsdfsds4sc8c
REACT_APP_CLIENT_SECRET=1234567894123456456jnj1234567890
```

After that, the application can be started with:

`<project-root> $ npm start`

Alternatively, it is possible to use temporary envronment variables. In this case, application should be launched with:

`<project-root> $ REACT_APP_CLIENT_ID=<your client ID> REACT_APP_CLIENT_SECRET=<your client secret> npm start`