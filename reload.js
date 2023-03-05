export const reload = `(() => {
    new EventSource('/esbuild').addEventListener('change', () =>
        location.reload()
    );
})();`;
