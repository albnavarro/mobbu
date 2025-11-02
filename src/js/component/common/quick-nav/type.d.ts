interface State {
    color: 'white' | 'black';
    active: boolean;
    prevRoute: string;
    nextRoute: string;
    backRoute: string;
}

export interface QuickNav {
    state: State;
    methods: {
        update: <K extends keyof State>(prop: K, value: State[K]) => void;
    };
}

export type UpdateQuickNavState = (arg0: State) => void;
