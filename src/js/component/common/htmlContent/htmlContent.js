//@ts-check

/**
 * @import { BindProps, MobComponentAsync, StaticProps } from '../../../mob/mobjs/type';
 * @import { HtmlContent } from './type';
 * @import { Loader } from '../loader/type';
 **/

import { html } from '../../../mob/mobjs';
import { loadJsonContent } from '../../../utils/utils';
import { getTrinangle } from '../../lib/utils/getTriangle';

/**
 * @param {object} params
 * @param {HtmlContent['state']['data']} params.data
 * @param {StaticProps<any>} params.staticProps
 * @param {boolean} params.awaitLoadSnippet
 * @returns {string}
 */
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
 * @param {object} param
 * @param {string} param.source
 * @param {any} param.data
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
 * @param {BindProps<HtmlContent,Loader>} param.bindProps
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
 * @type {MobComponentAsync<HtmlContent>}
 */
export const HtmlContentFn = async ({
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
            <div>${getTrinangle('html-content__triangle')}</div>
            ${getLoader({ data, bindProps })}
            ${getComponents({
                data: currentData,
                staticProps,
                awaitLoadSnippet,
            })}
        </section>
    `;
};
