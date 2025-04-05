import { html, MobJs } from '@mobJs';
import { Title } from '../../component/common/typography/titles/definition';

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
