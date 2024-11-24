export interface Loader {
    state: {
        shouldRemove: boolean;
        position: 'center-viewport' | 'center-component';
    };
}
