// @ts-check

/**
 * @import { MobComponent,  UseMethodByName } from '@mobJsType';
 **/

import { html, MobJs } from '@mobJs';
import { MobSlide } from '@mobMotionPlugin';
import { debugActiveComponentStore } from '../../Store/debug-active-component';
import { generateTreeComponents } from '../recursive-tree';

/**
 * @param {number} value
 */
const getCounter = (value) => {
    return value > 0 ? `( ${value} ) ` : '';
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.value
 * @returns {boolean}
 */
const activeItemChildren = ({ id, value }) => {
    const component = MobJs.componentMap.get(id);
    const children = component?.child;
    if (!children) return false;

    const flatChildren = Object.values(children).flat();
    const hasOccurrence = flatChildren.includes(value);
    if (hasOccurrence) return true;

    return flatChildren.some((id) => activeItemChildren({ id, value }));
};

/** @type{MobComponent<import('./type').DebugTreeItem>} */
export const DebugTreeItemFn = ({
    onMount,
    staticProps,
    getRef,
    setRef,
    delegateEvents,
    watch,
    bindEffect,
    getProxi,
    bindStore,
    computed,
}) => {
    bindStore(debugActiveComponentStore);
    const proxi = getProxi();
    const hasChildrenClass = proxi.children.length > 0 ? 'has-children' : '';

    /**
     * Active state.
     */
    computed('isActive', () => proxi.id === proxi.currentId);

    /**
     * Highlight children if there is an active eitem inside accordion.
     */
    computed('hasActiveChildren', () =>
        activeItemChildren({
            id: proxi.id,
            value: proxi.currentId,
        })
    );

    onMount(() => {
        const { content } = getRef();

        const unsubscribeSlide = MobSlide.subscribe(content);
        MobSlide.reset(content);

        /**
         * Open/Close accordion.
         */
        watch('isOpen', async (isOpen) => {
            const action = isOpen ? 'down' : 'up';
            await MobSlide[action](content);

            /** @type{UseMethodByName<import('../type').DebugTree>} */
            const methods = MobJs.useMethodByName('debug_tree');
            methods?.refresh();
        });

        return () => {
            unsubscribeSlide();
        };
    });

    return html`<div class="c-debug-tree-item">
        <div
            class="c-debug-tree-item__head ${hasChildrenClass}"
            ${delegateEvents({
                click: () => {
                    proxi.isOpen = !proxi.isOpen;
                },
            })}
            ${bindEffect([
                {
                    toggleClass: { open: () => proxi.isOpen },
                },
                {
                    toggleClass: {
                        'has-children-selected': () => proxi.hasActiveChildren,
                    },
                },
            ])}
        >
            <span class="c-debug-tree-item__id">${proxi.id}</span> |
            <span class="c-debug-tree-item__component"
                >${proxi.componentName}</span
            >
            |
            <span class="c-debug-tree-item__instance"
                >${proxi.instanceName}</span
            >
            <span>${getCounter(proxi.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${delegateEvents({
                    click: () => {
                        /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                        const methods =
                            MobJs.useMethodByName('debug_component');
                        methods?.updateId(proxi.id);
                    },
                })}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${bindEffect({
                    toggleClass: { active: () => proxi.isActive },
                })}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${setRef('content')}>
            ${generateTreeComponents({ data: proxi.children, staticProps })}
        </div>
    </div>`;
};
