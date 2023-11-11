import githubIcon from '../../../../svg/icon-github.svg';
import { getCommonData } from '../../../data';
import { getIdByInstanceName, html, setStateById } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

const icon = {
    github: githubIcon,
};

const onClick = ({ event }) => {
    const button = event.target;
    console.log(button);
    const { url } = button.dataset;

    const pageTransitionId = getIdByInstanceName('page-transition');
    setStateById(pageTransitionId, 'url', url);

    const { navigationIsOpen } = navigationStore.get();
    if (!navigationIsOpen) return;

    navigationStore.set('navigationIsOpen', false);
    navigationStore.emit('closeNavigation');
};

function additems({ delegateEvents }) {
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
                              ${delegateEvents({
                                  click: (event) => {
                                      console.log('click');
                                      onClick({ event });
                                  },
                              })}
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
export const Headernav = ({ html, delegateEvents }) => {
    return html`
        <ul class="l-header__sidenav">
            ${additems({ delegateEvents })}
        </ul>
    `;
};
