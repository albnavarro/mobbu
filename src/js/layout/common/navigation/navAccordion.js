import { slide } from '../../../mobbu/plugin';

let subscribers = [];

function addSubscriber({ items = [] } = {}) {
    return items.map((item, i) => {
        const submenu = item.querySelector('.l-navigation__submenu');
        const button = item.querySelector('.l-navigation__link');

        return {
            id: i,
            button,
            submenu,
            unsubscribe: slide.subscribe(submenu),
            active: false,
        };
    });
}

function initialize() {
    subscribers.forEach(({ submenu }) => slide.reset(submenu));
}

function addHandler() {
    subscribers.forEach(({ id, button, submenu }) => {
        button.addEventListener('click', () => {
            action({ id, submenu, button });
        });
    });
}

function getState({ id = 0 } = {}) {
    const currentItemIndex = subscribers.findIndex(
        ({ id: currentId }) => id === currentId
    );

    return subscribers[currentItemIndex].active;
}

function setState({ id = 0, active = false } = {}) {
    const currentItemIndex = subscribers.findIndex(
        ({ id: currentId }) => id === currentId
    );

    subscribers[currentItemIndex].active = active;
}

function action({
    id = 0,
    submenu = document.createElement('div'),
    button = document.createElement('div'),
} = {}) {
    const active = getState({ id });

    if (active) {
        slide.up(submenu);
        button.classList.remove('active');
        setState({ id, active: false });
    } else {
        slide.down(submenu);
        button.classList.add('active');
        setState({ id, active: true });
    }
}

export const navAccordionCloseAll = () => {
    const activeItems = subscribers.filter(({ active }) => active);
    activeItems.forEach(({ id, submenu, button }) => {
        setState({ id, active: false });
        slide.up(submenu);
        button.classList.remove('active');
    });
};

export const navAccordion = () => {
    const elements = document.querySelectorAll('.has-child');
    subscribers = addSubscriber({ items: [...elements] });
    initialize();
    addHandler();
};
