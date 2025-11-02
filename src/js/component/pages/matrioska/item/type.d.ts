export interface MatrioskaItem {
    props: {
        level: string;
        key: string;
        value: string;
        index: number;
        counter: number;
    };
    state: {
        active: boolean;
    };
    methods: {
        toggleActive: () => void;
    };
}
