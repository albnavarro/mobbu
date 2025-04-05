import { MobMotionCore } from '@mobMotionCore';

MobMotionCore.setDefault({
    /**
     * Default mq:
     *
     * {
     *     "xSmall": 320,
     *     "small": 360,
     *     "medium": 600,
     *     "tablet": 768,
     *     "desktop": 992,
     *     "large": 1200,
     *     "xLarge": 1400
     * }
     */

    /**
     * Override and add value.
     */
    mq: {
        desktop: 1024,
        myBreakpoint: 2200,
    },

    /**
     * Override default value for scrollTrigger/paralalx.
     */
    defaultMq: {
        value: 'myBreakpoint',
        type: 'min',
    },
});
