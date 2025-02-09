import { HomeComponent } from '../../component/pages/homepage/definition';
import { html, staticProps, useComponent } from '../../mobjs';
import { loadTextContent } from '../../utils/utils';

useComponent([HomeComponent]);

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms.svg?v=1.2',
    });

    return html`
        <home-component
            ${staticProps({
                svg,
            })}
        ></home-component>
    `;
};
