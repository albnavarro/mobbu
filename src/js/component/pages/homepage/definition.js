import { HomeAnimation } from './homeAnimation';

export const homePageComponentDef = {
    HomeAnimation: {
        componentFunction: HomeAnimation,
        componentParams: {
            props: {
                amountOfPath: 40,
                rx: 10,
                viewBox: 100,
                startColor: '#ccc',
                endColor: '#1a1b26',
            },
        },
    },
};
