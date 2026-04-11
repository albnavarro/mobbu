import { fromObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {MatrioskaItem} from "./type"
 */

/** @type {MobComponent<MatrioskaItem>} */
export const MatrioskaItemFn = ({
    getProxi,
    bindText,
    id,
    bindEffect,
    addMethod,
}) => {
    const proxi = getProxi();

    addMethod('toggleActive', () => {
        proxi.active = !proxi.active;
    });

    return fromObject({
        tag: 'matrioska-item',
        className: 'c-matrioska-item',
        modules: bindEffect({
            toggleClass: { active: () => proxi.active },
        }),
        content: [
            {
                className: 'info',
                content: [
                    {
                        tag: 'h4',
                        className: 'item-level',
                        content: proxi.level,
                    },
                    {
                        tag: 'h6',
                        className: 'key',
                        content: bindText`key: <span>${'key'}</span>`,
                    },
                    {
                        tag: 'h6',
                        className: 'key',
                        content: bindText`index: <span>${'index'}</span>`,
                    },
                    {
                        tag: 'h6',
                        className: 'value',
                        content: bindText`Value: <span>${'value'}</span>`,
                    },
                    {
                        tag: 'h6',
                        className: 'value',
                        content: bindText`counter: <span>${'counter'}</span>`,
                    },
                    {
                        tag: 'h6',
                        className: 'value',
                        content: `Component id: <span>${id}</span>`,
                    },
                ],
            },
            {
                className: 'child',
                content: {
                    tag: 'mobjs-slot',
                },
            },
        ],
    });
};
