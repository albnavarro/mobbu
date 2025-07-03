interface MyComponentType {
    state: {
        color: 'white' | 'black';
        active: number;
    };
    methods: {
        myMethod: (arg0: { prop1: number; prop2: number }) => void;
    };
    ref: {
        myRef: HTMLElement;
        myRef2: HTMLElement;
    };
}
