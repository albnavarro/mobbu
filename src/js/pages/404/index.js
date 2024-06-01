import { titleContentDef } from '../../component/common/typography/titles/definition';
import { html, staticProps, useComponent } from '../../mobjs';

useComponent([titleContentDef]);

export const pageNotFound = () => {
    return html`
        <div class="page-not-found">
            <mob-title ${staticProps({ tag: 'h3', color: 'highlight' })}>
                Page not found
            </mob-title>
            <a href="./#home">back to home</a>
        </div>
    `;
};
