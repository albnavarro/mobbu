import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { overlayScroller } from './animation/overlayScroller';

hljs.registerLanguage('javascript', javascript);

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
    getState,
    contentEl,
    currentKey,
    updateScroller,
}) => {
    const states = getState();
    const data = await loadContent({ url: states[currentKey] });
    contentEl.textContent = data;
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

        const updateScroller = overlayScroller({
            screen: screenEl,
            scroller: contentEl,
        });

        /**
         * Print default content (js)
         */
        const { activeContent } = getState();
        printContent({
            getState,
            contentEl,
            currentKey: activeContent,
            updateScroller,
        });

        /**
         * Watch content change, and update content.
         */
        const unWatchActiveContent = watch('activeContent', (currentKey) =>
            printContent({ getState, contentEl, currentKey, updateScroller })
        );

        /**
         * Close overlay.
         */
        closebtn.addEventListener('click', () => setState('isOpen', false));
        background.addEventListener('click', () => setState('isOpen', false));

        /**
         * Toggle visible state.
         */
        const unWatchVisibleState = watch('isOpen', (isOpen) => {
            if (isOpen) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
                contentEl.textContent = '';
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
                <div class="code-overlay__header">
                    <button
                        type="button"
                        class="code-overlay__close js-overlay-close"
                    ></button>
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
