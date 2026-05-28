export interface SearchOverlayCta {
    state: {
        expanded: boolean;
    };
    methods: {
        setFocus: () => void;
        setExpanded: (value: boolean) => void;
    };
}
