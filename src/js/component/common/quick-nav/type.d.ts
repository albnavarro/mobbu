export interface QuickNav {
    state: {
        color: 'white' | 'black';
        active: boolean;
        prevRoute: string;
        nextRoute: string;
        backRoute: string;
    };
    methods: {
        update: (prop: string, value: any) => void;
    };
}

export type UpdateQuickNavState = (arg0: {
    active: booleane;
    nextRoute: string;
    prevRoute: string;
    backRoute: string;
    color: 'white' | 'black';
}) => void;
