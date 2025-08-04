interface State extends Readonly<MobJsStore> {
    label: string;
    section: string;
    active: boolean;
}

interface MyComponent {
    state: State;
    methods: {
        myMethod: (arg0: { prop1: number; prop2: number }) => void;
    };
    ref: {
        myRef: HTMLElement;
        myRef2: HTMLElement;
    };
}
