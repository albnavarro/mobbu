import { html } from '../../mobjs';

export const home = {
    before: () => {},
    after: () => {
        return html`<div class="l-index">
            <home-component></home-component>
        </div>`;
    },
};
