import { AboutComponent } from '../../component/pages/about/definition';
import { html, staticProps, useComponent } from '../../mobjs';
import { loadJsonContent } from '../../utils/utils';

useComponent([AboutComponent]);

/** @type{import('../../mobjs/type').PageAsync} */
export const layoutAbout = async () => {
    const { data } = await loadJsonContent({
        source: './data/about/index.json',
    });

    return html`<about-component
        ${staticProps(
            /** @type{import('../../component/pages/about/type').About['state']} */
            ({
                block_1: data.block_1,
                block_2: data.block_2,
                block_3: data.block_3,
                block_4: data.block_3,
            })
        )}
    ></about-component> `;
};
