export interface AnimatedPatternN0 {
    state: {
        title: string;
        nextRoute: string;
        prevRoute: string;
        numberOfRow: number;
        numberOfColumn: number;
        cellWidth: number;
        cellHeight: number;
        gutter: number;
        fill: string;
        stagger: {
            value: {
                each: number;
                grid: {
                    col: number;
                    row: number;
                    direction: string;
                };
            };
            type: string;
        };
        reorder: string;
        disableOffcanvas: boolean;
    };
}
