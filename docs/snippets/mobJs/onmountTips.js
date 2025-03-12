import { html } from '../../../src/js/mobjs';

const loadContent = async ({ element, source }) => {
    const response = await fetch(source);
    if (!response.ok) {
        element.textContent = '<div>error</div>';
        return;
    }

    const data = await response.json();
    element.textContent = data;
};

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = async ({ onMount, getState }) => {
    const { lazyLoad, source } = getState();

    onMount(async ({ element }) => {
        if (lazyLoad) {
            /**
             * Non blocking loading.
             */
            loadContent({ element, source });
        } else {
            /**
             * Blocking loading.
             */
            await loadContent({ element, source });
        }

        return () => {};
    });

    /**
     * Return the DOM.
     */
    return html` <div></div> `;
};
