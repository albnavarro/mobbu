import { html, MobJs } from '@mobJs';
import { AboutComponent } from '@pagesComponent/about/definition';
import { loadJsonContent, loadTextContent } from '../../utils/utils';

MobJs.useComponent([AboutComponent]);

/** @type{import('@mobJsType').PageAsync} */
export const layoutAbout = async () => {
    const { data } = await loadJsonContent({
        source: './data/about/index.json',
    });

    const { data: aboutSvg } = await loadTextContent({
        source: './asset/svg/about.svg?v=0.1',
    });

    return html`<about-component
        ${MobJs.staticProps(
            /** @type{import('../../component/pages/about/type').About['state']} */
            ({
                block_1: data.block_1,
                block_2: data.block_2,
                block_3: data.block_3,
                block_4: data.block_4,
                aboutSvg,
            })
        )}
    ></about-component> `;
};
