import { html } from '../../mobjs';

/**
 * @param {object} params
 * @param {import('./type').LayoutSidebarAnchorBreadCrumbs[]} params.breadCrumbs
 */
export const getBreadCrumbs = ({ breadCrumbs }) =>
    breadCrumbs
        .map((item, index) =>
            index === breadCrumbs.length - 1
                ? html`<a href="${item.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${item.url}"
                          >${item.title}</a
                      >`
                : html`<a class="breadcrumbs__link" href="${item.url}"
                      >${item.title}</a
                  >`
        )
        .join('');
