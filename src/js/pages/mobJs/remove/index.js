import { docsContainerComponentDef } from '../../../component/common/docsContainer/definition';
import { docsTitleComponentDef } from '../../../component/common/doctitle/definition';
import { docsTitleSmallComponentDef } from '../../../component/common/doctitleSmall/definition';
import { htmlContentDef } from '../../../component/common/htmlContent/definition';
import { paramsMobJsDef } from '../../../component/common/linksMobJs/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

useComponent([
    docsContainerComponentDef,
    docsTitleSmallComponentDef,
    docsTitleComponentDef,
    htmlContentDef,
    paramsMobJsDef,
]);

export const mobJs_remove = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobJs/remove.json',
    });

    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>remove</span></doc-title-small
        >
        <links-mobjs
            ${staticProps({ section: 'mobjs' })}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">remove</doc-title>
    </doc-container>`;
};
