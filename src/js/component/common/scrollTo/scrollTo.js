import { offset } from '../../../mobCore/utils';
import { mainStore, tick } from '../../../mobjs';
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
export const ScrollToFn = ({
    html,
    onMount,
    delegateEvents,
    staticProps,
    getState,
    bindProps,
    watchSync,
    setState,
    repeat,
}) => {
    const unWatchItems = anchorStore.watch('items', async (val) => {
        setState('anchorItems', val);
    });

    const unWatchStoreActive = anchorStore.watch(
        'activeLabelFromObeserver',
        (label) => {
            if (disableObservereffect) return;

            setState('activeLabel', label);
        }
    );

    /**
     * Await route is loaded to never array.
     */
    const unWatchAfterRoutChange = mainStore.watch('afterRouteChange', () => {
        const { anchorItems } = getState();
        setState('itemOrdered', anchorItems.reverse());
        setState('isVisible', true);
    });

    const unWatchBeforeRoutChange = mainStore.watch('beforeRouteChange', () => {
        setState('isVisible', false);
    });

    onMount(({ element }) => {
        if (motionCore.mq('max', 'large')) return;

        watchSync('isVisible', (value) => {
            element.classList.toggle('visible', value);
        });

        return () => {
            unWatchItems();
            unWatchStoreActive();
            unWatchAfterRoutChange();
            unWatchBeforeRoutChange();
        };
    });

    return html`
        <div class="c-scroll-to">
            <ul ref="list">
                ${repeat({
                    clean: true,
                    watch: 'itemOrdered',
                    render: ({ html, sync }) => {
                        return addScrollButton({
                            html,
                            delegateEvents,
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
