//@ts-check

import { overlayScroller } from './animation/overlayScroller';
// @ts-ignore
import copyIcon from '../../../../svg/icon-copy.svg';
import {
    html,
    mainStore,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
} from '../../../mobjs';

/**
 * @param {Object} param
 * @param {import('../../../mobjs/type').GetState<import('./type').CodeOverlay>} param.getState
 */
const copyToClipboard = ({ getState }) => {
    const { rawContent } = getState();
    navigator.clipboard.writeText(rawContent);
};

/**
 * @param {Object} param
 * @param {string} param.sync
 * @param {import('../../../mobjs/type').BindProps<import('./type').CodeOverlay,import('./type').CodeOverlayButton>} param.bindProps
 * @param {import('../../../mobjs/type').SetState<import('./type').CodeOverlay>} param.setState
 * @param {import('../../../mobjs/type').GetState<import('./type').CodeOverlay>} param.getState
 * @param {import('../../../mobjs/type').DelegateEvents} param.delegateEvents
 * @returns {string}
 */
function getRepeaterCard({
    sync,
    bindProps,
    setState,
    delegateEvents,
    getState,
}) {
    return html`
        <code-overlay-button
            ${sync}
            ${bindProps({
                bind: ['activeContent'],
                props: ({ activeContent, urls }, index) => {
                    const { label, source } = urls[index];

                    return {
                        key: label,
                        disable: !source || source.length === 0,
                        selected: label === activeContent,
                    };
                },
            })}
            ${delegateEvents({
                click: (_e, index) => {
                    const { urls } = getState();
                    const { label } = urls[index];
                    setState('activeContent', label);
                },
            })}
        >
        </code-overlay-button>
    `;
}

/**
 * @param {Object} param
 * @param {import('../../../mobjs/type').SetState<import('./type').CodeOverlay>} param.setState
 * @param {import('../../../mobjs/type').GetState<import('./type').CodeOverlay>} param.getState
 * @param {import('../../../mobjs/type').StaticProps<import('../htmlContent/type').HtmlContent>} param.staticProps
 * @param {HTMLElement} param.codeEl
 * @param {string} param.currentKey
 * @param {() => void} param.updateScroller
 * @param {() => void} param.goToTop
 * @param {import('../../../mobjs/type').RenderComponent} param.renderComponent
 * @returns {Promise<any>}
 */
const printContent = async ({
    setState,
    getState,
    codeEl,
    currentKey,
    updateScroller,
    goToTop,
    staticProps,
    renderComponent,
}) => {
    const { urls } = getState();
    const currentItem = urls.find(({ label }) => {
        return label === currentKey;
    });

    const source = currentItem?.source;

    /**
     * If url id not defined or is an empty string return
     * On overlay close url is empty.
     */
    if (!source?.length) return;

    const htmlContent = html`<html-content
        ${staticProps({ source, useMinHeight: true, awaitLoadSnippet: true })}
    ></html-content>`;

    /**
     * Render component.
     */
    await renderComponent({
        attachTo: codeEl,
        component: htmlContent,
    });

    /**
     * Save raw data.
     */
    setState('rawContent', codeEl?.textContent ?? '');

    updateScroller();
    goToTop();
};

/**
 * @type {import('../../../mobjs/type').mobComponent<import('./type').CodeOverlay>}
 */
export const CodeOverlayFn = ({
    onMount,
    setState,
    getState,
    repeat,
    html,
    bindProps,
    delegateEvents,
    watch,
    renderComponent,
    removeDOM,
    staticProps,
}) => {
    onMount(({ element, ref }) => {
        const { screenEl, scrollerEl, codeEl, scrollbar } = ref;

        const { updateScroller, move, goToTop } = overlayScroller({
            screen: screenEl,
            scroller: scrollerEl,
            scrollbar,
        });

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move(scrollbar.value);
        });

        mainStore.watch(MAIN_STORE_BEFORE_ROUTE_LEAVES, () => {
            setState('urls', []);
        });

        /**
         * Update current content.
         */
        watch('activeContent', (currentKey) => {
            printContent({
                staticProps,
                setState,
                getState,
                codeEl,
                currentKey,
                updateScroller,
                goToTop,
                renderComponent,
            });
        });

        /**
         * Open/Close overlay when the database change.
         */
        watch('urls', async (urls) => {
            /**
             * Check if should open or close
             */
            const shouldOpen = urls.length > 0;

            if (shouldOpen) {
                element.classList.add('active');
                document.body.style.overflow = 'hidden';

                /**
                 * Get first active item.
                 */
                const firstActiveItem = urls?.[0]?.label;
                if (!firstActiveItem) return;

                setState('activeContent', firstActiveItem);
                return;
            }

            element.classList.remove('active');
            document.body.style.overflow = '';

            /**
             * Reset buttons state on overlay close.
             */
            setState('activeContent', '');
            removeDOM(codeEl);
            goToTop();
        });

        return () => {};
    });

    return html`
        <div class="c-code-overlay js-overlay">
            <span
                class="c-code-overlay__background"
                ${delegateEvents({
                    click: () => {
                        setState('urls', []);
                    },
                })}
            ></span>
            <div class="c-code-overlay__wrap js-overlay-wrap">
                <button
                    type="button"
                    class="c-code-overlay__close"
                    ${delegateEvents({
                        click: () => {
                            setState('urls', []);
                        },
                    })}
                ></button>
                <button
                    type="button"
                    class="c-code-overlay__copy"
                    ${delegateEvents({
                        click: () => {
                            copyToClipboard({ getState });
                        },
                    })}
                >
                    ${copyIcon}
                </button>
                <div class="c-code-overlay__header">
                    ${repeat({
                        clean: true,
                        bind: 'urls',
                        render: ({ sync }) => {
                            return getRepeaterCard({
                                sync,
                                bindProps,
                                delegateEvents,
                                setState,
                                getState,
                            });
                        },
                    })}
                </div>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ref="scrollbar"
                    class="c-code-overlay__scrollbar"
                />
                <div class="c-code-overlay__content" ref="screenEl">
                    <div ref="scrollerEl">
                        <div
                            class="c-code-overlay__content__description"
                            ref="codeEl"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
