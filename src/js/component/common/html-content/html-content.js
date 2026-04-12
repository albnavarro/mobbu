/**
 * @import {
 *   MobComponentAsync,
 *   StaticProps
 * } from "@mobJsType"
 * @import {HtmlContent} from "./type"
 */

import { fromObject } from '@mobJs';
import { loadJsonContent } from '@utils/utils';

/**
 * @param {object} params
 * @param {HtmlContent['props']['data']} params.data
 * @param {StaticProps<any>} params.staticProps
 * @param {boolean} params.awaitLoadSnippet
 * @returns {string[]}
 */
const getComponents = ({ data, staticProps, awaitLoadSnippet }) => {
    return data.map((item) => {
        const { component, props, content } = item;

        return fromObject({
            tag: component,
            modules: staticProps({ ...props, awaitLoad: awaitLoadSnippet }),
            content: content ?? '',
        });
    });
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
 * @type {MobComponentAsync<HtmlContent>}
 */
export const HtmlContentFn = async ({ getState, staticProps }) => {
    const { source, data } = getState();
    const currentData = await getData({ source, data });

    const { awaitLoadSnippet, usePadding } = getState();
    const usePaddingClass = usePadding ? 'use-padding' : '';

    return fromObject({
        tag: 'section',
        className: ['html-content', usePaddingClass],
        content: getComponents({
            data: currentData,
            staticProps,
            awaitLoadSnippet,
        }),
    });
};
