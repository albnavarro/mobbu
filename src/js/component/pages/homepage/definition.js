import { HomeContent } from './homeContent';
import { CaterpillarSvg } from './caterpillarSvg';
import { CaterpillarSvgInteraction } from './caterpillarSvgInteraction';
import { CaterpillarSvgInteractionItem } from './caterpillarSvgInteractionItem';

export const homePageComponentDef = {
    CaterpillarSvg: {
        componentFunction: CaterpillarSvg,
        componentParams: {
            props: {
                amountOfPath: 11,
                viewBox: 100,
                rx: 0,
                fill: '#ffffff',
                stroke: '#555',
                xScale: 5,
                yScale: 4,
                xOffset: 20,
                yOffset: 50,
                xOrigin: 3,
                yOrigin: 10,
                opacity: 0.5,
                duration: 10000,
            },
        },
    },
    CaterpillarSvgInteraction: {
        componentFunction: CaterpillarSvgInteraction,
        componentParams: {
            props: {
                amountOfPath: 20,
            },
        },
    },
    CaterpillarSvgInteractionItem: {
        componentFunction: CaterpillarSvgInteractionItem,
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
