emitAsync(prop: string): Promise<{ success: boolean }>;


/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, emitAsync }) => {
    onMount(async () => {
        await emitAsync('myState');
        console.log('watcher to myState executed');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
