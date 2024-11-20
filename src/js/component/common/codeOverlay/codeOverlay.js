//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { GetState, BindProps, SetState, DelegateEvents, StaticProps, RenderComponent } from '../../../mobjs/type';
 * @import { CodeOverlay, CodeOverlayButton } from './type';
 * @import { HtmlContent } from '../htmlContent/type';
 *
 **/

import { overlayScroller } from './animation/overlayScroller';
// @ts-ignore
import copyIcon from '../../../../svg/icon-copy.svg';
import { html, beforeRouteLeave } from '../../../mobjs';

/**
 * @param {Object} param
 * @param {GetState<CodeOverlay>} param.getState
 */
const copyToClipboard = ({ getState }) => {
    const { rawContent } = getState();
    navigator.clipboard.writeText(rawContent);
};

/**
 * @param {Object} param
 * @param {() => string} param.sync
 * @param {BindProps<CodeOverlay,CodeOverlayButton>} param.bindProps
 * @param {SetState<CodeOverlay>} param.setState
 * @param {GetState<CodeOverlay>} param.getState
 * @param {DelegateEvents} param.delegateEvents
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
            ${sync()}
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
 * @param {SetState<CodeOverlay>} param.setState
 * @param {GetState<CodeOverlay>} param.getState
 * @param {StaticProps<HtmlContent>} param.staticProps
 * @param {HTMLElement} param.codeEl
 * @param {string} param.currentKey
 * @param {() => void} param.updateScroller
 * @param {() => void} param.goToTop
 * @param {RenderComponent} param.renderComponent
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
 * @type {MobComponent<CodeOverlay>}
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
    setRef,
    getRef,
}) => {
    onMount(({ element }) => {
        const { screenEl, scrollerEl, codeEl, scrollbar } = getRef();

        const { updateScroller, move, goToTop } = overlayScroller({
            screen: screenEl,
            scroller: scrollerEl,
            scrollbar,
        });

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move(scrollbar.value);
        });

        beforeRouteLeave(() => {
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
                    ${setRef('scrollbar')}
                    class="c-code-overlay__scrollbar"
                />
                <div class="c-code-overlay__content" ${setRef('screenEl')}>
                    <div ${setRef('scrollerEl')}>
                        <div
                            class="c-code-overlay__content__description"
                            ${setRef('codeEl')}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
