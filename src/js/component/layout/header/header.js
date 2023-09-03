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
export const Header = ({ render, onMount, staticProps }) => {
    onMount(({ element }) => {
        const navInfo = element.querySelector('.l-header__navinfo');
        const titleLink = element.querySelector('.l-header__title');
        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));

        titleLink.addEventListener('click', () => {
            const pageTransitionId = getIdByInstanceName('page-transition');
            setStateById(pageTransitionId, 'url', '#home');
        });

        return () => {};
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return render(/* HTML */ `
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <HeaderToggle></HeaderToggle>
                    <button type="button" class="l-header__title">title</button>
                    <div class="l-header__utils">
                        <Headernav></Headernav>
                    </div>
                </div>
                <div class="l-header__navinfo">
                    <p class="p--small"></p>
                    <CodeButton
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
                    </CodeButton>
                </div>
            </div>
        </header>
    `);
};
