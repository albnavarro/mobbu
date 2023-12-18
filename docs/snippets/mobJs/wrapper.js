/**
 * wrapper.js
 *
 * Normally these utilities are passed directly as component
 * parameters, since the wrapper is not a component
 * we can make use of global utilities.
 */
import { staticProps, html } from '../mobjs';

export const wrapper = () => {
    return html`
        <my-header></my-header>
        <main class="main">
            <!-- Page root -->
            <div id="content"></div>
        </main>
        <my-footer ${staticProps({ myProp: 'content' })}></my-footer>
    `;
};

/**
 * main.js
 */
import { wrapper } from './wrapper';

inizializeApp({
    /**
     * the element that defines the layout of the app
     * where to define persistent components and the root
     * of the routes.
     */
    wrapper,

    // ...
});
