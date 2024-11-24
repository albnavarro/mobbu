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
}) => {
    const { active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(({ element }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { prev, next } = getRef();

        watchSync('active', (isActive) => {
            element.classList.toggle('active', isActive);
        });

        watchSync('nextRoute', (route) => {
            next.classList.toggle('is-disable', !route);
            // @ts-ignore
            next.href = route;
        });

        watchSync('prevRoute', (route) => {
            prev.classList.toggle('is-disable', !route);
            // @ts-ignore
            prev.href = route;
        });

        watchSync('color', (color) => {
            if (color === 'white') {
                element.classList.remove('fill-black');
                element.classList.add('fill-white');
                return;
            }

            if (color === 'black') {
                element.classList.remove('fill-white');
                element.classList.add('fill-black');
                return;
            }
        });

        return () => {};
    });

    return html`<div class="c-quick-nav-container ${activeClass}">
        <a class="c-quick-nav c-quick-nav--prev" ${setRef('prev')}>${arrow}</a>
        <a class="c-quick-nav c-quick-nav--next" ${setRef('next')}>${arrow}</a>
    </div>`;
};
