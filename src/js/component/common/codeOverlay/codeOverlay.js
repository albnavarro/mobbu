import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { overlayScroller } from './animation/overlayScroller';
import copyIcon from '../../../../svg/icon-copy.svg';
import {
    html,
    instanceName,
    parseDom,
    removeOrphanComponent,
    staticProps,
} from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

hljs.registerLanguage('javascript', javascript);

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

    if (currentKey === 'description') {
        descriptionEl.classList.remove('hide');
        codeEl.classList.add('hide');
        const htmlComponent = html`<html-content
            ${instanceName('overlay-descripion')}
            ${staticProps({
                source,
            })}
        ></html-content>`;
        descriptionEl.insertAdjacentHTML('afterbegin', htmlComponent);
        await parseDom(descriptionEl);

        /**
         * Save raw data.
         */
        setState('rawContent', /* HTML */ descriptionEl.textContent);
    } else {
        /**
         * Load data.
         */
        const { success, data } = await loadTextContent({ source });
        if (!success) return;

        descriptionEl.classList.add('hide');
        codeEl.classList.remove('hide');
        codeEl.textContent = data;
        hljs.highlightElement(codeEl, { language: 'javascript' });

        /**
         * Save raw data.
         */
        setState('rawContent', /* HTML */ data);
    }

    updateScroller();
    goToTop();
};

/**
 * Clean content DOM
 */
const cleanDom = ({ codeEl, descriptionEl, removeDOM }) => {
    codeEl.textContent = '';
    const descriptionElChild = descriptionEl.firstElementChild;

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
}) => {
    onMount(({ element, refs }) => {
        const { screenEl, codeEl, scrollerEl, descriptionEl } = refs;

        const { updateScroller, goToTop } = overlayScroller({
            screen: screenEl,
            scroller: scrollerEl,
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
                    cleanDom({ codeEl, descriptionEl, removeDOM });

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
            cleanDom({ codeEl, descriptionEl, removeDOM });

            printContent({
                setState,
                getState,
                codeEl,
                descriptionEl,
                currentKey,
                updateScroller,
                goToTop,
                staticProps,
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
