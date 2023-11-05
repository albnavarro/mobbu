import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { loadTextContent } from '../../../utils/utils';

hljs.registerLanguage('javascript', javascript);

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Snippet = ({ html, onMount, getState }) => {
    const { source } = getState();

    onMount(async ({ refs }) => {
        const { codeEl } = refs;

        /**
         * Get snippet data.
         */
        const { success, data } = await loadTextContent({ source });
        if (!success) return;

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
        <code>
            <pre ref="codeEl"></pre>
        </code>
    </div>`;
};
