interface State {
    active: boolean;
    prevRoute: string;
    nextRoute: string;
    backRoute: string;
}

export interface QuickNav {
    state: State;
    ref: {
        previous: HTMLLinkElement;
        back: HTMLLinkElement;
        next: HTMLLinkElement;
    };
    methods: {
        update: <K extends keyof State>(prop: K, value: State[K]) => void;
    };
}

export type UpdateQuickNavState = (arg0: Partial<State>) => void;
