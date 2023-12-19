import { getIdByInstanceName, html, setStateById } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';

const data = [
    {
        label: 'about',
        url: 'about',
        section: 'no-section',
    },
    {
        label: 'canvas 2d',
        url: 'canvas_overview',
        section: 'canvas',
    },
    {
        label: 'mobCore',
        url: 'mobCore_overview',
        section: 'mobCore',
    },
    {
        label: 'mobJs',
        url: 'mobJs_overview',
        section: 'mobJs',
    },
    {
        label: 'mobMotion',
        url: 'mobMotion_overview',
        section: 'mobMotion',
    },
    {
        label: 'plugin',
        url: 'plugin_overview',
        section: 'plugin',
    },
];

function buttonHandler({ url }) {
    const pageTransitionId = getIdByInstanceName('page-transition');
    setStateById(pageTransitionId, 'url', url);
}

const getItems = ({ delegateEvents, staticProps }) => {
    return data
        .map(({ label, url, section }) => {
            return html`<li class="footer-nav__item">
                <footer-nav-button
                    ${delegateEvents({
                        click: () => {
                            buttonHandler({ url });
                        },
                    })}
                    ${staticProps({
                        label,
                        section,
                    })}
                ></footer-nav-button>
            </li> `;
        })
        .join('');
};

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const FooterNav = ({ html, delegateEvents, staticProps }) => {
    if (motionCore.mq('max', 'desktop')) return html` <span></span> `;

    return html`
        <ul class="footer-nav">
            ${getItems({ delegateEvents, staticProps })}
        </ul>
    `;
};
