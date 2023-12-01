import { mobCore } from '../../../mobCore';
import { offset } from '../../../mobCore/utils';
import { html, parseDom } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';

function addElements({
    targets,
    delegateEvents,
    syncParent,
    staticProps,
    setState,
    bindProps,
}) {
    return targets
        .map((target, index) => {
            const { label, scroll } = target.dataset;

            return html`<li>
                <scroll-to-button
                    ${delegateEvents({
                        click: () => {
                            const offsetTop =
                                scroll === 'start'
                                    ? 0
                                    : offset(target).top - 50;
                            bodyScroll.to(offsetTop);
                            setState('activeId', index);
                        },
                    })}
                    ${bindProps({
                        bind: ['activeId'],
                        props: ({ activeId }) => ({
                            active: activeId === index,
                        }),
                    })}
                    ${staticProps({ label })}
                    ${syncParent}
                >
                </scroll-to-button>
            </li> `;
        })
        .join('');
}

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const ScrollTo = ({
    html,
    onMount,
    delegateEvents,
    syncParent,
    staticProps,
    bindProps,
    setState,
}) => {
    onMount(({ refs }) => {
        if (motionCore.mq('max', 'large')) return;

        const { list } = refs;
        const targets = document.querySelectorAll('[data-scroll]');

        list.insertAdjacentHTML(
            'beforeend',
            addElements({
                targets: [...targets],
                delegateEvents,
                syncParent,
                staticProps,
                bindProps,
                setState,
            })
        );

        /**
         * Parse dom to activate delegateEvents.
         */
        parseDom(list);

        /**
         * Remove active anchore when user scroll.
         */
        const unsubscribeMouseWheel = mobCore.useMouseWheel(() => {
            setState('activeId', -1);
        });

        return () => {
            unsubscribeMouseWheel();
        };
    });
    return html` <div class="c-scroll-to"><ul ref="list"></ul></div> `;
};
