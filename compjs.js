document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < document.getElementsByTagName('define').length; i++) {
        let define = document.getElementsByTagName('define')[i];
        let elmToSearch;
        if (define.parentElement.nodeName === 'DEFINE') {
            elmToSearch = document.querySelectorAll(define.parentElement.getAttribute('name') + " " + define.getAttribute('name'));
        } else {
            elmToSearch = document.getElementsByTagName(define.getAttribute('name'));
        }
        let codes = "";
        define.style.display = 'none';
        if (define.getAttribute("src")) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let codes = this.responseText;
                }
            };
            xhr.open("GET", define.getAttribute("src"), true);
            xhr.send();
        } else {
            codes = define.innerHTML;
        }
        codes = codes.replaceAll(/<define[^>]*>[\s\S]*?<\/define>/gi, '')
        let attrs = codes.match(/{{([^}]+)}}/g);
        if (attrs) {
            attrs = attrs.map(match => match.slice(2, -2));
        }
        if (attrs == null) {
            attrs = [];
        }
        for (let j = 0; j < elmToSearch.length; j++) {
            if (elmToSearch[j].getAttribute('style') !== null) {
                elmToSearch[j].setAttribute('style', elmToSearch[j].getAttribute('style') + define.getAttribute('style').replace(/var\(\s*--([^)]+)\s*\)/g, (match, varName) => {
                    const attributeValue = elmToSearch[j].getAttribute(varName);
                    return attributeValue ? attributeValue : match;
                }).replace('display: none;', ''))
            }
            let newCodes = codes;
            newCodes = newCodes.replace('{{html}}', elmToSearch[j].innerHTML)
            for (let k = 0; k < attrs.length; k++) {
                let attrContent = elmToSearch[j].getAttribute(attrs[k].split('=')[0]);
                if (attrContent !== null) {
                    newCodes = newCodes.replaceAll('{{' + attrs[k] + '}}', attrContent);
                }
            }
            elmToSearch[j].innerHTML = newCodes;
        }
    }
    for (let i = 0; i < document.getElementsByTagName('define').length; i++) {
        let define = document.getElementsByTagName('define')[i];
        if (define.parentElement.nodeName !== 'DEFINE') {
            let elmToSearch = document.querySelectorAll(define.getAttribute('name'));
            for (let j = 0; j < elmToSearch.length; j++) {
                let attrs = elmToSearch[j].innerHTML.match(/{{([^}]+)}}/g);
                if (attrs) {
                    attrs = attrs.map(match => match.slice(2, -2));
                }
                if (attrs == null) {
                    attrs = [];
                }
                let newCodes = elmToSearch[j].innerHTML;
                for (let k = 0; k < attrs.length; k++) {
                    let attrContent = elmToSearch[j].getAttribute(attrs[k].split('=')[0]);
                    if (attrContent !== null) {
                        newCodes = newCodes.replaceAll('{{' + attrs[k] + '}}', attrContent);
                    } else {
                        newCodes = newCodes.replaceAll('{{' + attrs[k] + '}}', attrs[k].split('=').slice(1).join('='));
                    }
                }
                elmToSearch[j].innerHTML = newCodes;
            }
        }
    }
    for (let i = 0; i < document.getElementsByTagName('define').length; i++) {
        document.getElementsByTagName('define')[i].remove();
    }
}, false)
