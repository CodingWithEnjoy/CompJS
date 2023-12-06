function processDefineCode(define) {
    let codes = "";
    define.style.display = 'none';
    if (define.getAttribute("src")) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                codes = this.responseText;
                applyDefineCode(define, codes);
            }
        };
        xhr.open("GET", define.getAttribute("src"), true);
        xhr.send();
    } else {
        codes = define.innerHTML;
        applyDefineCode(define, codes);
    }
}

function applyDefineCode(define, codes) {
    codes = codes.replaceAll(/<define[^>]*>[\s\S]*?<\/define>/gi, '');
    let attrs = codes.match(/{{([^}]+)}}/g);
    attrs = attrs ? attrs.map(match => match.slice(2, -2)) : [];

    const elmToSearch = define.parentElement.nodeName === 'DEFINE'
        ? document.querySelectorAll(`${define.parentElement.getAttribute('name')} ${define.getAttribute('name')}`)
        : document.getElementsByTagName(define.getAttribute('name'));

    for (const elm of elmToSearch) {
        let css = elm.getAttribute('style') || "";
        css += css ? ";" : "";
        elm.setAttribute('style', `${css}${define.getAttribute('style')
            .replace(/var\(\s*--([^)]+)\s*\)/g, (match, varName) => {
                const attributeValue = elm.getAttribute(varName);
                return attributeValue ? attributeValue : match;
            })
            .replace('display: none;', '')}`);
        let newCodes = codes.replace('{{html}}', elm.innerHTML);
        for (const attr of attrs) {
            const attrContent = elm.getAttribute(attr.split('=')[0]);
            if (attrContent !== null) {
                newCodes = newCodes.replaceAll(`{{${attr}}}`, attrContent);
            } else {
                if (attr.split('=').length === 2){
                    newCodes = newCodes.replaceAll(`{{${attr}}}`, attr.replace(attr.split('=')[0] + "=", ''));
                }
            }
        }
        elm.innerHTML = newCodes;
    }
}

function observeDocumentChanges() {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode.nodeType === 1 && addedNode.tagName.toLowerCase() === 'define') {
                        processDefineCode(addedNode);
                        addedNode.remove();
                    }
                }
            }
        }
    });

    observer.observe(document.body, {childList: true, subtree: true});
}

document.addEventListener('DOMContentLoaded', () => {
    observeDocumentChanges();
    for (const define of document.getElementsByTagName('define')) {
        processDefineCode(define);
        define.remove();
    }
}, false);
