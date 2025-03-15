//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';]
 * @import { QuickNav } from './type';
 **/

// @ts-ignore
import arrow from '../../../../svg/scroll_arrow.svg';
import { html, MobJs } from '../../../mobjs';

/** @type {MobComponent<QuickNav>} */
export const QuickNavFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    /**
     * Reset.
     */
    MobJs.beforeRouteChange(() => {
        proxi.active = false;
        proxi.nextRoute = '';
        proxi.prevRoute = '';
        proxi.backRoute = '';
        proxi.color = 'white';
    });

    return html`<div
        class="c-quick-nav-container"
        ${bindEffect([
            {
                toggleClass: { active: () => proxi.active },
            },
            {
                toggleClass: {
                    'fill-white': () => proxi.color === 'white',
                    'fill-black': () => proxi.color === 'black',
                },
            },
        ])}
    >
        <a
            class="c-quick-nav c-quick-nav--back"
            ${bindEffect({
                toggleClass: { 'is-disable': () => !proxi.backRoute },
                toggleAttribute: {
                    href: () => {
                        const route = proxi.backRoute;
                        return route.length > 0 ? route : null;
                    },
                },
            })}
            >${arrow}</a
        >
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${bindEffect({
                toggleClass: { 'is-disable': () => !proxi.prevRoute },
                toggleAttribute: {
                    href: () => {
                        const route = proxi.prevRoute;
                        return route.length > 0 ? route : null;
                    },
                },
            })}
            >${arrow}</a
        >
        <a
            class="c-quick-nav c-quick-nav--next"
            ${bindEffect({
                toggleClass: { 'is-disable': () => !proxi.nextRoute },
                toggleAttribute: {
                    href: () => {
                        const route = proxi.nextRoute;
                        return route && route.length > 0 ? route : null;
                    },
                },
            })}
            >${arrow}</a
        >
    </div>`;
};
