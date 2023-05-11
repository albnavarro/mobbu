import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { overlayScroller } from './animation/overlayScroller';
import copyIcon from '../../../../svg/icon-copy.svg';
import { createProps } from '../../../mobjs';

hljs.registerLanguage('javascript', javascript);

const copyToClipboard = ({ getState }) => {
    const { rawContent } = getState();
    navigator.clipboard.writeText(rawContent);
};

const getButtons = ({ contents, setState }) => {
    return contents
        .map((key) => {
            return /*HTML*/ `<CodeOverlayButton data-props="${createProps({
                key,
                callback: () => {
                    setState('activeContent', key);
                },
            })}"></CodeOverlayButton>`;
        })
        .join('');
};

/**
 * Load common data.
 */
const loadContent = async ({ url }) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.warn(`${url} not found`);

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
    const url = urls[currentKey];

    /**
     * If url id not defined or is an ampty string return
     * On overlay close url is empty.
     */
    if (!url?.length) return;

    /**
     * Load data.
     */
    const { success, data } = await loadContent({ url });
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

export const CodeOverlay = ({
    render,
    onMount,
    props,
    setState,
    getState,
    watch,
}) => {
    const { contents } = props;

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
        const unWatchActiveContent = watch('activeContent', (currentKey) =>
            printContent({
                setState,
                getState,
                codeEl,
                descriptionEl,
                currentKey,
                updateScroller,
                goToTop,
            })
        );

        /**
         * Close overlay.
         */
        closebtn.addEventListener('click', () => setState('isOpen', false));
        background.addEventListener('click', () => setState('isOpen', false));
        copyButton.addEventListener('click', () =>
            copyToClipboard({ getState })
        );

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

    return render(/* HTML */ `
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
                    ${getButtons({ contents, setState })}
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
    `);
};
