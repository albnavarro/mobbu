import { DocContainer } from '@commonComponent/doc-container/definition';
import { DocTitle } from '@commonComponent/doc-title/definition';
import { HtmlContent } from '@commonComponent/html-content/definition';
import { htmlObject, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { updateLeftSidebarList } from '@commonComponent/left-sidebar/utils';
import { docContainerName } from '@instanceName';
import { ScrollTop } from '@commonComponent/scroll-top/definition';

/** @type {import('@mobJsType').PageAsync} */
export const layoutSidebarLinks = async ({ props, data }) => {
    const { source, title, leftSidebar } = props;
    const { data: jsonData } = await loadJsonContent({ source });
    updateLeftSidebarList(leftSidebar ?? []);

    /**
     * Create bradcrumbs
     */
    const path = MobJs.getPagePath({ hash: data.hash });

    const breadCrumbsContent = [
        path.map((page, index) => {
            return index === path.length - 1
                ? htmlObject({
                      tag: 'li',
                      content: {
                          tag: 'span',
                          content: data.pageName,
                          attributes: { 'aria-current': 'page' },
                      },
                  })
                : htmlObject({
                      tag: 'li',
                      content: {
                          tag: 'a',
                          className: 'link',
                          attributes: {
                              href: `./#${page.hash}`,
                          },
                          content: page.name,
                      },
                  });
        }),
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
