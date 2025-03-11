import { MobJs, html } from '../../../src/js/mobjs';

MobJs.useComponent([Header, Footer]);

export const wrapper = async () => {
    return html`
        <mob-header></mob-header>
        <mob-footer></mob-footer>
    `;
};
