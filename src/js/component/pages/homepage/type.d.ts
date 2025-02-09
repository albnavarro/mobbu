export interface HomeComponent {
    state: {
        svg: string;
        isMounted: boolean;
    };
    ref: {
        textStagger: HTMLElement;
    };
}
