import arrow from '../../../../svg/scroll_arrow.svg';
import { motionCore } from '../../../mobMotion';

/**
 * @type {import('../../../mobjs/type').mobComponent<'color'|'active'|'prevRoute'|'nextRoute'>}
 */
export const QuickNavFn = ({ getState, onMount, html, watchSync }) => {
    const { active } = getState();
    const activeClass = active ? 'active' : '';

    onMount(({ element, refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { prev, next } = refs;

        watchSync('active', (isActive) => {
            element.classList.toggle('active', isActive);
        });

        watchSync('nextRoute', (route) => {
            next.classList.toggle('is-disable', !route);
            next.href = route;
        });

        watchSync('prevRoute', (route) => {
            prev.classList.toggle('is-disable', !route);
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
    });

    return html`<div class="c-quick-nav-container ${activeClass}">
        <a class="c-quick-nav c-quick-nav--prev" ref="prev">${arrow}</a>
        <a class="c-quick-nav c-quick-nav--next" ref="next">${arrow}</a>
    </div>`;
};
