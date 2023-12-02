import { html } from '../mobjs';

export const wrapper = () => {
    return html`
        <my-header></my-header>
        <main class="main">
            <div id="content"></div>
        </main>
        <my-footer></my-footer>
    `;
};
