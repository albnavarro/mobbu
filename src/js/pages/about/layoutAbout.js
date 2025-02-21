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
        ${staticProps({
            title: data.title,
        })}
    ></about-component> `;
};
