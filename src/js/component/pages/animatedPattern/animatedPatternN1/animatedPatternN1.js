//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { AnimatedPatternN1 } from './type';
 * @import { SetStateByName } from '../../../../mobjs/type';
 * @import { QuickNav } from '../../../common/nextPage/type';
 * @import { AnimationTitle } from '../../../common/animationTitle/type';
 * @import { CodeButton } from '../../../common/codeButton/type';]
 **/

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import {
    hideFooterShape,
    showFooterShape,
} from '../../../common/shapes/shapUtils';
import { animatedPatternN1Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN1>} */
export const AnimatedPatternN1Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef,
}) => {
    document.body.style.background = '#000000';

    onMount(() => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas } = getRef();

        /** @type {SetStateByName<QuickNav>} */
        const setQuickNavState = setStateByName('quick_nav');

        /** @type {SetStateByName<AnimationTitle>} */
        const setMainTitleState = setStateByName('animation_title');

        /** @type {SetStateByName<CodeButton>} */
        const setCodeButtonState = setStateByName('global-code-button');

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState(
            'prevRoute',
            '#animatedPatternN0?version=3&activeId=3'
        );
        setQuickNavState('nextRoute', '#scrollerN0?version=0&activeId=0');
        setQuickNavState('color', 'white');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', 'Animated pattern N1');

        // Footer shape
        hideFooterShape();

        /**
         * Code button
         */
        const { animatedPatternN1 } = getLegendData();
        const { source } = animatedPatternN1;
        setCodeButtonState('drawers', [
            {
                label: 'description',
                source: source.description,
            },
            {
                label: 'definition',
                source: source.definition,
            },
            {
                label: 'component',
                source: source.component,
            },
            {
                label: 'animation',
                source: source.animation,
            },
        ]);
        setCodeButtonState('color', 'white');

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
            setCodeButtonState('drawers', []);
            document.body.style.background = '';
            destroyAnimation();
            showFooterShape();
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef('wrap')}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
