export function detectSafari() {
    const userAgentString = navigator.userAgent;
    let safariAgent = userAgentString.includes('Safari');
    const chromeAgent = userAgentString.includes('Chrome');
    if (chromeAgent && safariAgent) safariAgent = false;

    return safariAgent;
}

export function detectFirefox() {
    const userAgentString = navigator.userAgent;
    let firefixAgent = userAgentString.includes('Firefox');
    const chromeAgent = userAgentString.includes('Chrome');
    if (chromeAgent && firefixAgent) firefixAgent = false;

    return firefixAgent;
}
