import { html } from '@mobJs';

export const pageNotFound = () => {
    return html`
        <div class="error-page">
            <div>
                <h1 class="title title-big">Page not found</h1>
                <a class="link" href="./#home">back to home</a>
            </div>
        </div>
    `;
};
