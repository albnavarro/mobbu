import { getIdByInstanceName, html, setStateById } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';

const data = [
    {
        label: 'home',
        url: 'home',
    },
    {
        label: 'canvas 2d',
        url: 'canvas_overview',
    },
    {
        label: 'plugin',
        url: 'plugin_overview',
    },
    {
        label: 'mobCore',
        url: 'mobCore_overview',
    },
    {
        label: 'mobJs',
        url: 'mobJs_overview',
    },
    {
        label: 'mobMotion',
        url: 'mobMotion_overview',
    },
];

function buttonHandler({ url }) {
    const pageTransitionId = getIdByInstanceName('page-transition');
    setStateById(pageTransitionId, 'url', url);
}

const getItems = ({ delegateEvents }) => {
    return data
        .map(({ label, url }) => {
            return html`<li class="footer-nav__item">
                <button
                    type="button"
                    class="footer-nav__button"
                    ${delegateEvents({
                        click: () => {
                            buttonHandler({ url });
                        },
                    })}
                >
                    ${label}
                </button>
            </li> `;
        })
        .join('');
};

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const FooterNav = ({ html, delegateEvents }) => {
    if (motionCore.mq('max', 'desktop')) return html` <span></span> `;

    return html`
        <ul class="footer-nav">
            ${getItems({ delegateEvents })}
        </ul>
    `;
};
