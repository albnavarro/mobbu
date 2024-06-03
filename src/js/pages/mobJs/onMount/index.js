import { DocContainer } from '../../../component/common/docsContainer/definition';
import { DocTitle } from '../../../component/common/doctitle/definition';
import { DocsTitleSmall } from '../../../component/common/doctitleSmall/definition';
import { HtmlContent } from '../../../component/common/htmlContent/definition';
import { LinksMobJs } from '../../../component/common/linksMobJs/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

useComponent([DocContainer, DocsTitleSmall, DocTitle, HtmlContent, LinksMobJs]);

export const mobJs_onMount = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobJs/onMount.json',
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
            <span>onMount</span></doc-title-small
        >
        <links-mobjs
            ${staticProps({ section: 'mobjs' })}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">onMount</doc-title>
    </doc-container>`;
};
