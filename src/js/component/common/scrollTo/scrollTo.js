import { offset } from '../../../mobCore/utils';
import { html, parseDom } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';

function addElements({ targets, delegateEvents }) {
    return targets
        .map((target) => {
            const { label } = target.dataset;

            return html`<li
                ${delegateEvents({
                    click: () => {
                        const offsetTop = offset(target).top;
                        bodyScroll.to(offsetTop - 50);
                    },
                })}
            >
                <button type="button">
                    <span> ${label} </span>
                </button>
            </li> `;
        })
        .join('');
}

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const ScrollTo = ({ html, onMount, delegateEvents }) => {
    onMount(({ refs }) => {
        if (motionCore.mq('max', 'large')) return;

        const { list } = refs;
        const targets = document.querySelectorAll('[data-scroll]');

        list.insertAdjacentHTML(
            'beforeend',
            addElements({ targets: [...targets], delegateEvents })
        );

        /**
         * Parse dom to activate delegateEvents.
         */
        parseDom(list);
    });
    return html` <div class="c-scroll-to"><ul ref="list"></ul></div> `;
};
