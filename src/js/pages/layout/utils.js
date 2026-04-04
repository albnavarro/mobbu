import { html } from '@mobJs';

/**
 * @param {object} params
 * @param {import('./type').LayoutSidebarAnchorBreadCrumbs[]} params.breadCrumbs
 */
export const getBreadCrumbs = ({ breadCrumbs }) => {
    const items = breadCrumbs
        .map((item, index) =>
            index === breadCrumbs.length - 1
                ? html`<a href="${item.url}" class="arrows">
                          <div class="arrow-start"></div>
                          <div class="arrow-end"></div>
                      </a>
                      <a class="link" href="${item.url}">${item.title}</a>`
                : html`<a class="link" href="${item.url}">${item.title}</a>`
        )
        .join('');

    return `<div class="c-breadcrumbs">${items}</div>`;
};
