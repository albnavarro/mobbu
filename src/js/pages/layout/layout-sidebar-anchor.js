import { DocContainer } from '@commonComponent/doc-container/definition';
import { DocTitle } from '@commonComponent/doc-title/definition';
import { DocsTitleSmall } from '@commonComponent/doc-title-small/definition';
import { HtmlContent } from '@commonComponent/html-content/definition';
import { ScrollTo } from '@commonComponent/scroll-to/definition';
import { html, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { getBreadCrumbs } from './utils';
import { scrollToName } from 'src/js/component/instance-name';

MobJs.useComponent([
    DocContainer,
    DocsTitleSmall,
    ScrollTo,
    DocTitle,
    HtmlContent,
]);

/** @type {import('@mobJsType').PageAsync<{}, import('./type').LayoutSidebarAnchor['props']>} */
export const layoutSidebarAnchor = async ({ props }) => {
    const { source, title, breadCrumbs, rightSidebar } = props;
    const { data } = await loadJsonContent({ source });

    return html` <doc-container
        ${MobJs.staticProps(
            /** @type {Partial<import('@commonComponent/doc-container/type').DocContainer['state']>} */
            ({
                rightSidebarData: rightSidebar ?? [],
            })
        )}
    >
        <div>
            <html-content
                slot="docs"
                ${MobJs.staticProps(
                    /** @type {Partial<import('@commonComponent/html-content/type').HtmlContent['state']>} */
                    ({
                        data: data.data,
                        useMaxWidth: true,
                    })
                )}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${getBreadCrumbs({
                        breadCrumbs,
                    })}<span>${title}</span>
                </div></doc-title-small
            >
            <scroll-to name="${scrollToName}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${title}</doc-title>
        </div>
    </doc-container>`;
};
