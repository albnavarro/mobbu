interface State {
    active: boolean;
    prevRoute: string;
    nextRoute: string;
    backRoute: string;
    currentLabelId: number;
}

export interface QuickNav {
    state: State;
    ref: {
        previous: HTMLLinkElement;
        back: HTMLLinkElement;
        next: HTMLLinkElement;
        labelList: HTMLElement;
        labels: HTMLElement;
    };
    methods: {
        update: <K extends keyof State>(prop: K, value: State[K]) => void;
    };
}

export type UpdateQuickNavState = (arg0: Partial<State>) => void;
