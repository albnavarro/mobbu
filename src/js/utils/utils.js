export function detectSafari() {
    const userAgentString = navigator.userAgent;
    let safariAgent = userAgentString.indexOf('Safari') > -1;
    const chromeAgent = userAgentString.indexOf('Chrome') > -1;
    if (chromeAgent && safariAgent) safariAgent = false;

    return safariAgent;
}

export function detectFirefox() {
    const userAgentString = navigator.userAgent;
    let firefixAgent = userAgentString.indexOf('Firefox') > -1;
    const chromeAgent = userAgentString.indexOf('Chrome') > -1;
    if (chromeAgent && firefixAgent) firefixAgent = false;

    return firefixAgent;
}
