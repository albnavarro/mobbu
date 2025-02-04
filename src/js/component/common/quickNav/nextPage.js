//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';]
 * @import { QuickNav } from './type';
 **/

// @ts-ignore
import arrow from '../../../../svg/scroll_arrow.svg';
import { motionCore } from '../../../mobMotion';

/** @type {MobComponent<QuickNav>} */
export const QuickNavFn = ({
    getState,
    onMount,
    html,
    watchSync,
    setRef,
    getRef,
    bindEffect,
}) => {
    const { active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(() => {
        if (motionCore.mq('max', 'desktop')) return;

        const { prev, next } = getRef();

        watchSync('nextRoute', (route) => {
            next.href = route;
        });

        watchSync('prevRoute', (route) => {
            prev.href = route;
        });

        return () => {};
    });

    return html`<div
        class="c-quick-nav-container ${activeClass}"
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
            class="c-quick-nav c-quick-nav--prev"
            ${setRef('prev')}
            ${bindEffect({
                bind: 'prevRoute',
                toggleClass: { 'is-disable': () => !getState().prevRoute },
            })}
            >${arrow}</a
        >
        <a
            class="c-quick-nav c-quick-nav--next"
            ${setRef('next')}
            ${bindEffect({
                bind: 'nextRoute',
                toggleClass: { 'is-disable': () => !getState().nextRoute },
            })}
            >${arrow}</a
        >
    </div>`;
};
