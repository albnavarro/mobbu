import { core } from '../../../mobbu';

export const createFooter = async () => {
    const component = document.querySelector('[data-component="footer"]');
    if (!component) return;

    const content = await fetch('../partials/layout/footer.html')
        .then((response) => response.text())
        .then((html) => html)
        .catch((err) => console.warn('Something went wrong.', err));

    const footer = document.createElement('footer');
    footer.classList.add('l-footer');
    footer.innerHTML = content;

    core.useFrame(() => {
        component.parentNode.replaceChild(footer, component);
    });
};
