import { docsContainerComponentDef } from '../../../component/common/docsContainer/definition';
import { docsTitleComponentDef } from '../../../component/common/doctitle/definition';
import { docsTitleSmallComponentDef } from '../../../component/common/doctitleSmall/definition';
import { htmlContentDef } from '../../../component/common/htmlContent/definition';
import { scrollToDef } from '../../../component/common/scrollTo/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

useComponent([
    docsContainerComponentDef,
    docsTitleSmallComponentDef,
    scrollToDef,
    docsTitleComponentDef,
    htmlContentDef,
]);

export const mobCore_overview = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobCore/overview.json',
    });

    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small">mobCore </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobCore</doc-title>
    </doc-container>`;
};
