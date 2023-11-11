import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { overlayScroller } from './animation/overlayScroller';
import copyIcon from '../../../../svg/icon-copy.svg';
import { html } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

hljs.registerLanguage('javascript', javascript);

const copyToClipboard = ({ getState }) => {
    const { rawContent } = getState();
    navigator.clipboard.writeText(rawContent);
};

function getRepeaterCard({ sync, bindProps, bindEvents, setState }) {
    return html`
        <code-overlay-button
            ${sync}
            ${bindProps({
                bind: ['activeContent'],
                props: ({ activeContent, _current }) => {
                    const { label, source } = _current;
                    return {
                        key: label,
                        disable: !source || source.length === 0,
                        selected: label === activeContent,
                    };
                },
            })}
            ${bindEvents({
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
    descriptionEl,
    currentKey,
    updateScroller,
    goToTop,
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

    /**
     * Load data.
     */
    const { success, data } = await loadTextContent({ source });
    if (!success) return;

    /**
     * Save raw data.
     */
    setState('rawContent', /* HTML */ data);

    if (currentKey === 'description') {
        descriptionEl.classList.remove('hide');
        codeEl.classList.add('hide');
        descriptionEl.insertAdjacentHTML('afterbegin', data);
        codeEl.textContent = '';
    } else {
        descriptionEl.classList.add('hide');
        codeEl.classList.remove('hide');
        descriptionEl.textContent = '';
        codeEl.textContent = data;
        hljs.highlightElement(codeEl, { language: 'javascript' });
    }

    updateScroller();
    goToTop();
};

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const CodeOverlay = ({
    onMount,
    setState,
    getState,
    watch,
    repeat,
    html,
    bindProps,
    bindEvents,
    delegateEvents,
}) => {
    onMount(({ element, refs }) => {
        const { screenEl, codeEl, scrollerEl, descriptionEl } = refs;

        const { updateScroller, goToTop } = overlayScroller({
            screen: screenEl,
            scroller: scrollerEl,
        });

        /**
         * Watch content change, and update content.
         */
        const unWatchActiveContent = watch('activeContent', (currentKey) => {
            printContent({
                setState,
                getState,
                codeEl,
                descriptionEl,
                currentKey,
                updateScroller,
                goToTop,
            });
        });

        /**
         * Toggle visible state.
         */
        const unWatchVisibleState = watch('isOpen', (isOpen) => {
            if (isOpen) {
                element.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                element.classList.remove('active');
                document.body.style.overflow = '';
                codeEl.textContent = '';
                descriptionEl.textContent = '';

                /**
                 * Reset buttons state on overlay close.
                 */
                setState('activeContent', '');
                goToTop();
            }
        });

        return () => {
            unWatchVisibleState();
            unWatchActiveContent();
        };
    });

    return html`
        <div class="code-overlay js-overlay">
            <span
                class="code-overlay__background"
                ${delegateEvents({
                    click: () => {
                        setState('isOpen', false);
                    },
                })}
            ></span>
            <div class="code-overlay__wrap js-overlay-wrap">
                <button
                    type="button"
                    class="code-overlay__close"
                    ${delegateEvents({
                        click: () => {
                            setState('isOpen', false);
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
                                bindEvents,
                                setState,
                            });
                        },
                    })}
                </div>
                <div class="code-overlay__content" ref="screenEl">
                    <div ref="scrollerEl">
                        <code>
                            <pre
                                class="code-overlay__content__code"
                                ref="codeEl"
                            ></pre>
                        </code>
                        <div
                            class="code-overlay__content__description"
                            ref="descriptionEl"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
