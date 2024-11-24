export interface ScrollerN0 {
    state: {
        title: string;
        nextRoute: string;
        prevRoute: string;
        numberOfRow: number;
        numberOfColumn: number;
        cellWidth: number;
        cellHeight: number;
        gutter: number;
        fill: number[];
        stagger: {
            value: {
                type: string;
                each: number;
                from: string;
            };
            type: string;
        };
        reorder: boolean;
        disableOffcanvas: boolean;
    };
}
