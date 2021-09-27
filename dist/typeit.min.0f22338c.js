// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/typeit.min.js":[function(require,module,exports) {
/**
    ___    __    _____ _  __
   /   |  / /   / ____/ |/ /
  / /| | / /   / __/  |   /
 / ___ |/ /___/ /___ /   |
/_/  |_/_____/_____//_/|_|
    ___ __ ___   _____ ___    ____  _____ __  ____  __ ___
   /  |/  /   | / ____/   |  / __ \/_  __/ / / / / / / __ \
  / /|_/ / /| |/ /   / /| | / /_/ / / / / /_/ / / / / /_/ /
 / /  / / ___ / /___/ ___ |/ __ _/ / / / __  / /_/ / __ _/
/_/  /_/_/  |_\____/_/  |_/_/ |_| /_/ /_/ /_/\____/_/ |_|

Alex MacArthur, a web developer in Nashville, created this plugin.

Like it? Head to http://macarthur.me/typeit for more information.

Github: https://github.com/alexmacarthur
Twitter: amacarthur
Email: alex@macarthur.me

**/
!function (t, e) {
  "use strict";

  var i = t(document);
  t.fn.typeIt = function (i) {
    return this.each(function () {
      var s = t(this),
          h = s.data("typeit");
      h !== e && (clearTimeout(h.tTO), clearTimeout(h.dTO), s.removeData("typeit")), s.data("typeit", new t.typeIt(s, i));
    });
  }, t.typeIt = function (i, s) {
    this.d = {
      strings: [],
      speed: 100,
      deleteSpeed: e,
      lifeLike: !0,
      cursor: !0,
      cursorSpeed: 1e3,
      breakLines: !0,
      breakDelay: 750,
      deleteDelay: 750,
      startDelay: 250,
      startDelete: !1,
      loop: !1,
      loopDelay: 750,
      html: !0,
      autoStart: !0,
      callback: function callback() {}
    }, this.queue = [], this.queueIndex = 0, this.hasStarted = !1, this.inTag = !1, this.stringsToDelete = "", this.style = 'style="display:inline;position:relative;font:inherit;color:inherit;"', this.s = t.extend({}, this.d, s), this.el = i, this._init();
  }, t.typeIt.prototype = {
    _init: function _init() {
      this.el.find(".ti-container, .ti-cursor, .ti-placeholder").remove(), this._elCheck(), this.s.strings = this._toArray(this.s.strings), this.el.html('<i class="ti-placeholder" style="display:inline-block;width:0;line-height:0;overflow:hidden;">.</i><span ' + this.style + ' class="ti-container"></span>'), this.tel = this.el.find("span"), this.insert = function (t) {
        this.tel.append(t);
      }, this.s.startDelete && (this.tel.html(this.stringsToDelete), this.queue.push([this["delete"]])), this._generateQueue(), this._kickoff();
    },
    _kickoff: function _kickoff() {
      this._cursor(), this.s.autoStart ? this._startQueue() : this._isVisible() ? (this.hasStarted = !0, this._startQueue()) : i.on("scroll", function () {
        this._isVisible() && !this.hasStarted && (this.hasStarted = !0, this._startQueue());
      }.bind(this));
    },
    _generateQueue: function _generateQueue() {
      for (var t = 0; t < this.s.strings.length; t++) {
        if (this.queue.push([this.type, this.s.strings[t]]), t < this.s.strings.length - 1) {
          var e = this.queue.length,
              i = this.s.breakLines ? this.s.breakDelay : this.s.deleteDelay;
          this.queue.push([this.s.breakLines ? this["break"] : this["delete"]]), this.queue.splice(e, 0, [this.pause, i / 2]), this.queue.splice(e + 2, 0, [this.pause, i / 2]);
        }
      }
    },
    _startQueue: function _startQueue() {
      this._to(function () {
        this._executeQueue();
      }.bind(this), this.s.startDelay);
    },
    type: function type(t, e) {
      e = "undefined" == typeof e || e, t = this._toArray(t), e && (t = this._rake(t), t = t[0]), this.tTO = setTimeout(function () {
        if (this._setPace(this), this.s.html && t[0].indexOf("<") !== -1 && t[0].indexOf("</") === -1 && !this.inTag) {
          for (var e = t.length - 1; e >= 0; e--) {
            t[e].indexOf("</") !== -1 && (this.tagCount = 1, this.tagDuration = e);
          }

          this._makeNode(t[0]);
        } else this._print(t[0]);

        t.splice(0, 1), t.length ? this.type(t, !1) : this._executeQueue();
      }.bind(this), this.typePace);
    },
    pause: function pause(t) {
      t = t === e ? this.s.breakDelay : t, this._to(function () {
        this._executeQueue();
      }.bind(this), t);
    },
    "break": function _break() {
      this.insert("<br>"), this._executeQueue();
    },
    mergeSet: function mergeSet(e) {
      this.s = t.extend({}, this.s, e), this._executeQueue();
    },
    _print: function _print(e) {
      this.inTag ? (t(this.tag, this.el).last().append(e), this.tagCount < this.tagDuration ? this.tagCount++ : this.inTag = !1) : this.insert(e);
    },
    empty: function empty() {
      this.tel.html(""), this._executeQueue();
    },
    "delete": function _delete(t) {
      this.deleteTimeout = setTimeout(function () {
        this._setPace();

        for (var i = this.tel.html().split(""), s = t === e || null === t ? i.length - 1 : t + 1, h = i.length - 1; h > -1; h--) {
          if (">" !== i[h] && ";" !== i[h] || !this.s.html) {
            i.pop();
            break;
          }

          for (var n = h; n > -1; n--) {
            if ("<br>" === i.slice(n - 3, n + 1).join("")) {
              i.splice(n - 3, 4);
              break;
            }

            if ("&" === i[n]) {
              i.splice(n, h - n + 1);
              break;
            }

            if ("<" === i[n] && ">" !== i[n - 1]) {
              if (";" === i[n - 1]) for (var r = n - 1; r > -1; r--) {
                if ("&" === i[r]) {
                  i.splice(r, n - r);
                  break;
                }
              }
              i.splice(n - 1, 1);
              break;
            }
          }

          break;
        }

        if (this.tel.html().indexOf("></") > -1) for (var u = this.tel.html().indexOf("></") - 2; u >= 0; u--) {
          if ("<" === i[u]) {
            i.splice(u, i.length - u);
            break;
          }
        }
        this.tel.html(i.join("")), s > (t === e ? 0 : 2) ? this["delete"](t === e ? e : t - 1) : this._executeQueue();
      }.bind(this), this.deletePace);
    },
    _isVisible: function _isVisible() {
      var e = t(window),
          i = {
        top: e.scrollTop(),
        left: e.scrollLeft()
      };
      i.right = i.left + e.width(), i.bottom = i.top + e.height();
      var s = this.el.outerHeight(),
          h = this.el.outerWidth();
      if (!h || !s) return !1;
      var n = this.el.offset();
      n.right = n.left + h, n.bottom = n.top + s;
      var r = !(i.right < n.left || i.left > n.right || i.bottom < n.top || i.top > n.bottom);
      if (!r) return !1;
      var u = {
        top: Math.min(1, (n.bottom - i.top) / s),
        bottom: Math.min(1, (i.bottom - n.top) / s),
        left: Math.min(1, (n.right - i.left) / h),
        right: Math.min(1, (i.right - n.left) / h)
      };
      return u.left * u.right >= 1 && u.top * u.bottom >= 1;
    },
    _executeQueue: function _executeQueue() {
      if (this.queueIndex < this.queue.length) {
        var t = this.queue[this.queueIndex];
        this.queueIndex++, this.isLooping && 1 === this.queueIndex ? this._to(function () {
          t[0].bind(this)(t[1]);
        }.bind(this), this.s.loopDelay / 2) : t[0].bind(this)(t[1]);
      } else this.s.loop ? (this.queueIndex = 0, this.isLooping = !0, this._to(function () {
        this["delete"]();
      }.bind(this), this.s.loopDelay / 2)) : this.s.callback();
    },
    _to: function _to(t, e) {
      setTimeout(function () {
        t();
      }.bind(this), e);
    },
    _elCheck: function _elCheck() {
      !this.s.startDelete && this.el.html().replace(/(\r\n|\n|\r)/gm, "").length > 0 ? this.s.strings = this.el.html().trim() : this.s.startDelete && (this.stringsToDelete = this.el.html());
    },
    _toArray: function _toArray(t) {
      return t.constructor === Array ? t.slice(0) : t.split("<br>");
    },
    _cursor: function _cursor() {
      if (this.s.cursor) {
        this.el.append("<span " + this.style + 'class="ti-cursor">|</span>');
        var t = this.s.cursorSpeed,
            e = this;
        !function i() {
          e.el.find(".ti-cursor").fadeTo(t / 2, 0).fadeTo(t / 2, 1), e._to(i, t);
        }();
      }
    },
    _setPace: function _setPace() {
      var t = this.s.speed,
          i = this.s.deleteSpeed !== e ? this.s.deleteSpeed : this.s.speed / 3,
          s = t / 2,
          h = i / 2;
      this.typePace = this.s.lifeLike ? this._randomInRange(t, s) : t, this.deletePace = this.s.lifeLike ? this._randomInRange(i, h) : i;
    },
    _randomInRange: function _randomInRange(t, e) {
      return Math.abs(Math.random() * (t + e - (t - e)) + (t - e));
    },
    _rake: function _rake(t) {
      for (var e = 0; e < t.length; e++) {
        if (t[e] = t[e].split(""), this.s.html) {
          this.tPos = [];

          for (var i, s = this.tPos, h = !1, n = 0; n < t[e].length; n++) {
            "<" !== t[e][n] && "&" !== t[e][n] || (s[0] = n, h = "&" === t[e][n]), (">" === t[e][n] || ";" === t[e][n] && h) && (s[1] = n, n = 0, i = t[e].slice(s[0], s[1] + 1).join(""), t[e].splice(s[0], s[1] - s[0] + 1, i), h = !1);
          }
        }
      }

      return t;
    },
    _makeNode: function _makeNode(e) {
      this.tag = t(t.parseHTML(e)), this._print(this.tag), this.inTag = !0;
    }
  }, t.fn.tiType = function (s) {
    var h = t(this).data("typeit");
    return h === e ? i : (h.queue.push([h.type, s]), this);
  }, t.fn.tiEmpty = function () {
    var s = t(this).data("typeit");
    return s === e ? i : (s.queue.push([s.empty]), this);
  }, t.fn.tiDelete = function (s) {
    var h = t(this).data("typeit");
    return h === e ? i : (h.queue.push([h["delete"], s]), this);
  }, t.fn.tiPause = function (s) {
    var h = t(this).data("typeit");
    return h === e ? i : (h.queue.push([h.pause, s]), this);
  }, t.fn.tiBreak = function () {
    var s = t(this).data("typeit");
    return s === e ? i : (s.queue.push([s["break"]]), this);
  }, t.fn.tiSettings = function (s) {
    var h = t(this).data("typeit");
    return h === e ? i : (h.queue.push([h.mergeSet, s]), this);
  };
}(jQuery);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64367" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/typeit.min.js"], null)
//# sourceMappingURL=/typeit.min.0f22338c.js.map