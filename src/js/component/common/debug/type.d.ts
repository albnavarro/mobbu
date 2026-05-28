export interface DebugOverlayCta {
    props: {
        ariaControls: string;
    };
    state: {
        expanded: boolean;
    };
    methods: {
        setFocus: () => void;
        setExpanded: (value: boolean) => void;
    };
}
