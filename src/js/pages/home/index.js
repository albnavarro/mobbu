import { html, MobJs } from '@mobJs';
import { HomeComponent } from '@pagesComponent/homepage/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([HomeComponent]);

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms_nord.svg?v=1.3',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    return html`
        <div>
            <div class="background-shape">${bg}</div>
            <home-component
                ${MobJs.staticProps(
                    /** @type {import('@pagesComponent/homepage/type').HomeComponent['props']} */
                    ({
                        svg,
                    })
                )}
            ></home-component>
        </div>
    `;
};
