export interface DebugComponent {
    state: {
        id: string;
    };
    methods: {
        updateId: (id: string) => void;
        refreshId: () => void;
    };
}
