// @ts-check

import { removeOrphansBindEvent } from '../../../modules/bind-events';
import { removeOrphansBindProps } from '../../../modules/bind-props';
import { removeOrphansPropsFromParent } from '../../../modules/static-props';

/**
 * @returns { void }
 *
 * @description
 * Remove orphan omponent from store.
 * Secure check.
 */

export const removeOrphanTempIds = () => {
    /**
     * Remove props reference.
     * Async loading and interrupt can leave rubbish.
     */
    removeOrphansPropsFromParent();
    removeOrphansBindEvent();
    removeOrphansBindProps();
};
