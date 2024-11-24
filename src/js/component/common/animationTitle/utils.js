// @ts-check

import { setStateByName } from '../../../mobjs';

/**
 * @import { SetStateByName } from '../../../mobjs/type';
 **/

/** @type{import("./type").UpdateAnimationTitle} */
export const updateAnimationTitle = ({
    align = 'left',
    color = 'white',
    title = '',
}) => {
    /** @type {SetStateByName<import('./type').AnimationTitle>} */
    const setMainTitleState = setStateByName('animation_title');
    setMainTitleState('align', align);
    setMainTitleState('title', title);
    setMainTitleState('color', color);
};

export const resetAnimationTitle = () => {
    /** @type {SetStateByName<import('./type').AnimationTitle>} */
    const setMainTitleState = setStateByName('animation_title');
    setMainTitleState('align', '');
    setMainTitleState('title', '');
    setMainTitleState('color', 'white');
};
