import { getCommonData } from '../../../data';
import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

function additems() {
    const { header } = getCommonData();
    const { links } = header;

    return links
        .map((link) => {
            const { label, url, internal } = link;

            return /* HTML */ ` <li class="l-header__sidenav__item">
                ${internal
                    ? /* HTML */ `
                          <button
                              type="button"
                              data-url="${url}"
                              class="l-header__sidenav__link"
                          >
                              ${label}
                          </button>
                      `
                    : /* HTML */ `
                          <a href="${url}" class="l-header__sidenav__link">
                              ${label}
                          </a>
                      `}
            </li>`;
        })
        .join('');
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const Headernav = ({ render, onMount }) => {
    onMount(({ element }) => {
        const buttons = element.querySelectorAll('button');

        [...buttons].forEach((button) => {
            button.addEventListener('click', () => {
                const { url } = button.dataset;

                const pageTransitionId = getIdByInstanceName('page-transition');
                setStateById(pageTransitionId, 'url', url);

                const { navigationIsOpen } = navigationStore.get();
                if (!navigationIsOpen) return;

                navigationStore.set('navigationIsOpen', false);
                navigationStore.emit('closeNavigation');
            });
        });

        return () => {};
    });

    return render(/* HTML */ `
        <ul class="l-header__sidenav">
            ${additems()}
        </ul>
    `);
};
