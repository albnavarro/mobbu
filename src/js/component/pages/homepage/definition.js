import { HomeAnimation } from './homeAnimation';

export const homePageComponentDef = {
    HomeAnimation: {
        componentFunction: HomeAnimation,
        componentParams: {
            props: {
                amountOfPath: 30,
                rx: 100,
                viewBox: 100,
                startColor: '#fff',
                endColor: '#1a1b26',
                multiplier: 2.3,
            },
        },
    },
};
