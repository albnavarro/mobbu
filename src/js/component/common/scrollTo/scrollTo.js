import { offset } from '../../../mobCore/utils';
import { tick } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';
import { anchorStore } from './scrollToStore';

let disableObservereffect = false;

function addScrollButton({ html, delegateEvents, sync, setState, bindProps }) {
    return html`<li>
        <scroll-to-button
            ${delegateEvents({
                click: async (_e, { current }) => {
                    const { id: scroll, label, element } = current;
                    const offsetTop =
                        scroll === 'start' ? 0 : offset(element).top - 50;

                    /**
                     * Disable spacerAnchor observer effect during scroll.
                     */
                    disableObservereffect = true;
                    setState('activeLabel', label);
                    await bodyScroll.to(offsetTop);

                    /**
                     * back to enable spacerAnchor observer.
                     */
                    disableObservereffect = false;
                },
            })}
            ${bindProps({
                bind: ['activeLabel'],
                props: ({ activeLabel, _current }) => ({
                    active: activeLabel === _current.label,
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

        const unWatchStoreComputed = anchorStore.watch(
            'computedItems',
            async (val) => {
                setState('anchorItems', val.reverse());
                await tick();

                console.log('resolve sctollto tick');
            }
        );

        const unWatchStoreActive = anchorStore.watch(
            'activeLabelFromObeserver',
            (label) => {
                if (disableObservereffect) return;

                setState('activeLabel', label);
            }
        );

        return () => {
            unWatchStoreComputed();
            unWatchStoreActive();
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
