import { getLegendData } from '../../../data';
import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

function openInfo({ navInfo }) {
    navInfo.classList.add('open');
}

function closeInfo({ navInfo }) {
    navInfo.classList.remove('open');
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const Header = ({ html, onMount, staticProps }) => {
    onMount(({ refs }) => {
        const { navInfo, titleLink } = refs;

        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));

        titleLink.addEventListener('click', () => {
            const pageTransitionId = getIdByInstanceName('page-transition');
            setStateById(pageTransitionId, 'url', '#home');
            navigationStore.set('currentButtonId', '');
            navigationStore.set('navigationIsOpen', false);
            navigationStore.emit('closeNavigation');
        });

        return () => {};
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return html`
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <mob-header-toggle></mob-header-toggle>
                    <button
                        type="button"
                        class="l-header__title"
                        ref="titleLink"
                    >
                        title
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
                <div class="l-header__navinfo" ref="navInfo">
                    <p class="p--small"></p>
                    <code-button
                        ${staticProps({
                            drawers: [
                                {
                                    label: 'description',
                                    source: source.description,
                                },
                                {
                                    label: 'definition',
                                    source: source.definition,
                                },
                                {
                                    label: 'component',
                                    source: source.component,
                                },
                                {
                                    label: 'animation',
                                    source: source.animation,
                                },
                            ],
                            style: 'green',
                        })}
                    >
                    </code-button>
                </div>
            </div>
        </header>
    `;
};
