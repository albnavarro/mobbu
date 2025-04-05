import { MobJs, html } from '@MobJs';

MobJs.useComponent([Header, Footer]);

export const wrapper = async () => {
    return html`
        <mob-header></mob-header>
        <mob-footer></mob-footer>
    `;
};
