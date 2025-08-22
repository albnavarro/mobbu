/**
 * @import {MobComponent} from '@mobJsType';
 * @import {Snippet} from './type';
 */

import { html } from '@mobJs';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { loadTextContent } from '@utils/utils';

hljs.registerLanguage('javascript', javascript);

/**
 * @param {object} params
 * @param {HTMLElement} params.ref
 * @param {string} params.source
 */
const loadSnippet = async ({ ref, source }) => {
    if (!ref) return;

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
    hljs.highlightElement(ref);
    ref.style.height = '';
};

/**
 * @returns {string}
 */
const getLineHeight = () => {
    return getComputedStyle(document.documentElement).getPropertyValue(
        '--snippet-line-height-value'
    );
};

/** @type {MobComponent<Snippet>} */
export const SnippetFn = ({
    onMount,
    setRef,
    getRef,
    delegateEvents,
    bindEffect,
    getProxi,
    bindObject,
}) => {
    const proxi = getProxi();

    /**
     * Get pre rem font size. Calculate full size of snippet before load.
     */
    const lineHeight = getLineHeight();

    /**
     * Add exanpd logic if snippet has X lines.
     */
    const closedHeight = `20rem`;
    const useExpand = Number(proxi.numLines) > 15;
    const expandClass = useExpand ? 'use-expand' : '';

    /**
     * Get final snippet height ( in rem ). After load snippet height will be removed. Use to load page with right size
     * ( histoy back issue )
     */
    const snippetHeight = `${proxi.numLines * Number(lineHeight)}rem`;

    onMount(async () => {
        const { codeEl } = getRef();

        /**
         * Async onMount, component should be destroyed. Avoid desconstruct
         */
        if (proxi.awaitLoad) {
            await loadSnippet({ ref: codeEl, source: proxi.source });
        } else {
            loadSnippet({ ref: codeEl, source: proxi.source });
        }

        return () => {};
    });

    return html`<div
        class="snippet"
        style="--snippet-height:${snippetHeight};--closed-height:${closedHeight}"
    >
        <code
            ${bindEffect({
                toggleClass: {
                    close: () => useExpand && !proxi.isExpanded,
                    open: () => useExpand && proxi.isExpanded,
                },
            })}
        >
            <pre
                ${setRef('codeEl')}
                style="height:${useExpand ? closedHeight : snippetHeight}"
            >
                 Loading snippet ...</pre
            >
        </code>
        <button
            class="snippet__expand ${expandClass}"
            ${!useExpand && 'disabled'}
            ${delegateEvents({
                click: () => {
                    proxi.isExpanded = !proxi.isExpanded;
                },
            })}
        >
            ${bindObject`${() => (proxi.isExpanded ? 'close' : 'expand')}`}
        </button>
    </div>`;
};
