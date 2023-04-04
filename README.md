### Development environment for testing mobbu animation and component library

Simple and fast enviroment based on esBuild

-   Plain html
-   scss
-   js

## Node version

up to 16

## Installing

npm i

## Start

### npm run dev

-   Start server with browser-sync.
-   Rebuild css/js bundle with rebuild() esbuild option.

### npm run serve

-   Very fast.
-   Start server with native esBuild serve option.
-   Esbuild server freeze after some route change, possibile problem with SSE max 6 connection.
    https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
