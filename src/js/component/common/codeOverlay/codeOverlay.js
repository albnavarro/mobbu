import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { overlayScroller } from './animation/overlayScroller';
import copyIcon from '../../../../svg/icon-copy.svg';

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
        return `${url} not found`;
    }
    const data = await response.text();
    return data;
};

const printContent = async ({
    setState,
    getState,
    contentEl,
    descriptionEl,
    currentKey,
    updateScroller,
    goToTop,
}) => {
    const states = getState();
    const data = await loadContent({ url: states[currentKey] });
    setState('rawContent', /* HTML */ data);

    if (currentKey === 'description') {
        descriptionEl.classList.remove('hide');
        contentEl.classList.add('hide');
        descriptionEl.insertAdjacentHTML('afterbegin', data);
        contentEl.textContent = '';
    } else {
        descriptionEl.classList.add('hide');
        contentEl.classList.remove('hide');
        descriptionEl.textContent = '';
        contentEl.textContent = data;
        hljs.highlightElement(contentEl, { language: 'javascript' });
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
        const contentEl = element.querySelector('.js-overlay-content');
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
         * Print default content (js)
         */
        const { activeContent } = getState();
        printContent({
            setState,
            getState,
            contentEl,
            descriptionEl,
            currentKey: activeContent,
            updateScroller,
            goToTop,
        });

        /**
         * Watch content change, and update content.
         */
        const unWatchActiveContent = watch('activeContent', (currentKey) =>
            printContent({
                setState,
                getState,
                contentEl,
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
                contentEl.textContent = '';
                descriptionEl.textContent = '';
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
                        <code class=" js-overlay-code">
                            <pre
                                class="code-overlay__content__code js-overlay-content"
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
