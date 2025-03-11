/**
 * wrapper.js
 *
 * Normally these utilities are passed directly as component
 * parameters, since the wrapper is not a component
 * we can make use of global utilities.
 */
import { MobJs, html } from '../../../src/js/mobjs';

/**
 * Import components definition used in wrapper.
 * ( object returned by createComponent() function )
 * It is necessary to load the dependencies before the application
 */
MobJs.useComponent([Header, Footer]);

export const wrapper = async () => {
    /**
     * Here it is possibile run a async function.
     */

    return html`
        <my-header></my-header>
        <main class="main">
            <!-- Page root -->
            <div id="content"></div>
        </main>
        <my-footer ${MobJs.staticProps({ myProp: 'content' })}></my-footer>
    `;
};

/**
 * main.js
 */
import { wrapper } from './wrapper';
import { MobJs } from '../../../src/js/mobjs';

MobJs.inizializeApp({
    /**
     * the element that defines the layout of the app
     * where to define persistent components and the root
     * of the routes.
     */
    wrapper,

    // ...
});
