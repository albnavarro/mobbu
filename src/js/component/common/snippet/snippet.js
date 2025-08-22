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

const getSizes = () => {
    const remValue = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--snippet-rem-value');

    const lineHeight = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--snippet-line-height-value');

    return { remValue, lineHeight };
};

/** @type {MobComponent<Snippet>} */
export const SnippetFn = ({
    onMount,
    getState,
    setRef,
    getRef,
    delegateEvents,
    bindEffect,
    getProxi,
    bindObject,
}) => {
    const { source, numLines } = getState();
    const proxi = getProxi();

    /**
     * Get pre rem font size. Calculate full size of snippet before load.
     */
    const { remValue, lineHeight } = getSizes();

    /**
     * Add exanpd logic if snippet has X lines.
     */
    const closedHeight = `20rem`;
    const useExpand = Number(numLines) > 15;
    const expandClass = useExpand ? 'use-expand' : '';

    /**
     * Get final snippet height ( in rem ). After load snippet height will be removed. Use to load page with right size
     * ( histoy back issue )
     */
    const snippetHeight = `${numLines * Number(lineHeight) * Number(remValue)}rem`;

    onMount(async () => {
        const { codeEl } = getRef();

        /**
         * Async onMount, component should be destroyed. Avoid desconstruct
         */
        const stateObject = getState();
        const awaitLoad = stateObject?.awaitLoad;

        if (awaitLoad) {
            await loadSnippet({ ref: codeEl, source });
        } else {
            loadSnippet({ ref: codeEl, source });
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
