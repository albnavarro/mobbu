import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { loadTextContent } from '../../../utils/utils';

hljs.registerLanguage('javascript', javascript);

const loadSnippet = async ({ ref, source }) => {
    /**
     * Get snippet data.
     */
    const { success, data } = await loadTextContent({ source });
    if (!success) {
        ref.textContent = `something went wrong`;
        return;
    }

    /**
     * Add contento to dom.
     */
    ref.textContent = data;

    /**
     * Apply highlight.
     */
    hljs.highlightElement(ref, { language: 'javascript' });
    ref.style.height = '';
};

/**
 * @type {import("../../../mobjs/type").mobComponent<'source'|'contentIsLoaded'|'isFull'|'hasOverflow'|'hasBorder'|'numLines'>}
 */
export const SnippetFn = ({ html, onMount, getState }) => {
    const { source, isFull, hasBorder, hasOverflow, numLines } = getState();
    const isFullClass = isFull ? 'is-full' : '';
    const hasBorderClass = hasBorder ? 'has-border' : '';
    const hasOverflowClass = hasOverflow ? 'has-overflow' : '';

    /**
     * Get pre rem font size.
     * Calculate full size of snippet before load.
     */
    const remValue = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--snippet-rem-value');

    const lineHeight = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--snippet-line-height-value');

    onMount(async ({ refs }) => {
        const { codeEl } = refs;
        loadSnippet({ ref: codeEl, source });

        return () => {};
    });

    return html`<div class="snippet">
        <code class="${isFullClass} ${hasBorderClass}">
            <pre
                class="${isFullClass} ${hasOverflowClass}"
                ref="codeEl"
                style="height:${numLines * lineHeight * remValue}rem;"
            >
Loading snippet ...</pre
            >
        </code>
    </div>`;
};
