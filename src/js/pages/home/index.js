import { html, MobJs } from '@mobJs';
import { HomeComponent } from '@pagesComponent/homepage/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([HomeComponent]);

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms.svg?v=1.2',
    });

    return html`
        <home-component
            ${MobJs.staticProps({
                svg,
            })}
        ></home-component>
    `;
};
