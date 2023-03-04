new EventSource('/esbuild').addEventListener('change', () => location.reload());
new EventSource('/esbuild').addEventListener('message', (event) => {
    const { data } = event;
    if (data !== 'update') return;

    location.reload();
});
