/**
 * Wrapper.js
 *
 * Normally these utilities are passed directly as component parameters, since the wrapper is not a component we can
 * make use of global utilities.
 */
import { MobJs, htmlObject } from '@mobJs';

/**
 * Import components definition used in wrapper. ( object returned by createComponent() function ) It is necessary to
 * load the dependencies before the application
 */
MobJs.useComponent([Header, Footer]);

export const wrapper = async () => {
    /**
     * Here it is possibile run a async function.
     */

    return htmlObject({
        content: [
            {
                component: Header,
            },
            {
                tag: 'main',
                className: 'main',
                content: {
                    /**
                     * Page root
                     */
                    attributes: { id: 'content' },
                },
            },
            {
                component: Footer,
            },
        ],
    });
};

/**
 * Main.js
 */
import { wrapper } from './wrapper';
import { MobJs } from '@mobJs';

MobJs.inizializeApp({
    /**
     * The element that defines the layout of the app where to define persistent components and the root of the routes.
     */
    wrapper,

    // ...
});
