import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Snippet = ({ html, onMount }) => {
    onMount(({ refs }) => {
        const { codeEl } = refs;
        hljs.highlightElement(codeEl, { language: 'javascript' });

        return () => {};
    });

    return html`<div class="snippet">
        <code>
            <pre ref="codeEl">
                <mobjs-slot/>
            </pre>
        </code>
    </div>`;
};
