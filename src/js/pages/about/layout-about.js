import { htmlObject, MobJs } from '@mobJs';
import { AboutSwitcher } from '@pagesComponent/about/switcher/definition';
import { loadJsonContent, loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').PageAsync} */
export const layoutAbout = async () => {
    const { data } = await loadJsonContent({
        source: './data/about/index.json',
    });

    const { data: mobileSvg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=0.9',
    });

    const { data: tabletSvg } = await loadTextContent({
        source: './asset/svg/about.svg?v=0.1',
    });

    return htmlObject({
        tag: 'main',
        content: {
            component: AboutSwitcher,
            modules: MobJs.staticProps(
                /** @type {import('@pagesComponent/about/switcher/type').AboutSwitcher['props']} */
                ({
                    block_1: data.block_1,
                    block_2: data.block_2,
                    block_3: data.block_3,
                    block_4: data.block_4,
                    mobileSvg,
                    tabletSvg,
                })
            ),
        },
    });
};
