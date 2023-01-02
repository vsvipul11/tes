(function() {
    /*

        Copyright The Closure Library Authors.
        SPDX-License-Identifier: Apache-2.0
       */
    'use strict';

    function g(a) {
        var c = 0;
        return function() {
            return c < a.length ? {
                done: !1,
                value: a[c++]
            } : {
                done: !0
            }
        }
    }

    function h(a) {
        var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return c ? c.call(a) : {
            next: g(a)
        }
    }
    var l = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[c] = b.value;
        return a
    };

    function m(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var c = 0; c < a.length; ++c) {
            var b = a[c];
            if (b && b.Math == Math) return b
        }
        throw Error("Cannot find global object");
    }
    var n = m(this);

    function p(a, c) {
        if (c) a: {
            var b = n;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in b)) break a;
                b = b[e]
            }
            a = a[a.length - 1];d = b[a];c = c(d);c != d && null != c && l(b, a, {
                configurable: !0,
                writable: !0,
                value: c
            })
        }
    }
    p("Array.from", function(a) {
        return a ? a : function(c, b, d) {
            b = null != b ? b : function(A) {
                return A
            };
            var e = [],
                f = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
            if ("function" == typeof f) {
                c = f.call(c);
                for (var k = 0; !(f = c.next()).done;) e.push(b.call(d, f.value, k++))
            } else
                for (f = c.length, k = 0; k < f; k++) e.push(b.call(d, c[k], k));
            return e
        }
    });
    p("Array.prototype.fill", function(a) {
        return a ? a : function(c, b, d) {
            var e = this.length || 0;
            0 > b && (b = Math.max(0, e + b));
            if (null == d || d > e) d = e;
            d = Number(d);
            0 > d && (d = Math.max(0, e + d));
            for (b = Number(b || 0); b < d; b++) this[b] = c;
            return this
        }
    });

    function q(a) {
        return a ? a : Array.prototype.fill
    }
    p("Int8Array.prototype.fill", q);
    p("Uint8Array.prototype.fill", q);
    p("Uint8ClampedArray.prototype.fill", q);
    p("Int16Array.prototype.fill", q);
    p("Uint16Array.prototype.fill", q);
    p("Int32Array.prototype.fill", q);
    p("Uint32Array.prototype.fill", q);
    p("Float32Array.prototype.fill", q);
    p("Float64Array.prototype.fill", q);
    var r = this || self;

    function t(a, c) {
        a = a.split(".");
        var b = r;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === c ? b[d] && b[d] !== Object.prototype[d] ? b = b[d] : b = b[d] = {} : b[d] = c
    };

    function u() {
        this.c = this.counter = 0;
        this.a = Array.from({
            length: 10
        }).fill(0)
    }
    u.prototype.create = function(a, c, b) {
        c = b.appendChild(document.createElement("div"));
        c.classList.add("control-panel-entry");
        c.classList.add("control-panel-fps");
        a = c.appendChild(document.createElement("canvas"));
        this.b = c.appendChild(document.createElement("div"));
        this.b.classList.add("fps-text");
        b = c.appendChild(document.createElement("div"));
        b.classList.add("fps-30");
        b.textContent = "30";
        c = c.appendChild(document.createElement("div"));
        c.classList.add("fps-60");
        c.textContent = "60";
        a.width = 100;
        a.height = 100;
        this.f = a.getContext("2d");
        v(this, 0)
    };
    u.prototype.update = function() {};
    u.prototype.tick = function() {
        var a = Math.floor(performance.now() / 1E3);
        1 <= a - this.c && (v(this, this.counter), this.c = a, this.counter = 0);
        ++this.counter
    };

    function v(a, c) {
        a.a.shift();
        a.a.push(c);
        var b = a.f;
        b.fillStyle = "green";
        b.clearRect(0, 0, b.canvas.width, b.canvas.height);
        for (var d = 0; 10 > d; ++d) {
            var e = Math.min(100, Math.max(0, a.a[d]));
            b.fillRect(10 * d + 1, 100 - e + 1, 8, e)
        }
        b.setLineDash([2, 2]);
        b.strokeStyle = "#a0a0a0a0";
        b.lineWidth = 2;
        b.beginPath();
        b.moveTo(0, 30);
        b.lineTo(100, 30);
        b.stroke();
        b.beginPath();
        b.moveTo(0, 60);
        b.lineTo(100, 60);
        b.stroke();
        a.b.textContent = c.toFixed(0) + " fps"
    }

    function w(a) {
        this.a = a
    }
    w.prototype.create = function(a, c, b) {
        a = b.appendChild(document.createElement("div"));
        a.classList.add("control-panel-entry");
        a.classList.add("control-panel-text");
        a.textContent = this.a.title
    };
    w.prototype.update = function() {};

    function x(a) {
        this.b = a
    }
    x.prototype.create = function(a, c, b) {
        var d = this;
        this.f = a;
        this.c = c;
        this.a = b.appendChild(document.createElement("div"));
        this.a.classList.add("control-panel-entry");
        this.a.classList.add("control-panel-toggle");
        this.a.onclick = function() {
            d.c[d.b.field] = !d.c[d.b.field];
            d.f()
        };
        a = this.a.appendChild(document.createElement("span"));
        a.classList.add("label");
        this.value = this.a.appendChild(document.createElement("span"));
        this.value.classList.add("value");
        a.textContent = this.b.title
    };
    x.prototype.update = function() {
        this.c[this.b.field] ? (this.value.textContent = "Yes", this.a.classList.add("yes"), this.a.classList.remove("no")) : (this.value.textContent = "No", this.a.classList.add("no"), this.a.classList.remove("yes"))
    };

    function y(a) {
        this.a = a
    }
    y.prototype.create = function(a, c, b) {
        var d = this;
        this.c = c;
        c = this.a;
        b = b.appendChild(document.createElement("div"));
        b.classList.add("control-panel-entry");
        b.classList.add("control-panel-slider");
        var e = b.appendChild(document.createElement("span"));
        e.classList.add("label");
        (this.b = b.appendChild(document.createElement("span"))).classList.add("callout");
        var f = this.f = b.appendChild(document.createElement("input"));
        f.classList.add("value");
        f.type = "range";
        f.min = "" + c.range[0];
        f.max = "" + c.range[1];
        f.step = void 0 ===
            c.step ? "any" : "" + c.step;
        f.oninput = function() {
            d.b.textContent = f.value
        };
        f.onchange = function() {
            d.c[d.a.field] = Number(f.value);
            a()
        };
        e.textContent = c.title
    };
    y.prototype.update = function() {
        var a = this.c[this.a.field];
        this.f.value = "" + a;
        this.b.textContent = "" + a
    };

    function z(a, c) {
        this.g = a;
        this.f = c;
        this.a = [];
        this.b = this.g.appendChild(document.createElement("div"));
        this.b.classList.add("control-panel")
    }
    z.prototype.add = function(a) {
        var c = this;
        a = h(a);
        for (var b = a.next(); !b.done; b = a.next()) b = b.value, this.a.push(b), b.create(function() {
            B(c)
        }, this.f, this.b);
        B(this);
        return this
    };
    z.prototype.on = function(a) {
        this.c = a;
        B(this);
        return this
    };

    function B(a) {
        for (var c = h(a.a), b = c.next(); !b.done; b = c.next()) b.value.update();
        a.c && a.c(a.f)
    }
    t("ControlPanel", z);
    t("Slider", y);
    t("StaticText", w);
    t("Toggle", x);
    t("FPS", u);
}).call(this);