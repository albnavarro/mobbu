// @ts-check

import { removeOrphansBindEvent } from '../../../modules/bindEvents';
import { removeOrphansBindProps } from '../../../modules/bindProps';
import { removeOrphansPropsFromParent } from '../../../modules/staticProps';

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
