/**
 * @param {object} params
 * @param {import('./type').LayoutSidebarAnchorBreadCrumbs[]} params.breadCrumbs
 */
export const getBreadCrumbs = ({ breadCrumbs }) => {
    const items = breadCrumbs
        .map((item) => {
            return /* HTML */ `<li>
                <a class="link" href="${item.url}">${item.title}</a>
            </li> `;
        })
        .join('');

    return items;
};
