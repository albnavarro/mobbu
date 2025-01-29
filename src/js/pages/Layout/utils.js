import { html } from '../../mobjs';

/**
 * @param {object} params
 * @param {{url:string, title:string}[]} params.breadCrumbs
 */
export const getBreadCrumbs = ({ breadCrumbs }) =>
    breadCrumbs
        .map((item) => html` <a href="${item.url}">${item.title}</a> / `)
        .join('');
