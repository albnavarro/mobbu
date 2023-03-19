import { getCommonData } from '../../route';

function additems() {
    const { header } = getCommonData();
    const { links } = header;

    return links
        .map((link) => {
            const { label, url } = link;
            return `
                <li class="l-header__sidenav__item">
                    <a href="${url}" class="l-header__sidenav__link">
                        ${label}
                    </a>
                </li>
            `;
        })
        .join('');
}

/**
 * Create component
 */
export const Headernav = ({ render }) => {
    return render(`
        <ul class="l-header__sidenav">
            ${additems()}
        </ul>
    `);
};
