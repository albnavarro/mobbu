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
    ref.style.minHeight = '';
};

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Snippet = ({ html, onMount, getState }) => {
    const { source, isFull, hasBorder, hasOverflow, numLines, loadOnMount } =
        getState();
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

    onMount(async ({ refs }) => {
        const { codeEl } = refs;

        if (loadOnMount) {
            await loadSnippet({ ref: codeEl, source });
        } else {
            loadSnippet({ ref: codeEl, source });
        }

        return () => {};
    });

    return html`<div class="snippet">
        <code class="${isFullClass} ${hasBorderClass}">
            <pre
                class="${isFullClass} ${hasOverflowClass}"
                ref="codeEl"
                style="min-height:${numLines * remValue}rem;"
            >
Loading snippet ...</pre
            >
        </code>
    </div>`;
};
