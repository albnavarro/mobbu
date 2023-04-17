import { navigationStore } from '../navigation/store/navStore';

function addHandler({ button }) {
    // Toggle button
    button.addEventListener('click', () => {
        const { navigationIsOpen } = navigationStore.get('navigationIsOpen');

        if (navigationIsOpen) {
            button.classList.remove('open');
            navigationStore.emit('closeNavigation');
        } else {
            button.classList.add('open');
            navigationStore.emit('openNavigation');
        }

        navigationStore.set('navigationIsOpen', (state) => !state);
    });
}

function openInfo({ navInfo }) {
    navInfo.classList.add('open');
}

function closeInfo({ navInfo }) {
    navInfo.classList.remove('open');
}

export const Header = ({ render, onMount }) => {
    onMount(({ element }) => {
        const toggle = element.querySelector('.l-header__toggle');
        const navInfo = element.querySelector('.l-header__navinfo');
        navigationStore.watch('openNavigation', () => openInfo({ navInfo }));
        navigationStore.watch('closeNavigation', () => closeInfo({ navInfo }));
        addHandler({ button: toggle });
    });

    return render(/* HTML */ `
        <header class="l-header">
            <CodeOverlay> </CodeOverlay>
            <div class="l-header__container">
                <div class="l-header__grid">
                    <button type="button" class="l-header__toggle"></button>
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
                        data-js="/codeExample/layout/navigation/script.js"
                        data-scss=""
                        data-html=""
                        data-style="green"
                    >
                    </CodeButton>
                </div>
            </div>
        </header>
    `);
};
