import { createComponent } from '../../baseComponent/componentCreate';

async function additems({ props }) {
    const { json } = props;
    const { links } = await fetch(`../data/${json}.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

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
export const Headernav = async (component) => {
    const { element, getProps, render, onMount } = createComponent({
        component,
        className: 'l-header__sidenav',
        type: 'ul',
    });

    onMount(() => {
        const innerList = element.querySelectorAll('li');
        console.log(innerList);
    });

    const content = await additems({ props: getProps() });
    return render(content);
};
