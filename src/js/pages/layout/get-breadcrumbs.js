import { htmlObject, MobJs } from '@mobJs';

/**
 * @param {{ hash: string; pageName: string; templateName: string }} data
 * @returns {HTMLElement[][]}
 */
export const getBreadCrumbs = (data) => {
    const path = MobJs.getPagePath({ hash: data.hash });

    return [
        MobJs.getPagePath({ hash: data.hash }).map((page, index) => {
            return htmlObject({
                tag: 'li',
                content:
                    index === path.length - 1
                        ? {
                              tag: 'span',
                              content: data.pageName,
                              attributes: { 'aria-current': 'page' },
                          }
                        : {
                              tag: 'a',
                              className: 'link',
                              attributes: { href: `./#${page.hash}` },
                              content: page.name,
                          },
            });
        }),
    ];
};
