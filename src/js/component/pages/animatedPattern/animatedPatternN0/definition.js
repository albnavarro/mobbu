import { detectFirefox } from '../../../../utils/utils';
import { AnimatedPatternN0 } from './animatedPatternN0';

export const animatedPatternN0Def = {
    AnimatedPatternN0: {
        componentFunction: AnimatedPatternN0,
        componentParams: {
            props: {
                numberOfRow: 10,
                numberOfColumn: 10,
                cellWidth: 50,
                cellHeight: 50,
                gutter: 10,
                fill: '#2c2a3a',
                stroke: '#000',
                disableOffcanvas: detectFirefox() ? true : false,
            },
        },
    },
};
