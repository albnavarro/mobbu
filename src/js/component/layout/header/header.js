import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { navigationStore } from '../navigation/store/navStore';

function openInfo({ navInfo }) {
    navInfo.classList.add('open');
}

function closeInfo({ navInfo }) {
    navInfo.classList.remove('open');
}

export const Header = ({ render, onMount }) => {
    onMount(({ element }) => {
        const navInfo = element.querySelector('.l-header__navinfo');
        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));
    });

    return render(/* HTML */ `
        <header class="l-header">
            <CodeOverlay> </CodeOverlay>
            <div class="l-header__container">
                <div class="l-header__grid">
                    <HeaderToggle></HeaderToggle>
                    <div class="l-header__title">
                        <a href="#"> title </a>
                    </div>
                    <div class="l-header__utils">
                        <Headernav></Headernav>
                    </div>
                </div>
                <div class="l-header__navinfo">
                    <p class="p--small"></p>
                    <CodeButton
                        data-props="${createProps({
                            js: '/codeExample/layout/navigation/script.js',
                            scss: '',
                            html: '',
                            style: 'green',
                        })}"
                    >
                    </CodeButton>
                </div>
            </div>
        </header>
    `);
};
