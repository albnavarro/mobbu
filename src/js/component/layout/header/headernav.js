import { getCommonData } from '../../../route';
import { navigationStore } from '../navigation/store/navStore';

function additems() {
    const { header } = getCommonData();
    const { links } = header;

    return links
        .map((link) => {
            const { label, url, internal } = link;

            return /* HTML */ ` <li class="l-header__sidenav__item">
                ${!internal
                    ? /* HTML */ `
                          <a href="${url}" class="l-header__sidenav__link">
                              ${label}
                          </a>
                      `
                    : /* HTML */ `
                          <button
                              type="button"
                              data-url="${url}"
                              class="l-header__sidenav__link"
                          >
                              ${label}
                          </button>
                      `}
            </li>`;
        })
        .join('');
}

/**
 * Create component
 */
export const Headernav = ({ render, onMount }) => {
    onMount(({ element }) => {
        const buttons = element.querySelectorAll('button');

        [...buttons].forEach((button) => {
            button.addEventListener('click', () => {
                const { url } = button.dataset;
                window.location.hash = url;
                navigationStore.set('navigationIsOpen', false);
                navigationStore.emit('closeNavigation');
            });
        });
    });

    return render(/* HTML */ `
        <ul class="l-header__sidenav">
            ${additems()}
        </ul>
    `);
};
