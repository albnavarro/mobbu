import { HomeAnimation } from './homeAnimation';
import { HomeContent } from './homeContent';
import { HomeInteraction } from './homeInteraction';
import { HomeInteractionItem } from './homeInteractionitem';

export const homePageComponentDef = {
    HomeAnimation: {
        componentFunction: HomeAnimation,
        componentParams: {
            props: {
                amountOfPath: 28,
                xScale: 1.8,
                yScale: 1.2,
                rx: 10,
                viewBox: 100,
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
