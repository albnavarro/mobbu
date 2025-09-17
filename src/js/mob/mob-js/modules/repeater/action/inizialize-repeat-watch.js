// @ts-check

import { addRepeatUnsubcribe } from './add-repeat-unsubcribe';
import { watchRepeat } from '../watch';

/**
 * @param {import('../type').WatchList} param
 * @returns {void}
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
    useSync,
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
        useSync,
    });

    addRepeatUnsubcribe({
        repeatId,
        unsubscribe,
    });
};
