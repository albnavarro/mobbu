export interface Navigation {
    state: {
        currentAccordionId: number;
    };
    methods: {
        closeAllAccordion: (arg0?: { fireCallback?: boolean }) => void;
    };
}
