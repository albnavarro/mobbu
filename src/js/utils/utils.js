export function detectSafari() {
    const userAgentString = navigator.userAgent;
    let safariAgent = userAgentString.indexOf('Safari') > -1;
    const chromeAgent = userAgentString.indexOf('Chrome') > -1;
    if (chromeAgent && safariAgent) safariAgent = false;

    return safariAgent;
}
