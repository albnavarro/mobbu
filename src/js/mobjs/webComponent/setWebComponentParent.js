import { addInvalidateParent } from '../componentStore/action/invalidate';
import { addRepeatParent } from '../componentStore/action/repeat';
import { awaitNextLoop } from '../componentStore/utils';
import { ATTR_INVALIDATE, ATTR_MOBJS_REPEAT } from '../constant';

/**
 * @param {object} params
 * @param {object} params.context
 *
 * @description
 * Add to specific Map parent of host node.
 */
export const setWebComponentInvalidareParent = async ({ context }) => {
    await awaitNextLoop();

    const invalidateId = context.shadowRoot?.host.getAttribute(ATTR_INVALIDATE);
    if (!invalidateId) return;

    const parent = /** @type{HTMLElement} */ (context.parentNode);
    addInvalidateParent({ id: invalidateId, parent });

    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    parent?.removeChild(context);
};

/**
 * @param {object} params
 * @param {object} params.context
 *
 * @description
 * Add to specific Map parent of host node.
 */
export const setWebComponentRepeatParent = async ({ context }) => {
    await awaitNextLoop();

    const invalidateId =
        context.shadowRoot?.host.getAttribute(ATTR_MOBJS_REPEAT);
    if (!invalidateId) return;

    const parent = /** @type{HTMLElement} */ (context.parentNode);
    addRepeatParent({ id: invalidateId, parent });

    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    parent?.removeChild(context);
};
