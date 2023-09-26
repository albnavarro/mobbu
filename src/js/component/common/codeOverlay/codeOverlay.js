import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { overlayScroller } from './animation/overlayScroller';
import copyIcon from '../../../../svg/icon-copy.svg';
import { html } from '../../../mobjs';

hljs.registerLanguage('javascript', javascript);

const copyToClipboard = ({ getState }) => {
    const { rawContent } = getState();
    navigator.clipboard.writeText(rawContent);
};

/**
 * Load common data.
 */
const loadContent = async ({ source }) => {
    const response = await fetch(source);
    if (!response.ok) {
        console.warn(`${source} not found`);

        return {
            success: false,
            data: '',
        };
    }
    const data = await response.text();
    return {
        success: true,
        data,
    };
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
                        disable: source.length === 0,
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
     * If url id not defined or is an ampty string return
     * On overlay close url is empty.
     */
    if (!source?.length) return;

    /**
     * Load data.
     */
    const { success, data } = await loadContent({ source });
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
}) => {
    onMount(({ element }) => {
        const screenEl = element.querySelector('.js-overlay-screen');
        const codeEl = element.querySelector('.js-overlay-code');
        const scrollerEl = element.querySelector('.js-overlay-scroller');
        const descriptionEl = element.querySelector('.js-overlay-description');
        const closebtn = element.querySelector('.js-overlay-close');
        const background = element.querySelector('.js-overlay-background');
        const copyButton = element.querySelector('.js-overlay-copy');

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

        /**
         * Close overlay.
         */
        closebtn.addEventListener('click', () => setState('isOpen', false));
        background.addEventListener('click', () => setState('isOpen', false));
        copyButton.addEventListener('click', () =>
            copyToClipboard({ getState })
        );

        return () => {
            unWatchVisibleState();
            unWatchActiveContent();
        };
    });

    return html`
        <div class="code-overlay js-overlay">
            <span class="code-overlay__background js-overlay-background"></span>
            <div class="code-overlay__wrap js-overlay-wrap">
                <button
                    type="button"
                    class="code-overlay__close js-overlay-close"
                ></button>
                <button
                    type="button"
                    class="code-overlay__copy js-overlay-copy"
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
                <div class="code-overlay__content js-overlay-screen">
                    <div class="js-overlay-scroller">
                        <code>
                            <pre
                                class="code-overlay__content__code js-overlay-code"
                            ></pre>
                        </code>
                        <div
                            class="code-overlay__content__description js-overlay-description"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
