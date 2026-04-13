import { DocContainer } from '@commonComponent/doc-container/definition';
import { DocTitle } from '@commonComponent/doc-title/definition';
import { DocsTitleSmall } from '@commonComponent/doc-title-small/definition';
import { HtmlContent } from '@commonComponent/html-content/definition';
import { htmlObject, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { getBreadCrumbs } from './utils';
import { updateLeftSidebarList } from '@commonComponent/left-sidebar/utils';

/** @type {import('@mobJsType').PageAsync} */
export const layoutSidebarLinks = async ({ props }) => {
    const { source, title, breadCrumbs, rightSidebar } = props;
    const { data } = await loadJsonContent({ source });
    updateLeftSidebarList(rightSidebar ?? []);

    return htmlObject({
        component: DocContainer,
        content: [
            {
                component: HtmlContent,
                attributes: { slot: 'docs' },
                modules: MobJs.staticProps(
                    /** @type {Partial<import('@commonComponent/html-content/type').HtmlContent['props']>} */
                    ({
                        data: data.data,
                        useMaxWidth: true,
                    })
                ),
            },
            {
                component: DocsTitleSmall,
                attributes: { slot: 'section-title-small' },
                content: [
                    getBreadCrumbs({
                        breadCrumbs,
                    }),
                    {
                        tag: 'span',
                        content: title,
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
