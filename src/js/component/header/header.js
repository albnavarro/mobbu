import { navigationStore } from '../navigation/navStore';

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

    return render(`
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <button type="button" class="l-header__toggle"></button>
                    <div class="l-header__title">
                        <a href="#"> title </a>
                    </div>
                    <div class="l-header__utils">
                        <component
                            data-component="Headernav"
                            data-json="header"
                        ></component>
                    </div>
                </div>
                <div class="l-header__navinfo">
                    <p class="p--small">Drag or Scroll</p>
                    <component
                        data-component="CodeButton"
                        data-js="/js"
                        data-scss="/scss"
                        data-html="/html1"
                        data-style="primary"
                    >
                    </component>
                </div>
            </div>
        </header>
    `);
};
