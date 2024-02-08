import { mobCore } from '../../../mobCore';
import { offset } from '../../../mobCore/utils';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';
import { anchorStore } from './scrollToStore';

function addScrollButton({ html, delegateEvents, sync, setState, bindProps }) {
    return html`<li>
        <scroll-to-button
            ${delegateEvents({
                click: (_e, { current, index }) => {
                    const { id: scroll, element } = current;
                    const offsetTop =
                        scroll === 'start' ? 0 : offset(element).top - 50;
                    bodyScroll.to(offsetTop);
                    setState('activeId', index);
                },
            })}
            ${bindProps({
                bind: ['activeId'],
                props: ({ activeId, _current, _index }) => ({
                    active: activeId === _index,
                    label: _current.label,
                }),
            })}
            ${sync}
        >
        </scroll-to-button>
    </li> `;
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
    repeat,
}) => {
    onMount(() => {
        if (motionCore.mq('max', 'large')) return;

        const unWatchStore = anchorStore.watch('computedItems', (val) => {
            setState('anchorItems', val.reverse());
        });

        /**
         * Remove active anchore when user scroll.
         */
        const unsubscribeMouseWheel = mobCore.useMouseWheel(() => {
            setState('activeId', -1);
        });

        return () => {
            unsubscribeMouseWheel();
            unWatchStore();
        };
    });

    return html`
        <div class="c-scroll-to">
            <ul ref="list">
                ${repeat({
                    clean: false,
                    watch: 'anchorItems',
                    key: 'id',
                    render: ({ html, sync }) => {
                        return addScrollButton({
                            html,
                            delegateEvents,
                            syncParent,
                            staticProps,
                            bindProps,
                            setState,
                            sync,
                        });
                    },
                })}
            </ul>
        </div>
    `;
};
