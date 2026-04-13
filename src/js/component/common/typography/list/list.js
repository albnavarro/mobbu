import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {List} from "./type"
 */

/**
 * @param {object} params
 * @param {Record<'label' | 'url', string>[] | string[]} params.items
 * @param {boolean} [params.links]
 * @returns {string[]}
 */
const getList = ({ items, links }) => {
    return links
        ? /** @type{Record<'label' | 'url', string>[]} */ (items).map(
              ({ label, url }) =>
                  htmlObject({
                      tag: 'li',
                      content: {
                          tag: 'a',
                          attributes: { href: url },
                          className: 'list-links',
                          content: [
                              label,
                              {
                                  className: 'arrow-container',
                                  content: [
                                      {
                                          tag: 'span',
                                          className: 'arrow-start',
                                      },
                                      {
                                          tag: 'span',
                                          className: 'arrow-end',
                                      },
                                  ],
                              },
                          ],
                      },
                  })
          )
        : items.map((item) =>
              htmlObject({
                  tag: 'li',
                  content: `${item}`,
              })
          );
};

/** @type {MobComponent<List>} */
export const ListFn = ({ getState }) => {
    const { style, color, items, links } = getState();

    const colorClass = `is-${color}`;
    const linksClass = links ? 'use-links' : 'use-default';

    return htmlObject({
        tag: 'ul',
        className: ['ul', `ul-${style}`, colorClass, linksClass],
        content: getList({ items, links }),
    });
};
