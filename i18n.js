(function () {
  var DEFAULT_LANG = 'en';
  var STORAGE_KEY = 'love-docs-lang';
  var SUPPORTED = [];

  function collectSupported() {
    SUPPORTED = [];
    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      var lang = buttons[i].getAttribute('data-lang-btn');
      if (SUPPORTED.indexOf(lang) === -1) {
        SUPPORTED.push(lang);
      }
    }
  }

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) {
        return saved;
      }
    } catch (e) {}
    var browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(browserLang) !== -1) {
      return browserLang;
    }
    return DEFAULT_LANG;
  }

  function applyDict(dict, lang) {
    document.documentElement.lang = lang;

    var textNodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      var key = el.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.textContent = dict[key];
      }
    }

    var htmlNodes = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlNodes.length; j++) {
      var el2 = htmlNodes[j];
      var key2 = el2.getAttribute('data-i18n-html');
      if (Object.prototype.hasOwnProperty.call(dict, key2)) {
        el2.innerHTML = dict[key2];
      }
    }

    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    for (var k = 0; k < attrNodes.length; k++) {
      var el3 = attrNodes[k];
      var spec = el3.getAttribute('data-i18n-attr');
      var parts = spec.split(':');
      if (parts.length === 2 && Object.prototype.hasOwnProperty.call(dict, parts[1])) {
        el3.setAttribute(parts[0], dict[parts[1]]);
      }
    }

    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var m = 0; m < buttons.length; m++) {
      var btn = buttons[m];
      var active = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function loadLang(lang) {
    fetch(lang + '.json', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load ' + lang + '.json');
        return r.json();
      })
      .then(function (dict) {
        applyDict(dict, lang);
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      })
      .catch(function (err) {
        console.error('Love.css docs: ' + err.message);
      });
  }

  window.switchLang = function (lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    loadLang(lang);
  };

  document.addEventListener('DOMContentLoaded', function () {
    collectSupported();
    loadLang(detectLang());

    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        window.switchLang(this.getAttribute('data-lang-btn'));
      });
    }
  });
})();
