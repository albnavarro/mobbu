import { Legend } from './legend';

export const legendComponentDef = {
    Legend: {
        componentFunction: Legend,
        componentParams: {
            props: {
                title: '',
                description: '',
                type: '',
                source: '',
            },
        },
    },
};
