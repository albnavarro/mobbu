import { MobJs } from '@mobJs';
import { scrollToName } from '../../instance-name';

/**
 * @param {import('../scroll-to/type').ScrollToItemsToAdd} arg0
 */
export const addItemToScrollSideBar = ({
    id,
    label,
    element,
    isSection,
    isNote,
}) => {
    /** @type {import('@mobJsType').UseMethodByName<import('../scroll-to/type').ScrollTo>} */
    const methods = MobJs.useMethodByName(scrollToName);
    methods?.addItem?.({ id, label, element, isSection, isNote });
};

/**
 * @param {String} label
 */
export const setScrollToActiveLabel = (label) => {
    /** @type {import('@mobJsType').UseMethodByName<import('../scroll-to/type').ScrollTo>} */
    const methods = MobJs.useMethodByName(scrollToName);
    methods?.setActiveLabel?.(label);
};
