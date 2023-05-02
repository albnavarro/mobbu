import { detectFirefox } from '../../../../utils/utils';
import { CaterpillarN1 } from './caterpillarN1';

export const caterpillarN1Def = {
    CaterpillarN1: {
        componentFunction: CaterpillarN1,
        componentParams: {
            props: {
                numItems: 20,
                width: 60,
                height: 60,
                fill: [14],
                opacity: 0.05,
                radius: 100,
                rotationEach: 15,
                centerEach: 5,
                rotationDuration: 5000,
                disableOffcanvas: detectFirefox() ? true : false,
            },
        },
    },
};
