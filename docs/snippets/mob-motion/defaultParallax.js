import { MobMotionCore } from '@mobMotionCore';

MobMotionCore.setDefault({
    parallax: {
        /**
         * Default range value is 8.
         */
        defaultRange: 8,

        /**
         * Default spring config.
         */
        springConfig: 'gentle',

        /**
         * Default lerp config.
         */
        lerpConfig: 0.06,
    },
});
