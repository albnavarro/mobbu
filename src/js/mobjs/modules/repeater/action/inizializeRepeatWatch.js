// @ts-check

import { addRepeatUnsubcribe } from '../action/addRepeatUnsubcribe';
import { watchRepeat } from '../watch';

/**
 * @param {import('../type').watchListType} param
 * @return {void}
 */

export const inizializeRepeatWatch = ({
    repeatId,
    persistent,
    state,
    setState,
    emit,
    watch,
    clean,
    beforeUpdate,
    afterUpdate,
    key,
    id,
    render,
}) => {
    /**
     * Update component
     */
    const unsubscribe = watchRepeat({
        state,
        setState,
        persistent,
        emit,
        watch,
        clean,
        beforeUpdate,
        afterUpdate,
        key,
        id,
        repeatId,
        render,
    });

    addRepeatUnsubcribe({
        id,
        repeatId,
        unsubscribe,
    });
};
