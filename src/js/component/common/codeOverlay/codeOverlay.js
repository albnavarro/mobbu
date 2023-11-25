import { overlayScroller } from './animation/overlayScroller';
import copyIcon from '../../../../svg/icon-copy.svg';
import { html, parseDom, staticProps } from '../../../mobjs';

const copyToClipboard = ({ getState }) => {
    const { rawContent } = getState();
    navigator.clipboard.writeText(rawContent);
};

function getRepeaterCard({ sync, bindProps, setState, delegateEvents }) {
    return html`
        <code-overlay-button
            ${sync}
            ${bindProps({
                bind: ['currentButtonState'],
                props: ({ currentButtonState, _current }) => {
                    const { label, source } = _current;
                    return {
                        key: label,
                        disable: !source || source.length === 0,
                        selected: label === currentButtonState,
                    };
                },
            })}
            ${delegateEvents({
                click: (_e, { current }) => {
                    const { label } = current;
                    setState('activeContent', label);
                },
            })}
        >
        </code-overlay-button>
    `;
}

const printContent = async ({
    setState,
    getState,
    codeEl,
    currentKey,
    updateScroller,
    goToTop,
    syncParent,
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

    const htmlComponent = html`<html-content
        ${staticProps({ source, useMinHeight: true })}
        ${syncParent}
    ></html-content>`;
    codeEl.insertAdjacentHTML('afterbegin', htmlComponent);
    await parseDom(codeEl);

    /**
     * Save raw data.
     */
    setState('rawContent', /* HTML */ codeEl.textContent);

    updateScroller();
    goToTop();
};

/**
 * Clean content DOM
 */
const cleanDom = ({ codeEl, removeDOM }) => {
    codeEl.textContent = '';
    const descriptionElChild = codeEl.firstElementChild;

    /**
     * Clean HTML component.
     */
    if (descriptionElChild) removeDOM(descriptionElChild);
};

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const CodeOverlay = ({
    onMount,
    setState,
    getState,
    repeat,
    html,
    bindProps,
    delegateEvents,
    staticProps,
    computed,
    watch,
    removeDOM,
    syncParent,
}) => {
    onMount(({ element, refs }) => {
        const { screenEl, scrollerEl, codeEl, scrollbar } = refs;

        const { updateScroller, move, goToTop } = overlayScroller({
            screen: screenEl,
            scroller: scrollerEl,
            scrollbar,
        });

        scrollbar.addEventListener('input', () => {
            move(scrollbar.value);
        });

        /**
         * Update button active state when after mutation of
         * urls and activeContent.
         * Is necessary or first selected.
         * ( urls and and activeContent canghe together ).
         */
        computed(
            'currentButtonState',
            ['urls', 'activeContent'],
            (urls, activeContent) => {
                /**
                 * Open/Close overlay.
                 */
                const shouldOpen = urls.length > 0;

                if (shouldOpen) {
                    element.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    element.classList.remove('active');
                    document.body.style.overflow = '';
                    cleanDom({ codeEl, removeDOM });

                    /**
                     * Reset buttons state on overlay close.
                     */
                    setState('activeContent', '');
                    goToTop();
                }

                return activeContent;
            }
        );

        /**
         * Update current content.
         */
        const unWatchActiveContent = watch('activeContent', (currentKey) => {
            cleanDom({ codeEl, removeDOM });

            printContent({
                setState,
                getState,
                codeEl,
                currentKey,
                updateScroller,
                goToTop,
                staticProps,
                syncParent,
            });
        });

        return () => {
            unWatchActiveContent();
        };
    });

    return html`
        <div class="code-overlay js-overlay">
            <span
                class="code-overlay__background"
                ${delegateEvents({
                    click: () => {
                        setState('urls', []);
                    },
                })}
            ></span>
            <div class="code-overlay__wrap js-overlay-wrap">
                <button
                    type="button"
                    class="code-overlay__close"
                    ${delegateEvents({
                        click: () => {
                            setState('urls', []);
                        },
                    })}
                ></button>
                <button
                    type="button"
                    class="code-overlay__copy"
                    ${delegateEvents({
                        click: () => {
                            copyToClipboard({ getState });
                        },
                    })}
                >
                    ${copyIcon}
                </button>
                <div class="code-overlay__header">
                    ${repeat({
                        clean: true,
                        watch: 'urls',
                        render: ({ sync }) => {
                            return getRepeaterCard({
                                sync,
                                bindProps,
                                delegateEvents,
                                setState,
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
                    class="code-overlay__scrollbar"
                />
                <div class="code-overlay__content" ref="screenEl">
                    <div ref="scrollerEl">
                        <div
                            class="code-overlay__content__description"
                            ref="codeEl"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
