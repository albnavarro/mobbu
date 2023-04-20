import { HomeAnimation } from './homeAnimation';
import { HomeContent } from './homeContent';
import { HomeInteraction } from './homeInteraction';
import { HomeInteractionItem } from './homeInteractionitem';

export const homePageComponentDef = {
    HomeAnimation: {
        componentFunction: HomeAnimation,
        componentParams: {
            props: {
                amountOfPath: 10,
                viewBox: 100,
                rx: 30,
                fill: '#ffffff',
                stroke: '#ccc',
                xScale: 5,
                yScale: 4,
                xOffset: 20,
                yOffset: 50,
                xOrigin: 3,
                yOrigin: 10,
                opacity: 0.2,
                duration: 10000,
            },
        },
    },
    HomeInteraction: {
        componentFunction: HomeInteraction,
        componentParams: {
            props: {
                amountOfPath: 20,
            },
        },
    },
    HomeInteractionItem: {
        componentFunction: HomeInteractionItem,
        componentParams: {
            props: {
                index: 1,
            },
        },
    },
    HomeContent: {
        componentFunction: HomeContent,
        componentParams: {
            props: {},
        },
    },
};
