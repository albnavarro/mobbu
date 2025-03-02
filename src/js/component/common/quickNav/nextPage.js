//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';]
 * @import { QuickNav } from './type';
 **/

// @ts-ignore
import arrow from '../../../../svg/scroll_arrow.svg';
import { mainStore } from '../../../mobjs';

/** @type {MobComponent<QuickNav>} */
export const QuickNavFn = ({ getState, setState, html, bindEffect }) => {
    /**
     * Reset.
     */
    mainStore.watch('beforeRouteChange', () => {
        setState('active', false);
        setState('nextRoute', '');
        setState('prevRoute', '');
        setState('backRoute', '');
        setState('color', 'white');
    });

    return html`<div
        class="c-quick-nav-container"
        ${bindEffect([
            {
                bind: 'active',
                toggleClass: { active: () => getState().active },
            },
            {
                bind: 'color',
                toggleClass: {
                    'fill-white': () => getState().color === 'white',
                    'fill-black': () => getState().color === 'black',
                },
            },
        ])}
    >
        <a
            class="c-quick-nav c-quick-nav--back"
            ${bindEffect({
                bind: 'backRoute',
                toggleClass: { 'is-disable': () => !getState().backRoute },
                toggleAttribute: {
                    href: () => {
                        const route = getState().backRoute;
                        return route.length > 0 ? route : null;
                    },
                },
            })}
            >${arrow}</a
        >
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${bindEffect({
                bind: 'prevRoute',
                toggleClass: { 'is-disable': () => !getState().prevRoute },
                toggleAttribute: {
                    href: () => {
                        const route = getState().prevRoute;
                        return route.length > 0 ? route : null;
                    },
                },
            })}
            >${arrow}</a
        >
        <a
            class="c-quick-nav c-quick-nav--next"
            ${bindEffect({
                bind: 'nextRoute',
                toggleClass: { 'is-disable': () => !getState().nextRoute },
                toggleAttribute: {
                    href: () => {
                        const route = getState().nextRoute;
                        return route && route.length > 0 ? route : null;
                    },
                },
            })}
            >${arrow}</a
        >
    </div>`;
};
