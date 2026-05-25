/**
 * @param {object} params
 * @param {import('./type').LayoutSidebarAnchorBreadCrumbs[]} params.breadCrumbs
 */
export const getBreadCrumbs = ({ breadCrumbs }) => {
    let backArrow = '';

    const items = breadCrumbs
        .map((item, index) => {
            /**
             * Extract back arrow.
             *
             * - Back arrow should tay always in first DOM position
             */
            if (index === breadCrumbs.length - 1) {
                backArrow = /* HTML */ `<li>
                    <a href="${item.url}" class="arrows">
                        <div class="arrow-start"></div>
                        <div class="arrow-end"></div>
                    </a>
                </li>`;
            }

            return /* HTML */ `<li>
                <a class="link" href="${item.url}">${item.title}</a>
            </li> `;
        })
        .join('');

    return `${backArrow}${items}`;
};
