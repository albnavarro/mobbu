import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { loadTextContent } from '../../../utils/utils';

hljs.registerLanguage('javascript', javascript);

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Snippet = ({
    html,
    onMount,
    getState,
    bindProps,
    staticProps,
    setState,
}) => {
    const { source, isFull } = getState();
    const isFullClass = isFull ? 'is-full' : '';
    console.log(isFull);

    onMount(async ({ refs }) => {
        const { codeEl } = refs;

        /**
         * Get snippet data.
         */
        const { success, data } = await loadTextContent({ source });
        if (!success) return;

        setState('contentIsLoaded', true);

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
        <code class="${isFullClass}">
            <mob-loader
                ${staticProps({ position: 'center-component' })}
                ${bindProps({
                    bind: ['contentIsLoaded'],
                    props: ({ contentIsLoaded }) => {
                        return { shouldRemove: contentIsLoaded };
                    },
                })}
            ></mob-loader>
            <pre class="${isFullClass}" ref="codeEl"></pre>
        </code>
    </div>`;
};
