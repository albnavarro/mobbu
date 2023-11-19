import { getLegendData } from '../../../data';
import { mobCore } from '../../../mobCore';
import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

function openInfo({ navInfo }) {
    mobCore.useFrame(() => {
        navInfo.classList.add('open');
    });
}

function closeInfo({ navInfo }) {
    mobCore.useFrame(() => {
        navInfo.classList.remove('open');
    });
}

function titleHandler() {
    const pageTransitionId = getIdByInstanceName('page-transition');
    setStateById(pageTransitionId, 'url', '#home');
    navigationStore.set('navigationIsOpen', false);
    navigationStore.emit('closeNavigation');
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const Header = ({ html, onMount, staticProps, delegateEvents }) => {
    onMount(({ refs }) => {
        const { navInfo } = refs;

        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));

        return () => {};
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return html`
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ref="titleLink"
                        ${delegateEvents({
                            click: () => {
                                titleHandler();
                            },
                        })}
                    >
                        <div class="l-header__title-container">
                            <h2 class="l-header__title">
                                <span>Mob</span>Project
                            </h2>
                        </div>
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
