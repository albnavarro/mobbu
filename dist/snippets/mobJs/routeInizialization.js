// ./routes/index.js
export * from './routes/404';
export * from './routes/home';
export * from './routes/route1';
export * from './routes/route2';
export * from './routes/route3';
export * from './routes/route4';

// main.js
import { inizializeApp } from './mobjs';
...
import * as pages from './pages/routeList'; // load pages
...

inizializeApp({

    ...

    /**
     * Object that container all route.
     * Load pages
     */
    pages,


    ...

});
