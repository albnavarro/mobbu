import { Title } from '@commonComponent/typography/titles/definition';
import { html, MobJs } from '@mobJs';

MobJs.useComponent([Title]);

export const pageNotFound = () => {
    return html`
        <div class="page-not-found">
            <mob-title ${MobJs.staticProps({ tag: 'h3', color: 'highlight' })}>
                Page not found
            </mob-title>
            <a href="./#home">back to home</a>
        </div>
    `;
};
