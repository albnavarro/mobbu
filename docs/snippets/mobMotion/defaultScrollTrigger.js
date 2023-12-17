import { motionCore } from '../../../src/js/mobMotion';

motionCore.setDefault({
    scrollTrigger: {
        /**
         * Default lerp config.
         */
        lerpConfig: 0.06,

        /**
         * Marker color.
         */
        markerColor: {
            startEnd: '#cccccc',
            item: '#eeeeee',
        },

        /**
         * Default spring config.
         */
        springConfig: 'gentle',
    },
});
