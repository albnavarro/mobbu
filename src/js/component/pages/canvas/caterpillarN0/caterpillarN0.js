//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { CaterpillarN0 } from './type';
 * @import { SetStateByName } from '../../../../mobjs/type';
 * @import { QuickNav } from '../../../common/nextPage/type';
 * @import { AnimationTitle } from '../../../common/animationTitle/type';
 * @import { CodeButton } from '../../../common/codeButton/type';]
 **/

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { caterpillarN0Animation } from './animation/animation';

/** @type {MobComponent<CaterpillarN0>} */
export const CaterpillarN0Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef,
}) => {
    document.body.style.background = '#000000';

    /** @type {SetStateByName<QuickNav>} */
    const setQuickNavState = setStateByName('quick_nav');

    /** @type {SetStateByName<AnimationTitle>} */
    const setMainTitleState = setStateByName('animation_title');

    /** @type {SetStateByName<CodeButton>} */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(() => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas } = getRef();

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState('nextRoute', '#caterpillarN1');
        setQuickNavState('color', 'white');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', 'Caterpillar N0');

        /**
         * Code button
         */
        const { caterpillarN0 } = getLegendData();
        const { source } = caterpillarN0;
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

        /**
         * Animation.
         */
        const destroyAnimation = caterpillarN0Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            destroyAnimation();
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
            setCodeButtonState('drawers', []);
            document.body.style.background = '';
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped c-canvas__wrap--border"
                    ${setRef('wrap')}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
