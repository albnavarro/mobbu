import { CaterpillarN1 } from './caterpillarN1';

export const caterpillarN1Def = {
    CaterpillarN1: {
        componentFunction: CaterpillarN1,
        componentParams: {
            props: {
                numItems: 20,
                width: 60,
                height: 60,
                fill: [
                    '#2C2A3A',
                    '#282635',
                    '#24222F',
                    '#201F2A',
                    '#1C1B25',
                    '#181720',
                    '#9ece6a',
                    '#100F15',
                    '#0C0B10',
                    '#08080B',
                    '#040405',
                    '#000000',
                ],
                borderColor: '#000',
                opacity: 0.2,
                radius: 100,
                rotationEach: 15,
                centerEach: 5,
                rotationDuration: 5000,
                disableOffcanvas: false,
            },
        },
    },
};
