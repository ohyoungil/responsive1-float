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
})({"js/main.js":[function(require,module,exports) {
// Header
var $sections = document.querySelectorAll('section');
var $headerMenu = document.querySelector('.header-menu');
var $trigger = document.querySelector('.trigger');
var $as = $headerMenu.querySelectorAll('a');
console.log($sections);
$trigger.addEventListener('click', function () {
  $headerMenu.classList.toggle('active');
  this.classList.toggle('active');
});
$sections.forEach(function (sectionEl) {
  sectionEl.addEventListener('click', function () {
    $headerMenu.classList.remove('active');
    $trigger.classList.remove('active');
  });
});
$as.forEach(function (a) {
  a.addEventListener('click', function () {
    $headerMenu.classList.remove('active');
    $trigger.classList.remove('active');
  });
}); // Scroll Event

var $header = document.querySelector('header');
window.addEventListener('scroll', function () {
  if (scrollY > 100) {
    $header.classList.add('active');
  } else {
    $header.classList.remove('active');
  }
}); // Swiper-Slider

new Swiper('.welcome .swiper-container', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 4000
  }
});
new Swiper('.review .swiper-container', {
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next'
  },
  pagination: {
    el: '.swiper-pagination'
  }
});
new Swiper('.guide .swiper-container', {
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000
  },
  pagination: {
    el: '.swiper-pagination'
  }
}); // Typeit

new TypeIt('#typing', {
  strings: ['Business strategy', 'Organization Management', 'Business Innovation'],
  speed: 100,
  autoStart: true,
  breakLines: false
}).go(); // Banner

var $tab1 = document.querySelectorAll('.tab1');
var $tab2 = document.querySelectorAll('.tab2');
var $tab3 = document.querySelectorAll('.tab3');
$tab1[0].addEventListener('click', function () {
  $tab1.forEach(function (el) {
    return el.classList.add('active');
  });
  $tab2.forEach(function (el) {
    return el.classList.remove('active');
  });
  $tab3.forEach(function (el) {
    return el.classList.remove('active');
  });
});
$tab2[0].addEventListener('click', function () {
  $tab2.forEach(function (el) {
    return el.classList.add('active');
  });
  $tab1.forEach(function (el) {
    return el.classList.remove('active');
  });
  $tab3.forEach(function (el) {
    return el.classList.remove('active');
  });
});
$tab3[0].addEventListener('click', function () {
  $tab3.forEach(function (el) {
    return el.classList.add('active');
  });
  $tab1.forEach(function (el) {
    return el.classList.remove('active');
  });
  $tab2.forEach(function (el) {
    return el.classList.remove('active');
  });
}); // FAQ

var $faqItem = document.querySelectorAll('.faq-item');

for (var i = 0; i < 5; i++) {
  $faqItem[i].addEventListener('click', function (e) {
    $faqItem.forEach(function (el) {
      return el.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  });
} // Video Modal


var $body = document.querySelector('body');
var $openModal = document.querySelector('.open-modal');
var $videoModal = document.querySelector('.video-modal');
var $xiClose = document.querySelector('.xi-close');
$openModal.addEventListener('click', function () {
  $videoModal.classList.add('active');
  $body.classList.add('active');
});
$xiClose.addEventListener('click', function () {
  $videoModal.classList.remove('active');
  $body.classList.remove('active');
}); // Go to Top

var $btnTop = document.querySelector('.btn-top');
window.addEventListener('scroll', function () {
  if (scrollY > 100) {
    $btnTop.classList.add('active');
  } else {
    $btnTop.classList.remove('active');
  }
});
$btnTop.addEventListener('click', function () {
  gsap.to(window, 0, {
    scrollTo: 0
  });
}); // scroll-spy .show

var $spyEls = document.querySelectorAll('.scroll-spy');
$spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl,
    triggerHook: 0.8
  }).setClassToggle(spyEl, 'show').addTo(new ScrollMagic.Controller());
});
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60026" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map