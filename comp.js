document.addEventListener('DOMContentLoaded', () => {
    for (const define of document.getElementsByTagName('define')) {
        let elmToSearch;
        if (define.parentElement.nodeName === 'DEFINE') {
            elmToSearch = document.querySelectorAll(`${define.parentElement.getAttribute('name')} ${define.getAttribute('name')}`);
        } else {
            elmToSearch = document.getElementsByTagName(define.getAttribute('name'));
        }
        let codes = "";
        define.style.display = 'none';
        if (define.getAttribute("src")) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    codes = this.responseText;
                    processDefineCode();
                }
            };
            xhr.open("GET", define.getAttribute("src"), true);
            xhr.send();
        } else {
            codes = define.innerHTML;
            processDefineCode();
        }
        function processDefineCode() {
            codes = codes.replaceAll(/<define[^>]*>[\s\S]*?<\/define>/gi, '');
            let attrs = codes.match(/{{([^}]+)}}/g);
            attrs = attrs ? attrs.map(match => match.slice(2, -2)) : [];
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
                    }
                }
                elm.innerHTML = newCodes;
            }
        }
    }
    for (const define of document.getElementsByTagName('define')) {
        define.remove();
    }
}, false);
