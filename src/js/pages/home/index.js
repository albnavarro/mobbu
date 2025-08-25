import { html, MobJs } from '@mobJs';
import { HomeComponent } from '@pagesComponent/homepage/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([HomeComponent]);

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms_nord.svg?v=1.3',
    });

    return html`
        <home-component
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/homepage/type').HomeComponent['state']} */
                ({
                    svg,
                })
            )}
        ></home-component>
    `;
};
