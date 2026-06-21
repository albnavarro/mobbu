import { DocContainer } from '@commonComponent/doc-container/definition';
import { DocTitle } from '@commonComponent/doc-title/definition';
import { HtmlContent } from '@commonComponent/html-content/definition';
import { ScrollTo } from '@commonComponent/scroll-to/definition';
import { htmlObject, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { updateLeftSidebarList } from '@commonComponent/left-sidebar/utils';
import { docContainerName, scrollToName } from '@instanceName';
import { ScrollTop } from '@commonComponent/scroll-top/definition';
import { getBreadCrumbs } from './get-breadcrumbs';

/** @type {import('@mobJsType').PageAsync<{}, import('./type').LayoutSidebarAnchor['props']>} */
export const layoutSidebarAnchor = async ({ props, data }) => {
    const { source, title } = props;
    const { data: jsonData } = await loadJsonContent({ source });

    const path = MobJs.getPagePath({ hash: data.hash });
    const tree = MobJs.getPageTreeFromPath({ hash: path[0].hash });
    if (tree) updateLeftSidebarList(tree);

    return htmlObject({
        component: DocContainer,
        instanceName: docContainerName,
        content: [
            {
                component: HtmlContent,
                slotPosition: 'docs',
                modules: MobJs.staticProps(
                    /** @type {Partial<import('@commonComponent/html-content/type').HtmlContent['props']>} */
                    ({
                        data: jsonData.data,
                        useMaxWidth: true,
                        isSection: false,
                    })
                ),
                content: [
                    {
                        tag: 'nav',
                        attributes: {
                            'aria-label': 'breadCrumbs',
                        },
                        content: {
                            tag: 'ul',
                            className: 'c-breadCrumbs',
                            content: getBreadCrumbs(data),
                        },
                    },
                    {
                        component: ScrollTop,
                        slotPosition: 'html-content-bottom',
                    },
                ],
            },
            {
                component: ScrollTo,
                slotPosition: 'section-links',
                instanceName: scrollToName,
            },
            {
                component: DocTitle,
                slotPosition: 'section-title',
                content: title,
            },
        ],
    });
};
