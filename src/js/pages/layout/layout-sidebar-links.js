import { DocContainer } from '@commonComponent/doc-container/definition';
import { DocTitle } from '@commonComponent/doc-title/definition';
import { HtmlContent } from '@commonComponent/html-content/definition';
import { htmlObject, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { getBreadCrumbs } from './utils';
import { updateLeftSidebarList } from '@commonComponent/left-sidebar/utils';
import { docContainerName } from '@instanceName';
import { ScrollTop } from '@commonComponent/scroll-top/definition';

/** @type {import('@mobJsType').PageAsync} */
export const layoutSidebarLinks = async ({ props }) => {
    const { source, title, breadCrumbs, leftSidebar } = props;
    const { data } = await loadJsonContent({ source });
    updateLeftSidebarList(leftSidebar ?? []);

    const breadCrumbsContent = [
        getBreadCrumbs({
            breadCrumbs,
        }),
        {
            tag: 'li',
            content: {
                tag: 'span',
                content: title,
                attributes: { 'aria-current': 'page' },
            },
        },
    ];

    return htmlObject({
        component: DocContainer,
        attributes: { name: docContainerName },
        content: [
            {
                component: HtmlContent,
                attributes: { slot: 'docs' },
                modules: MobJs.staticProps(
                    /** @type {Partial<import('@commonComponent/html-content/type').HtmlContent['props']>} */
                    ({
                        data: data.data,
                        useMaxWidth: true,
                        isSection: false,
                    })
                ),
                content: [
                    {
                        tag: 'nav',
                        attributes: {
                            'aria-label': 'breadCrumbs',
                            slot: 'html-content-top',
                        },
                        content: {
                            tag: 'ul',
                            className: 'c-breadCrumbs',
                            content: breadCrumbsContent,
                        },
                    },
                    {
                        component: ScrollTop,
                        attributes: {
                            slot: 'html-content-bottom',
                        },
                    },
                ],
            },
            {
                component: DocTitle,
                attributes: { slot: 'section-title' },
                content: title,
            },
        ],
    });
};
