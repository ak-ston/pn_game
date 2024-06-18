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
})({"baccarat.js":[function(require,module,exports) {
var betsOnPlayer = 0;
var betsOnBanker = 0;
var betsOnBanker6 = 0;
var betsOnTie = 0;
function updateBetCounts() {
  var playerInput = document.getElementById('player-input').value;
  var bankerInput = document.getElementById('banker-input').value;
  var banker6Input = document.getElementById('banker6-input').value;
  var tieInput = document.getElementById('tie-input').value;
  var playerCount = playerInput ? playerInput.split(',').filter(function (name) {
    return name.trim() !== '';
  }).length : 0;
  var bankerCount = bankerInput ? bankerInput.split(',').filter(function (name) {
    return name.trim() !== '';
  }).length : 0;
  var banker6Count = banker6Input ? banker6Input.split(',').filter(function (name) {
    return name.trim() !== '';
  }).length : 0;
  var tieCount = tieInput ? tieInput.split(',').filter(function (name) {
    return name.trim() !== '';
  }).length : 0;
  document.getElementById('player-count').innerText = playerCount;
  document.getElementById('banker-count').innerText = bankerCount;
  document.getElementById('banker6-count').innerText = banker6Count;
  document.getElementById('tie-count').innerText = tieCount;
}
function getCard() {
  var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'J', 'Q', 'K'];
  return cards[Math.floor(Math.random() * cards.length)];
}
function getCardValue(card) {
  if (card === 'A') return 1;
  if (card === 'J' || card === 'Q' || card === 'K') return 0;
  return card;
}
function needThirdCard(playerScore, bankerScore) {
  if (playerScore >= 8 || bankerScore >= 8) {
    return false;
  }
  if (playerScore <= 5) {
    return true;
  }
  if (bankerScore <= 5) {
    if (playerScore >= 6 && playerScore <= 7) {
      return false;
    }
    return true;
  }
  return false;
}
function dealCards() {
  var playerCards = [getCard(), getCard()];
  var bankerCards = [getCard(), getCard()];
  var playerScore = (getCardValue(playerCards[0]) + getCardValue(playerCards[1])) % 10;
  var bankerScore = (getCardValue(bankerCards[0]) + getCardValue(bankerCards[1])) % 10;
  var thirdCardNeeded = needThirdCard(playerScore, bankerScore);
  var playerThirdCard = null;
  if (thirdCardNeeded) {
    playerThirdCard = getCard();
    playerCards.push(playerThirdCard);
    playerScore = (getCardValue(playerCards[0]) + getCardValue(playerCards[1]) + getCardValue(playerThirdCard)) % 10;
    if (bankerScore <= 2) {
      bankerCards.push(getCard());
    } else if (bankerScore === 3 && playerScore !== 8) {
      bankerCards.push(getCard());
    } else if (bankerScore === 4 && playerScore >= 2 && playerScore <= 7) {
      bankerCards.push(getCard());
    } else if (bankerScore === 5 && playerScore >= 4 && playerScore <= 7) {
      bankerCards.push(getCard());
    } else if (bankerScore === 6 && (playerScore === 6 || playerScore === 7)) {
      bankerCards.push(getCard());
    }
    if (bankerCards.length === 3) {
      bankerScore = (getCardValue(bankerCards[0]) + getCardValue(bankerCards[1]) + getCardValue(bankerCards[2])) % 10;
    } else {
      bankerScore = (getCardValue(bankerCards[0]) + getCardValue(bankerCards[1])) % 10;
    }
  }
  return {
    playerCards: playerCards,
    bankerCards: bankerCards,
    playerScore: playerScore,
    bankerScore: bankerScore
  };
}
function determineWinner(playerScore, bankerScore) {
  if (playerScore > bankerScore) {
    return 'player';
  } else if (bankerScore > playerScore) {
    if (bankerScore === 6 && bankerScore !== playerScore) {
      return 'banker6';
    }
    return 'banker';
  } else {
    return 'tie';
  }
}
window.placeBet = function (betOn) {
  var playerInput = document.getElementById('player-input').value;
  var bankerInput = document.getElementById('banker-input').value;
  var banker6Input = document.getElementById('banker6-input').value;
  var tieInput = document.getElementById('tie-input').value;
  var playerNames = playerInput.split(',').filter(function (name) {
    return name.trim() !== '';
  });
  var bankerNames = bankerInput.split(',').filter(function (name) {
    return name.trim() !== '';
  });
  var banker6Names = banker6Input.split(',').filter(function (name) {
    return name.trim() !== '';
  });
  var tieNames = tieInput.split(',').filter(function (name) {
    return name.trim() !== '';
  });
  if (betOn === 'player') {
    betsOnPlayer = playerNames.length;
    document.getElementById('player-bets').innerText = betsOnPlayer;
  } else if (betOn === 'banker') {
    betsOnBanker = bankerNames.length;
    document.getElementById('banker-bets').innerText = betsOnBanker;
  } else if (betOn === 'banker6') {
    betsOnBanker6 = banker6Names.length;
    document.getElementById('banker6-bets').innerText = betsOnBanker6;
  } else if (betOn === 'tie') {
    betsOnTie = tieNames.length;
    document.getElementById('tie-bets').innerText = betsOnTie;
  }
  updateBetCounts();
};
window.playGame = function () {
  var _dealCards = dealCards(),
    playerCards = _dealCards.playerCards,
    bankerCards = _dealCards.bankerCards,
    playerScore = _dealCards.playerScore,
    bankerScore = _dealCards.bankerScore;
  document.getElementById('result').innerHTML = "\n        <p>Player Cards: ".concat(playerCards.join(', '), "</p>\n        <p>Banker Cards: ").concat(bankerCards.join(', '), "</p>\n        <p>Player Score: ").concat(playerScore, "</p>\n        <p>Banker Score: ").concat(bankerScore, "</p>\n    ");
  var winner = determineWinner(playerScore, bankerScore);
  var resultMessage = '';
  var winnerNames = '';
  if (winner === 'player') {
    resultMessage = 'Winner: Player';
    winnerNames = document.getElementById('player-input').value.split(',').filter(function (name) {
      return name.trim() !== '';
    }).join(', ');
    document.getElementById('result').innerHTML += "<p style=\"color: blue;\">".concat(resultMessage, "</p>");
  } else if (winner === 'banker') {
    resultMessage = 'Winner: Banker';
    winnerNames = document.getElementById('banker-input').value.split(',').filter(function (name) {
      return name.trim() !== '';
    }).join(', ');
    document.getElementById('result').innerHTML += "<p style=\"color: red;\">".concat(resultMessage, "</p>");
  } else if (winner === 'banker6') {
    resultMessage = 'Winner: Banker 6';
    winnerNames = document.getElementById('banker6-input').value.split(',').filter(function (name) {
      return name.trim() !== '';
    }).join(', ');
    document.getElementById('result').innerHTML += "<p style=\"color: orange;\">".concat(resultMessage, "</p>");
  } else {
    resultMessage = 'Winner: Tie';
    winnerNames = document.getElementById('tie-input').value.split(',').filter(function (name) {
      return name.trim() !== '';
    }).join(', ');
    document.getElementById('result').innerHTML += "<p style=\"color: green;\">".concat(resultMessage, "</p>");
  }
  if (winnerNames) {
    document.getElementById('result').innerHTML += "<p>Winners: ".concat(winnerNames, "</p>");
  } else {
    document.getElementById('result').innerHTML += "<p>No Winners</p>";
  }
};
window.resetGame = function () {
  document.getElementById('player-input').value = '';
  document.getElementById('banker-input').value = '';
  document.getElementById('banker6-input').value = '';
  document.getElementById('tie-input').value = '';
  document.getElementById('player-count').innerText = '0';
  document.getElementById('banker-count').innerText = '0';
  document.getElementById('banker6-count').innerText = '0';
  document.getElementById('tie-count').innerText = '0';
  document.getElementById('result').innerHTML = '';
  betsOnPlayer = 0;
  betsOnBanker = 0;
  betsOnBanker6 = 0;
  betsOnTie = 0;
};
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62336" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","baccarat.js"], null)
//# sourceMappingURL=/baccarat.b25c22de.js.map