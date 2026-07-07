import { htmlObject, MobJs } from '@mobJs';

/**
 * @import {
 *   DelegateEvents,
 *   MobComponent
 * } from '@mobJsType'
 * @import {List} from './type'
 */

/**
 * @param {object} params
 * @param {Record<'label' | 'url', string>[] | string[]} params.items
 * @param {boolean} [params.links]
 * @param {DelegateEvents} params.delegateEvents
 * @returns {HTMLElement[]}
 */
const getList = ({ items, links, delegateEvents }) => {
    return links
        ? /** @type{Record<'label' | 'url', string>[]} */ (items).map(
              ({ label, url }) =>
                  htmlObject({
                      tag: 'li',
                      content: {
                          tag: 'button',
                          attributes: { type: 'button', role: 'link' },
                          className: 'list-links',
                          modules: delegateEvents({
                              click: () => {
                                  MobJs.loadUrl({ url });
                              },
                          }),

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
                  content: String(item),
              })
          );
};

/** @type {MobComponent<List>} */
export const ListFunction = ({ getState, delegateEvents }) => {
    const { style, color, items, links } = getState();

    const colorClass = `is-${color}`;
    const linksClass = links ? 'use-links' : 'use-default';

    return htmlObject({
        tag: 'ul',
        className: [`is-${style}`, colorClass, linksClass],
        content: getList({ items, links, delegateEvents }),
    });
};
