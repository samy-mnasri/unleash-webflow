var $enRkb$lodashget = require("lodash.get");
var $enRkb$lodashset = require("lodash.set");
var $enRkb$axios = require("axios");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $4fa0c73a46e81912$export$2e2bcd8739ae039);



const $4fa0c73a46e81912$var$webflawless = {
    data: {
    }
};
$parcel$global.webflawless = $4fa0c73a46e81912$var$webflawless;
window.webflawless = $4fa0c73a46e81912$var$webflawless;
const $4fa0c73a46e81912$var$listeners = {
    saved: {
    }
};
const $4fa0c73a46e81912$var$helpers = {
    getNodesFromSelector: ({ selector: selector , contextNode: contextNode  })=>{
        if (typeof selector === 'string' || selector.type === 'css') return Array.from(document.querySelectorAll(selector));
        else if (selector.type === 'id') return [
            document.getElementById(selector.value)
        ];
        else if (selector.type === 'class') return Array.from(document.getElementsByClassName(selector.value.toLowerCase().replace(/\s/g, '-')));
        else if (selector.type === 'tag') {
            const nodes = [];
            const snapshotTags = document.evaluate(`descendant-or-self::*[contains(text(), "[${'webflawless'}:")]`, contextNode, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            const snapshotAttributes = document.evaluate(`descendant-or-self::*/@*[contains(., "[${'webflawless'}:")]`, contextNode, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for(const index in [
                ...new Array(snapshotTags.snapshotLength)
            ])nodes.push(snapshotTags.snapshotItem(index));
            for(const index1 in [
                ...new Array(snapshotAttributes.snapshotLength)
            ])nodes.push(snapshotAttributes.snapshotItem(index1));
            return nodes;
        }
        return null;
    },
    replaceValueFromNode: ({ node: node , inputs: inputs  })=>{
        if (node.innerText) (node.innerText.match(/\[webflawless:[^\]]+\]/g) || []).map((tag)=>{
            const input = tag.replace('[webflawless:', '').replace(']', '');
            if (input && typeof inputs[input] !== 'undefined') node.innerText = node.innerText.replace(new RegExp(`\\[webflawless:${input}\\]`, 'g'), inputs[input]);
            return null;
        });
        if (node.value) (node.value.match(/\[webflawless:[^\]]+\]/g) || []).map((tag)=>{
            const input = tag.replace('[webflawless:', '').replace(']', '');
            if (input && typeof inputs[input] !== 'undefined') {
                node.value = node.value.replace(new RegExp(`\\[webflawless:${input}\\]`, 'g'), inputs[input]);
                if (node.name === 'webflawless-checked' && inputs[input]) node.ownerElement.checked = true;
                else if (node.name === 'webflawless-src' && inputs[input]) {
                    node.ownerElement.src = inputs[input];
                    node.ownerElement.srcset = inputs[input];
                } else if (node.name === 'webflawless-href' && inputs[input]) node.ownerElement.href = inputs[input];
                else if (node.name === 'webflawless-value' && inputs[input]) node.ownerElement.value = inputs[input];
            }
            return null;
        });
    },
    getInputs: ({ inputs: inputs , map: map  })=>{
        let data;
        if (typeof inputs === 'string' && (inputs.startsWith('data.') || inputs.startsWith('data['))) data = $parcel$interopDefault($enRkb$lodashget)($4fa0c73a46e81912$var$webflawless, inputs);
        else data = JSON.parse(JSON.stringify(inputs));
        if (!Array.isArray(data) && typeof data === 'object') {
            for(const key in data)if (typeof data[key] === 'string' && (data[key].startsWith('data.') || data[key].startsWith('data['))) data[key] = $parcel$interopDefault($enRkb$lodashget)($4fa0c73a46e81912$var$webflawless, data[key]);
        }
        if (map) {
            if (Array.isArray(data)) data = data.map((item)=>{
                const newItem = {
                };
                for(const key in map)newItem[key] = $parcel$interopDefault($enRkb$lodashget)(item, map[key]);
                return newItem;
            });
            else if (typeof data === 'object') for(const key in map)data[key] = $parcel$interopDefault($enRkb$lodashget)(data, map[key]);
        }
        return data;
    },
    insertNodeAfter: ({ newNode: newNode , referenceNode: referenceNode  })=>{
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    request: ({ url: url , method: method , data: data , headers: headers , urlParams: urlParams , saveAs: saveAs , actionOnLoad: actionOnLoad  })=>{
        $parcel$interopDefault($enRkb$axios).request({
            url: url,
            method: method || 'get',
            data: data,
            headers: headers,
            params: urlParams
        }).then(({ data: data  })=>{
            if (saveAs) {
                $4fa0c73a46e81912$var$webflawless.data.saved[saveAs] = data;
                if ($4fa0c73a46e81912$var$listeners.saved[saveAs]) $4fa0c73a46e81912$var$listeners.saved[saveAs].map((action)=>$4fa0c73a46e81912$var$webflawless.action(action)
                );
                if (saveAs === 'local') window.localStorage.setItem('webflawless', JSON.stringify($4fa0c73a46e81912$var$webflawless.data.saved.local));
                else if (saveAs === 'session') window.localStorage.setItem('webflawless', JSON.stringify($4fa0c73a46e81912$var$webflawless.data.saved.session));
            }
            if (actionOnLoad) $4fa0c73a46e81912$var$webflawless.action(actionOnLoad);
        });
    }
};
$4fa0c73a46e81912$var$webflawless.condition = (left, condition, right)=>{
    if (condition === 'equals') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }) === $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    });
    else if (condition === 'does not equal') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }) !== $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    });
    else if (condition === 'exists') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    });
    else if (condition === 'does not exist') return !$4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    });
    else if (condition === 'less than') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }) < $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    });
    else if (condition === 'more than') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }) > $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    });
    else if (condition === 'contains') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }).includes($4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    }));
    else if (condition === 'does not contain') return !$4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }).includes($4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    }));
    else if (condition === 'and') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }) && $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    });
    else if (condition === 'or') return $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: left
    }) || $4fa0c73a46e81912$var$helpers.getInputs({
        inputs: right
    });
};
$4fa0c73a46e81912$var$webflawless.data.url = {
    value: window.location.href,
    href: window.location.href,
    params: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
    pathname: window.location.pathname,
    origin: window.location.origin,
    host: window.location.host,
    hash: window.location.hash
};
$4fa0c73a46e81912$var$webflawless.data.context = {
    item: null,
    input: null
};
$4fa0c73a46e81912$var$webflawless.data.saved = {
    local: window.localStorage.getItem('webflawless') || {
    },
    session: window.sessionStorage.getItem('webflawless') || {
    }
};
$4fa0c73a46e81912$var$webflawless.data.getCookie = (name)=>{
    return document.cookie.split(name + '=')[1] ? decodeURIComponent(document.cookie.split(name + '=')[1].split(';')[0]) : null;
};
$4fa0c73a46e81912$var$webflawless.data.setCookie = ({ name: name , value: value  })=>{
    document.cookie = name + '=' + encodeURIComponent(value);
};
$4fa0c73a46e81912$var$webflawless.action = ({ type: type , selector: selector , trigger: trigger , condition: condition , params: params  })=>{
    console.log({
        type: type,
        selector: selector,
        trigger: trigger,
        condition: condition,
        params: params
    });
    const action = ()=>{
        if (typeof condition === 'undefined' || condition) {
            if (type === 'hide') $4fa0c73a46e81912$var$helpers.getNodesFromSelector({
                selector: selector
            }).map((el)=>{
                el.style.display = 'none';
                return null;
            });
            else if (type === 'request') $4fa0c73a46e81912$var$helpers.request({
                url: params.url,
                method: params.method,
                data: (params.inputs || params.data) && $4fa0c73a46e81912$var$helpers.getInputs({
                    inputs: params.inputs || params.data,
                    map: params.map
                }),
                headers: params.headers && $4fa0c73a46e81912$var$helpers.getInputs({
                    inputs: params.headers
                }),
                urlParams: params.urlParams && $4fa0c73a46e81912$var$helpers.getInputs({
                    inputs: params.urlParams
                }),
                saveAs: params.saveAs,
                actionOnLoad: params.actionOnLoad
            });
            else if (type === 'replaceText') $4fa0c73a46e81912$var$helpers.getNodesFromSelector({
                selector: selector
            }).map((el)=>{
                el.innerText = $4fa0c73a46e81912$var$helpers.getInputs({
                    inputs: params.value
                });
                return null;
            });
            else if (type === 'messageToIframeParent') window.parent.postMessage($4fa0c73a46e81912$var$helpers.getInputs({
                inputs: params.value
            }), '*');
            else if (type === 'save') {
                const value = $4fa0c73a46e81912$var$helpers.getInputs({
                    inputs: params.data,
                    map: params.map
                });
                $parcel$interopDefault($enRkb$lodashset)($4fa0c73a46e81912$var$webflawless, params.as, value);
            } else if (type === 'setUrlParams') {
                if (selector) $4fa0c73a46e81912$var$helpers.getNodesFromSelector({
                    selector: selector
                }).map((node)=>{
                    if (node.href) {
                        const url = new URL(node.href);
                        const inputsData = $4fa0c73a46e81912$var$helpers.getInputs({
                            inputs: params.inputs,
                            map: params.map
                        });
                        for(const key in inputsData)url.searchParams.set(key, inputsData[key]);
                        node.href = url.href;
                    }
                    return null;
                });
                else {
                    const url = new URL(window.location.href);
                    const inputsData = $4fa0c73a46e81912$var$helpers.getInputs({
                        inputs: params.inputs,
                        map: params.map
                    });
                    for(const key in inputsData)url.searchParams.set(key, inputsData[key]);
                    window.history.replaceState(null, null, url);
                }
            } else if (type === 'iterate') {
                const contextNodes = $4fa0c73a46e81912$var$helpers.getNodesFromSelector({
                    selector: selector
                });
                const inputsData = $4fa0c73a46e81912$var$helpers.getInputs({
                    inputs: params.inputs,
                    map: params.map
                });
                contextNodes.map((contextNode)=>{
                    if (contextNode.getAttribute('webflawless-clone')) contextNode.remove();
                    else {
                        inputsData.map((inputsItem, index)=>{
                            const newNode = contextNode.cloneNode(true);
                            newNode.setAttribute('webflawless-index', index);
                            newNode.setAttribute('webflawless-clone', true);
                            newNode.setAttribute('webflawless-data', JSON.stringify(inputsItem));
                            $4fa0c73a46e81912$var$helpers.insertNodeAfter({
                                newNode: newNode,
                                referenceNode: contextNode
                            });
                            const nodes = $4fa0c73a46e81912$var$helpers.getNodesFromSelector({
                                selector: {
                                    type: 'tag'
                                },
                                contextNode: newNode
                            });
                            nodes.map((node)=>$4fa0c73a46e81912$var$helpers.replaceValueFromNode({
                                    node: node,
                                    inputs: inputsItem
                                })
                            );
                            return null;
                        });
                        contextNode.style.display = 'none';
                    }
                    return null;
                });
            }
        }
    };
    const triggerAction = ()=>{
        if (trigger) {
            if (trigger.event === 'saved') {
                if ($4fa0c73a46e81912$var$webflawless.data.saved[trigger.selector]) action();
                if (!$4fa0c73a46e81912$var$listeners.saved[trigger.selector]) $4fa0c73a46e81912$var$listeners.saved[trigger.selector] = [];
                $4fa0c73a46e81912$var$listeners.saved[trigger.selector].push({
                    type: type,
                    selector: selector,
                    condition: condition,
                    params: params
                });
            } else ($4fa0c73a46e81912$var$helpers.getNodesFromSelector({
                selector: trigger.selector
            }) || [
                window
            ]).map((node)=>{
                node.addEventListener(trigger.event, ()=>{
                    $4fa0c73a46e81912$var$webflawless.data.context.input = node.value;
                    const iterateContainer = node.closest('[webflawless-data]');
                    if (iterateContainer) $4fa0c73a46e81912$var$webflawless.data.context.item = JSON.parse(iterateContainer.getAttribute('webflawless-data'));
                    action();
                });
                return null;
            });
        } else action();
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') triggerAction();
    else document.addEventListener('DOMContentLoaded', triggerAction);
};
var $4fa0c73a46e81912$export$2e2bcd8739ae039 = $4fa0c73a46e81912$var$webflawless;


//# sourceMappingURL=main.js.map
