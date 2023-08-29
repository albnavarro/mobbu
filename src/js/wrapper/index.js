export const wrapper = () => {
    return /* HTML */ `
        <CodeOverlay data-instancename="codeOverlay"></CodeOverlay>
        <div data-component="Header"></div>
        <NavigationContainer></NavigationContainer>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <div data-component="Footer">
            <DebugButton data-slotposition="debug"> </DebugButton>
        </div>
        <PageTransition data-instancename="page-transition"></PageTransition>
    `;
};
