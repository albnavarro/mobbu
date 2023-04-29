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
    currentKey,
    updateScroller,
}) => {
    const states = getState();
    const data = await loadContent({ url: states[currentKey] });
    contentEl.textContent = data;
    setState('rawContent', data);
    hljs.highlightElement(contentEl);
    updateScroller();
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
        const closebtn = element.querySelector('.js-overlay-close');
        const background = element.querySelector('.js-overlay-background');
        const copyButton = element.querySelector('.js-overlay-copy');

        const { updateScroller, goToTop } = overlayScroller({
            screen: screenEl,
            scroller: contentEl,
        });

        /**
         * Print default content (js)
         */
        const { activeContent } = getState();
        printContent({
            setState,
            getState,
            contentEl,
            currentKey: activeContent,
            updateScroller,
        });

        /**
         * Watch content change, and update content.
         */
        const unWatchActiveContent = watch('activeContent', (currentKey) =>
            printContent({
                setState,
                getState,
                contentEl,
                currentKey,
                updateScroller,
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
                    <code>
                        <pre class="js-overlay-content"></pre>
                    </code>
                </div>
            </div>
        </div>
    `);
};
