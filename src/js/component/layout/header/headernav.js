import githubIcon from '../../../../svg/github.svg';
import { getCommonData } from '../../../data';
import { getIdByInstanceName, html, setStateById } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

const icon = {
    github: githubIcon,
};

function additems() {
    const { header } = getCommonData();
    const { links } = header;

    return links
        .map((link) => {
            const { svg, url, internal } = link;

            return html`<li class="l-header__sidenav__item">
                ${internal
                    ? html`
                          <button
                              type="button"
                              data-url="${url}"
                              class="l-header__sidenav__link"
                              ref="button"
                          >
                              ${icon[svg]}
                          </button>
                      `
                    : html`
                          <a
                              href="${url}"
                              target="_blank"
                              class="l-header__sidenav__link"
                          >
                              ${icon[svg]}
                          </a>
                      `}
            </li>`;
        })
        .join('');
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const Headernav = ({ html, onMount }) => {
    onMount(({ refs }) => {
        const { button } = refs;
        const buttons = button?.length ?? [button];

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

    return html`
        <ul class="l-header__sidenav">
            ${additems()}
        </ul>
    `;
};
