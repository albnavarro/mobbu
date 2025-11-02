interface MyComponent {
    props: {
        active: boolean;
    };
    state: {
        color: string;
    };
    methods: {
        myMethod: (arg0: { prop1: number; prop2: number }) => void;
    };
    ref: {
        myRef: HTMLElement;
        myRef2: HTMLElement;
    };
}
