//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';]
 * @import { LinksMobJsButton } from './type';
 **/

/**
 * @type {MobComponent<LinksMobJsButton>}
 */
export const LinksMobJsButtonFn = ({ html, getState, onMount, watchSync }) => {
    const { label, url } = getState();

    onMount(({ element }) => {
        watchSync('active', (value) => {
            element.classList.toggle('current', value);
        });

        return () => {};
    });

    return html` <a href="./#${url}"><span>${label}</span></a>`;
};
