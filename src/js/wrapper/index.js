import { instanceName, useSlot } from '../mobjs';

export const wrapper = () => {
    return /* HTML */ `
        <CodeOverlay ${instanceName('codeOverlay')}></CodeOverlay>
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
            <DebugButton ${useSlot('debug')}></DebugButton>
        </div>
        <PageTransition ${instanceName('page-transition')}></PageTransition>
    `;
};
