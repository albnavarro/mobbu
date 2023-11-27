import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { loadTextContent } from '../../../utils/utils';

hljs.registerLanguage('javascript', javascript);

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Snippet = ({ html, onMount, getState }) => {
    const { source, isFull, hasBorder, hasOverflow } = getState();
    const isFullClass = isFull ? 'is-full' : '';
    const hasBorderClass = hasBorder ? 'has-border' : '';
    const hasOverflowClass = hasOverflow ? 'has-overflow' : '';

    onMount(async ({ refs }) => {
        const { codeEl } = refs;

        /**
         * Get snippet data.
         */
        const { success, data } = await loadTextContent({ source });
        if (!success) {
            codeEl.textContent = `something went wrong`;
            return;
        }

        /**
         * Add contento to dom.
         */
        codeEl.textContent = data;

        /**
         * Apply highlight.
         */
        hljs.highlightElement(codeEl, { language: 'javascript' });

        return () => {};
    });

    return html`<div class="snippet">
        <code class="${isFullClass} ${hasBorderClass}">
            <pre class="${isFullClass} ${hasOverflowClass}" ref="codeEl">
Loading snippet ...
            </pre
            >
        </code>
    </div>`;
};
