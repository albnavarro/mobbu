//@ts-check

/**
 * @import {BindProps, MobComponentAsync, StaticProps} from '@mobJsType';
 * @import {HtmlContent} from './type';
 * @import {Loader} from '../loader/type';
 */

import { getTrinangle } from '@componentLibs/utils/get-triangle';
import { html } from '@mobJs';
import { loadJsonContent } from '@utils/utils';

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
 * @param {BindProps<HtmlContent, Loader>} param.bindProps
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

    const { awaitLoadSnippet, useTriangle, usePadding } = getState();
    const usePaddingClass = usePadding ? 'use-padding' : '';

    onMount(async () => {
        setState('contentIsLoaded', true);

        return () => {};
    });

    return html`
        <section class="html-content ${usePaddingClass}">
            <div>${getTrinangle('html-content__triangle', useTriangle)}</div>
            ${getLoader({ data, bindProps })}
            ${getComponents({
                data: currentData,
                staticProps,
                awaitLoadSnippet,
            })}
        </section>
    `;
};
