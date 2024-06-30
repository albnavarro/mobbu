//@ts-check

import { html } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

const getComponents = ({ data, staticProps, awaitLoadSnippet }) => {
    return data
        .map((item) => {
            const { component, props, content } = item;

            return html`
                <${component} ${staticProps({ ...props, awaitLoad: awaitLoadSnippet })}>
                    ${content ?? ''}
                </${component}>
            `;
        })
        .join('');
};

/**
 * Get data from props or fetch.
 */
const getData = async ({ source, data }) => {
    if (data && data.length > 0) return data;

    const { success, data: currentData } = await loadJsonContent({ source });
    if (!success) return [];

    return currentData.data;
};

/**
 * @param {object} param
 * @param {any} param.data
 * @param {import('../../../mobjs/type').BindProps<import('./type').HtmlContent,import('../loader/type').Loader>} param.bindProps
 */
const getLoader = ({ data, bindProps }) => {
    if (data && data.length > 0) return '';

    return html`
        <mob-loader
            ${bindProps({
                bind: ['contentIsLoaded'],
                props: ({ contentIsLoaded }) => {
                    return { shouldRemove: contentIsLoaded };
                },
            })}
        ></mob-loader>
    `;
};

/**
 * @type {import("../../../mobjs/type").mobComponent<import('./type').HtmlContent>}
 */
export const HtmlContentFn = async ({
    html,
    getState,
    setState,
    staticProps,
    bindProps,
    onMount,
}) => {
    const { source, data } = getState();
    const currentData = await getData({ source, data });

    const { useMinHeight, useMaxWidth, awaitLoadSnippet } = getState();
    const useMinHeightClass = useMinHeight ? 'is-min-100' : '';
    const useMaxWidthClass = useMaxWidth ? 'is-max-width' : '';

    onMount(async () => {
        setState('contentIsLoaded', true);

        return () => {};
    });

    return html`
        <section class="html-content ${useMinHeightClass} ${useMaxWidthClass}">
            ${getLoader({ data, bindProps })}
            ${getComponents({
                data: currentData,
                staticProps,
                awaitLoadSnippet,
            })}
        </section>
    `;
};
