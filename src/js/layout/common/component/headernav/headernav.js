import { createComponent } from '../../baseComponent/componentCreate';

async function additems({ element, props }) {
    const { json } = props;
    const { links } = await fetch(`../data/${json}.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    const items = links
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

    element.insertAdjacentHTML('afterbegin', items);
}

/**
 * Create component
 */
export const createHeaderNav = ({ component = null }) => {
    if (!component) return;

    const { element, getProps } = createComponent({
        component,
        className: 'l-header__sidenav',
        type: 'ul',
    });

    additems({ element, props: getProps() });
};
