define([], function () {

    var remoteURL = '@@iframeURL';
    var launcherImgSrc = '@@launchImage';
    var iframe;

    function removeElements(elementName) {
        var elms = document.querySelectorAll(elementName);
        for (var i = 0; i < elms.length; i++) {
            var parent = elms[i].parentNode;
            parent.removeChild(elms[i]);
        }
    }

    function nukePage() {
        removeElements('style');
        removeElements('link');
        removeElements('script');

        document.body.innerHTML = '';
        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.body.removeAttribute('class');
        document.body.removeAttribute('id');
    }

    function buildIframe() {
        var iframe;
        iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.style.border = 'none';
        iframe.style.position = 'absolute';
        iframe.style.left = '0';
        iframe.style.top = '0';
        iframe.src = remoteURL;
        return iframe;
    }

    function buildLaunchPad() {
        var launcher = document.createElement('div');
        launcher.style.width = '100%';
        launcher.style.height = '0';
        launcher.style.position = 'relative';
        launcher.style.paddingBottom = '56.25%';
        launcher.style.cursor = 'pointer';
        launcher.style.backgroundImage = 'url(' + launcherImgSrc  + ')';
        launcher.style.backgroundRepeat = 'no-repeat';
        launcher.style.backgroundSize = 'cover';
        return launcher;
    }

    function goGoExpando() {
        nukePage();
        iframe = buildIframe();
        document.body.appendChild(iframe);
    }

    function boot(el) {
        var launcher = buildLaunchPad();
        launcher.addEventListener('click', goGoExpando, false);
        el.appendChild(launcher);
    }

    return {
        boot: boot
    };
});
