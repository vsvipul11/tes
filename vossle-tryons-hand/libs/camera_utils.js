(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    'use strict';
    var e = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function f(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }
    var h = f(this);

    function k(a, b) {
        if (b) a: {
            var c = h;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var g = a[d];
                if (!(g in c)) break a;
                c = c[g]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && e(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    var l = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var g in d) Object.prototype.hasOwnProperty.call(d, g) && (a[g] = d[g])
        }
        return a
    };
    k("Object.assign", function(a) {
        return a || l
    });
    var m = this || self;
    var n = {
        facingMode: "user",
        width: 640,
        height: 480
    };

    function p(a, b) {
        this.video = a;
        this.a = 0;
        this.b = Object.assign(Object.assign({}, n), b)
    }

    function q(a) {
        window.requestAnimationFrame(function() {
            r(a)
        })
    }

    function t(a, b) {
        a.video.srcObject = b;
        a.video.onloadedmetadata = function() {
            a.video.play();
            q(a)
        }
    }

    function r(a) {
        var b = null;
        a.video.paused || a.video.currentTime === a.a || (a.a = a.video.currentTime, b = a.b.onFrame());
        b ? b.then(function() {
            q(a)
        }) : q(a)
    }
    p.prototype.start = function() {
        var a = this;
        navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        // navigator.mediaDevices && navigator.mediaDevices.getUserMedia || alert("No navigator.mediaDevices.getUserMedia exists.");
        var b = this.b;
        if (navigator.mediaDevices) {
            return navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: b.facingMode,
                    width: b.width,
                    height: b.height
                }
            }).then(function(c) {
                t(a, c)
            }).catch(function(c) {
                console.error("Failed to acquire camera feed: " + c);
                alert("Failed to acquire camera feed: " + c);
                throw c;
            })
        } else {
            navigator.getWebcam({
                video: {
                    facingMode: b.facingMode,
                    width: b.width,
                    height: b.height
                }
            }).then(function(c) {
                t(a, c)
            }).catch(function(c) {
                console.error("Failed to acquire camera feed: " + c);
                alert("Failed to acquire camera feed: " + c);
                throw c;
            })
        }
    };
    p.prototype.stop = function() {
        /// stop all stram connected tyo this video object
        var stream = this.video.srcObject;
        if (stream) {
            stream.getTracks().forEach(function(track) {
                console.log(track);
                track.stop();
            });
        }
    }
    p.prototype.switch = function() {
        if (this.b.facingMode === 'environment') {
            this.b.facingMode = 'user';
        } else {
            this.b.facingMode = 'environment';
        }
        document.getElementById('vid_container').classList.toggle('mirror')
        this.stop();
        this.start();
    }
    var u = ["Camera"],
        v = m;
    u[0] in v || "undefined" == typeof v.execScript || v.execScript("var " + u[0]);
    for (var w; u.length && (w = u.shift());) u.length || void 0 === p ? v[w] && v[w] !== Object.prototype[w] ? v = v[w] : v = v[w] = {} : v[w] = p;
}).call(this);