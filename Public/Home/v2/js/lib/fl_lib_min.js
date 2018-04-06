//行情深度中用到的类库

/***
 prototype
 ***/
//Number
function splitPoint(n) {
    var i = this.toString().split('.'),
        l;
    if (i.length < 2) {
        i[1] = Math.pow(10, n).toString().substring(1, n + 1);
    } else {
        l = i[1].toString().length;
        i[1] = ((i[1] * 1 / Math.pow(10, l)).toString() + "00000000000000").substring(2, n + 2);
    }
    return i;
};

function cutFixed(n) {
    if (!n) return Math.floor(this);
    return this.splitPoint(n).join('.');
};
BIND(splitPoint, Number);
BIND(cutFixed, Number);
/***
 extend
 ***/
function BIND() {
    var a = [].slice.apply(arguments);
    if (a.length < 2) return;
    return a.shift().apply(a.shift(), a);
};

function b2() {
    var a = [].slice.apply(arguments);
    if (a.length < 2) return;
    return a.shift().apply(a.shift(), a);
};

/***
 domready
 ***/

(function() {
    var isReady = false,
        readyList = [];

    function contentLoaded(fn) {
        var done = false,
            top = true,
            win = window,
            doc = win.document,
            root = doc.documentElement,
            add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
            rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
            pre = doc.addEventListener ? '' : 'on',
            init = function(e) {
                if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
                (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
                if (!done && (done = true)) fn.call(win, e.type || e);
            },
            poll = function() {
                try {
                    root.doScroll('left');
                } catch (e) {
                    setTimeout(poll, 50);
                    return;
                }
                init('poll');
            };
        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try {
                    top = !win.frameElement;
                } catch (e) {}
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    }

    contentLoaded(function() {
        isReady = true;
        fireReadyList();
    });

    function fireReadyList() {
        var i = 0,
            len = readyList.length;
        if (len) {
            for (; readyList[i]; i++) {
                readyList[i]();
            }
        }
    }

    window['domready'] = function(fn) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        if (isReady) {
            fn && fn();
            return;
        }
        readyList.push(fn);
    }
})();

/*** EVENT ***/
Event = {
    add: document.addEventListener ?
        function(o, t, f) {
            o.addEventListener(t, f, false)
        } : function(o, t, f) {
        o.attachEvent('on' + t, f)
    },
    remove: document.removeEventListener ?
        function(o, t, f) {
            o.removeEventListener(t, f, false)
        } : function(o, t, f) {
        o.detachEvent('on' + t, f)
    },
    target: function(e) {
        return e ? e.target : window.event.srcElement;
    },
    delta: function(e) {
        var evt = e || window.event,
            d = evt.wheelDelta / -120 || evt.detail / 3;
        return d;
    },
    stop: function(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
        return 1;
    },
    mouse: function(e) { //get mouse position
        return {
            x: e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
            y: e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
        }
    }
}
;(function() {
    var cache = {};
    this.microTemplate = function microTemplate(str, data) {
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            microTemplate(document.getElementById(str).innerHTML) :
            new Function("data",
                "var p=[];p.push('" +
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'") + "');return p.join('');");
        return data ? fn(data) : fn;
    };
})();