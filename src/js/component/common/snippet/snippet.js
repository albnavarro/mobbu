import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { loadTextContent } from '../../../utils/utils';

hljs.registerLanguage('javascript', javascript);

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Snippet = async ({ html, onMount, getState }) => {
    const { source } = getState();
    const { success, data } = await loadTextContent({ source });
    if (!success) return;

    onMount(({ refs }) => {
        const { codeEl } = refs;
        hljs.highlightElement(codeEl, { language: 'javascript' });

        return () => {};
    });

    return html`<div class="snippet">
        <code>
            <pre ref="codeEl">${data}</pre>
        </code>
    </div>`;
};
