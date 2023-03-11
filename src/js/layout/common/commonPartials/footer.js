import { core } from '../../../mobbu';

export const createFooter = () => {
    const component = document.querySelector('[data-component="footer"]');
    if (!component) return;

    const content = `
        <div class="l-footer__container">footer</div>
    `;

    const footer = document.createElement('footer');
    footer.classList.add('l-footer');
    footer.innerHTML = content;
    core.useFrame(() => {
        component.parentNode.replaceChild(footer, component);
    });
};
