import { html } from '@mobJs';

export const pageNotFound = () => {
    return html`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;
};
