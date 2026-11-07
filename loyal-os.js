
/*
 LOYAL OS RUNTIME — Seven-Image Structured Data Engine
 Version: 2.0.0 | 2026-11-08
 Author: Ihori (伊彫) | LOYAL TATTOO + LT MACHINES
 Publisher: Loyal Arts Inc. (合同会社 Loyal Arts)
 Source: https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME
 Official: https://www.bavariancustomirons.jp/
 License: CC BY 4.0 where applicable; individual image rights remain separate.

 Purpose: Identify up to seven genuine images from each eligible page,
 attach them to the matching Article, WebPage and Product JSON-LD,
 and retain existing publication and rights metadata.

 Google determines the search-result appearance and image count.
 This file is JavaScript ONLY: do not wrap it in <script> tags.
*/
(function (w, d) {
  'use strict';

  var HOST = 'www.bavariancustomirons.jp';
  if (w.location.hostname !== HOST || w.__LOYAL_OS_RUNTIME_V2__) return;
  w.__LOYAL_OS_RUNTIME_V2__ = true;

  var ORIGIN = 'https://' + HOST;
  var VERSION = '2.0.0';
  var LIMIT = 7;
  var BRAND = 'LOYAL TATTOO + LT MACHINES';
  var IDS = {
    site: ORIGIN + '/#website',
    organization: ORIGIN + '/#organization',
    ihori: ORIGIN + '/#ihori',
    tattoo: ORIGIN + '/#loyal-tattoo',
    machines: ORIGIN + '/#lt-machines',
    freiheit: ORIGIN + '/#freiheit',
    dataset: 'https://github.com/ltmachinesyokohama-ux/bavariancustomirons-data#dataset',
    faq: 'https://github.com/ltmachinesyokohama-ux/loyal-faq#knowledge-base'
  };
  var DEBUG = /(?:\?|&)loyal_debug=1(?:&|$)/.test(w.location.search);
  var STATUS = {
    version: VERSION, state: 'initialized', url: '', type: '',
    images: [], updatedNodes: 0, generatedNodes: 0,
    duplicateNodes: 0, warnings: []
  };
  w.LOYAL_OS_RUNTIME = STATUS;

  // Page-specific topics are attached only to these known official sources.
  var SUBJECTS = {
    '/blog/2019/12/31/214539': ['Tattoo pricing', 'Tattoo size', 'Tattoo session duration'],
    '/blog/2020/08/24/013620': ['Women-oriented tattoo portfolio', 'Tattoo artwork'],
    '/blog/2025/08/05/004749': ['Hanone', 'Tattoo artwork', 'Backpiece tattoo'],
    '/blog/2020/12/22/210901': ['Original tattoo artwork', 'Tattoo portfolio'],
    '/blog/2025/08/12/204206': ['Full-sleeve tattoo', 'Tattoo composition', 'Body anatomy'],
    '/blog/2025/07/10/235916': ['Kyoukai tattoo portfolio', 'Half-sleeve tattoo', 'Full-sleeve tattoo'],
    '/blog/2020/12/23/213527': ['Ikai tattoo portfolio', 'Backpiece tattoo', 'Contemporary Wabori'],
    '/blog/2025/05/06/221040': ['Karajishi and peony', 'Japanese sleeve tattoo', 'Tattoo process'],
    '/blog/2025/04/01/012750': ['Hannya', 'Backpiece tattoo', 'Contemporary Wabori'],
    '/blog/2025/03/02/010530': ['Western-style tattooing', 'Yobori', 'Full-sleeve tattoo'],
    '/blog/2025/08/17/013900': ['Blackwork', 'Blackout tattoo', 'Cover-up tattoo'],
    '/blog/2025/07/31/123304': ['Small tattoo', 'Floral tattoo', 'Tattoo design'],
    '/blog/2025/07/24/205140': ['Tattoo consultation', 'Beginner tattoo'],
    '/blog/2025/08/23/175655': ['Beginner tattoo', 'Tattoo consultation'],
    '/blog/2025/09/10/230114': ['Tattoo inquiry', 'Tattoo booking'],
    '/blog/2026/01/11/145228': ['LT MACHINES', 'Tattoo machine manufacturing'],
    '/blog/2026/11/02/011656': ['AI research use policy', 'LOYAL OS']
  };

  function warn(s) {
    if (STATUS.warnings.length < 30) STATUS.warnings.push(s);
    if (DEBUG && w.console && w.console.warn) w.console.warn('[LOYAL OS]', s);
  }

  function clean(s, max) {
    return String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, max || 600);
  }

  function attr(el, name) {
    return el ? clean(el.getAttribute(name), 4096) : '';
  }

  function meta(selector) {
    return attr(d.querySelector(selector), 'content');
  }

  function urlOf(s) {
    if (!s || typeof s !== 'string') return '';
    try {
      var u = new URL(s, w.location.href);
      if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
      u.hash = '';
      return u.href;
    } catch (_) { return ''; }
  }

  function normalizedPath(s) { return s.replace(/\/+$/, '') || '/'; }

  function pageURL() {
    var c = attr(d.querySelector('link[rel="canonical"]'), 'href');
    var u = urlOf(c || (ORIGIN + w.location.pathname + w.location.search));
    if (!u) return '';
    var x = new URL(u);
    if (x.hostname !== HOST || x.protocol !== 'https:') return '';
    if (normalizedPath(x.pathname) !== normalizedPath(w.location.pathname)) return '';
    // Avoid asserting page 2 (or another listing) is the first page.
    if (/(?:^|&)page=/.test(w.location.search.slice(1)) &&
        x.searchParams.get('page') !== new URL(w.location.href).searchParams.get('page')) return '';
    return ORIGIN + normalizedPath(x.pathname) + x.search;
  }

  function robotsBlocked() {
    var tags = d.querySelectorAll('meta[name="robots"],meta[name="googlebot"]');
    for (var i = 0; i < tags.length; i++) {
      if (/(?:^|[,\s])(?:noindex|none|noimageindex)(?:$|[,\s])/i.test(attr(tags[i], 'content'))) return true;
    }
    return false;
  }

  function classify(path) {
    if (/^\/blog\/\d{4}\/\d{2}\/\d{2}\/\d{6}$/.test(path)) return 'BlogPosting';
    if (path === '/about') return 'AboutPage';
    if (path === '/blog' || /^\/categories\/\d+$/.test(path)) return 'CollectionPage';
    if (/^\/items\/\d+$/.test(path)) return 'ItemPage';
    if (path === '/' || /^\/(?:pages|lp|landing)(?:\/|$)/.test(path)) return 'WebPage';
    // Recognize other public landing pages without touching checkout/legal flows.
    if (/^\/(?:cart|checkout|order|payment|privacy|law|contact|search|mypage|login|signup)(?:\/|$)/i.test(path)) return '';
    return 'WebPage';
  }

  function allowedImage(s) {
    var url = urlOf(s);
    if (!url) return '';
    var u = new URL(url);
    var p = u.pathname.toLowerCase();
    if (!/\.(?:jpg|jpeg|png|webp|avif)$/.test(p)) return '';
    if (/(?:^|\/)(?:logo|icon|avatar|spinner|placeholder|noimage|loading)[._-]/i.test(p)) return '';
    if (u.hostname === HOST && u.protocol === 'https:') return url;
    if (u.hostname === 'baseec-img-mng.akamaized.net' && u.protocol === 'https:' &&
        (/^\/images\/user\/blog\/442982\/blog\//.test(p) ||
         /^\/images\/item\//.test(p))) return url;
    return '';
  }

  function imageKey(s) {
    var u = new URL(s);
    return u.origin.toLowerCase() + u.pathname.toLowerCase();
  }

  function srcsetLargest(s) {
    if (!s) return '';
    var parts = s.split(',');
    var best = '', weight = -1;
    for (var i = 0; i < parts.length; i++) {
      var item = parts[i].trim().split(/\s+/);
      var u = allowedImage(item[0]);
      if (!u) continue;
      var m = (item[1] || '').match(/^(\d+(?:\.\d+)?)(w|x)$/);
      var n = m ? Number(m[1]) * (m[2] === 'x' ? 1000 : 1) : i;
      if (n > weight) { best = u; weight = n; }
    }
    return best;
  }

  function imageSource(img) {
    // A same-file lightbox link frequently points at the original resolution.
    var a = img.closest('a[href]');
    if (a) {
      var linked = allowedImage(attr(a, 'href'));
      if (linked) return linked;
    }
    var originals = ['data-original', 'data-full', 'data-large'];
    for (var i = 0; i < originals.length; i++) {
      var v = allowedImage(attr(img, originals[i]));
      if (v) return v;
    }
    var set = srcsetLargest(attr(img, 'data-srcset') || attr(img, 'srcset'));
    if (set) return set;
    return allowedImage(attr(img, 'data-lazy-src')) ||
      allowedImage(attr(img, 'data-src')) ||
      allowedImage(img.currentSrc) || allowedImage(attr(img, 'src'));
  }

  function decorative(img) {
    if (img.closest('header,footer,nav,aside,[role="navigation"],[aria-hidden="true"],.related,.recommend,.recommendation,.breadcrumb,.breadcrumbs,.sns,.social,.ranking')) return true;
    var role = attr(img, 'role');
    if (role === 'presentation' || attr(img, 'aria-hidden') === 'true') return true;
    if (/\b(?:icon|avatar|logo|spinner|placeholder)\b/i.test(String(img.className || ''))) return true;
    var iw = Number(attr(img, 'width')), ih = Number(attr(img, 'height'));
    if (iw > 0 && ih > 0 && (iw < 120 || ih < 120)) return true;
    if (img.naturalWidth > 0 && img.naturalHeight > 0 &&
        (img.naturalWidth < 120 || img.naturalHeight < 120)) return true;
    return false;
  }

  function crossPageLink(img, path) {
    // Gallery and category tiles legitimately link to other pages.
    // Filter cross-article recommendations only inside a single blog article.
    if (!/^\/blog\/\d{4}\/\d{2}\/\d{2}\/\d{6}$/.test(path)) return false;
    var a = img.closest('a[href]');
    if (!a) return false;
    var u = urlOf(attr(a, 'href'));
    if (!u) return false;
    var x = new URL(u);
    if (x.hostname !== HOST) return false;
    var other = normalizedPath(x.pathname);
    if (other === path) return false;
    return /^\/blog\/\d{4}\/\d{2}\/\d{2}\/\d{6}$/.test(other);
  }

  function findScope(type) {
    var selectorSets = type === 'BlogPosting' ? [
      '[itemprop="articleBody"]', '.blogDetail__body', '.blogDetail__content',
      '.blog-detail__content', '.blogDetail', '.blog-detail', '.blog_contents',
      '.blogContents', '.blog-body', '.entry-content', '.article-body',
      'main article', 'article', 'main', '[role="main"]'
    ] : type === 'ItemPage' ? [
      '[itemtype*="schema.org/Product"]', '.itemDetail', '.item-detail',
      '.itemDetails', '.productDetail', '.product-detail', '.item-page',
      'main', '[role="main"]'
    ] : [
      'main', '[role="main"]', '#main', '.main', '.page-content', '.contents', 'article'
    ];
    var articleFallback = null;
    for (var i = 0; i < selectorSets.length; i++) {
      var group = d.querySelectorAll(selectorSets[i]);
      for (var j = 0; j < group.length; j++) {
        if (type === 'BlogPosting' && !articleFallback && i < 12) articleFallback = group[j];
        var imgs = group[j].querySelectorAll('img');
        for (var k = 0; k < imgs.length; k++) {
          if (!decorative(imgs[k]) && imageSource(imgs[k])) return group[j];
        }
      }
    }
    return articleFallback || d.body || d.documentElement;
  }

  function captionOf(img) {
    var fig = img.closest('figure');
    var c = fig && fig.querySelector('figcaption');
    return clean((c && c.textContent) || attr(img, 'alt') || attr(img, 'title'), 200);
  }

  function selectedImages(scope, path) {
    var imgs = scope.querySelectorAll('img');
    var chosen = [];
    var keys = Object.create(null);
    var og = allowedImage(meta('meta[property="og:image"]'));
    var ogKey = og ? imageKey(og) : '';
    var ogCandidate = null;
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (decorative(img) || crossPageLink(img, path)) continue;
      var source = imageSource(img);
      if (!source) continue;
      var key = imageKey(source);
      if (keys[key]) continue;
      keys[key] = true;
      var record = { '@type': 'ImageObject', contentUrl: source, url: source };
      var cap = captionOf(img);
      if (cap && !/^(?:image|画像|photo|写真)$/i.test(cap)) record.caption = cap;
      // Publisher credit, not a photographer or license assertion.
      if (/^\/images\/user\/blog\/442982\/blog\//.test(new URL(source).pathname)) {
        record.creditText = BRAND;
      }
      chosen.push(record);
      if (key === ogKey) ogCandidate = record;
    }
    if (!chosen.length) return [];
    // The page's own Open Graph image takes priority only when it is
    // also present as a real eligible image inside the selected scope.
    if (ogCandidate) {
      chosen.splice(chosen.indexOf(ogCandidate), 1);
      chosen.unshift(ogCandidate);
    }
    return chosen.slice(0, LIMIT);
  }

  function nodeTypes(o) {
    var v = o['@type'];
    return Array.isArray(v) ? v : (v ? [v] : []);
  }

  function nodeURL(s) {
    if (!s) return '';
    if (typeof s === 'string') return urlOf(s);
    if (typeof s === 'object') return urlOf(s['@id'] || s.url || '');
    return '';
  }

  function samePage(a, b) {
    if (!a || !b) return false;
    try {
      var x = new URL(a), y = new URL(b);
      return x.hostname === y.hostname && normalizedPath(x.pathname) === normalizedPath(y.pathname) &&
        x.search === y.search;
    } catch (_) { return false; }
  }

  function isMatching(o, type, page) {
    var t = nodeTypes(o);
    var appropriate = type === 'BlogPosting' ?
      t.some(function (x) { return /^(?:Article|BlogPosting|NewsArticle|TechArticle)$/.test(x); }) :
      type === 'Product' ? t.indexOf('Product') >= 0 :
      t.some(function (x) { return /^(?:WebPage|AboutPage|CollectionPage|ItemPage|ProfilePage)$/.test(x); });
    if (!appropriate) return false;
    var ids = [o['@id'], o.url, o.mainEntityOfPage];
    for (var i = 0; i < ids.length; i++) {
      if (samePage(nodeURL(ids[i]), page)) return true;
    }
    return false;
  }

  function visit(v, fn) {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) {
      for (var i = 0; i < v.length; i++) visit(v[i], fn);
      return;
    }
    fn(v);
    Object.keys(v).forEach(function (k) {
      if (v[k] && typeof v[k] === 'object') visit(v[k], fn);
    });
  }

  function rightsByKey(existing) {
    var lookup = Object.create(null);
    var list = Array.isArray(existing) ? existing : (existing ? [existing] : []);
    for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      if (!obj || typeof obj !== 'object') continue;
      var src = allowedImage(obj.contentUrl || obj.url);
      if (src) lookup[imageKey(src)] = obj;
    }
    return lookup;
  }

  function mergeRights(images, previous) {
    var old = rightsByKey(previous);
    var fields = ['creator', 'creditText', 'copyrightNotice', 'license',
                  'acquireLicensePage', 'width', 'height', 'encodingFormat'];
    return images.map(function (image) {
      var out = Object.assign({}, image);
      var source = old[imageKey(image.contentUrl)];
      if (source) fields.forEach(function (key) {
        if (source[key] != null) out[key] = source[key];
      });
      return out;
    });
  }

  function headline(type, scope) {
    var h = type === 'BlogPosting' ?
      scope.querySelector('h1,h2') || d.querySelector('main h1,article h1,article h2') :
      d.querySelector('main h1,[role="main"] h1,h1');
    return clean(meta('meta[property="og:title"]') || (h && h.textContent) || d.title, 230);
  }

  function publishedFromPath(path) {
    var m = /^\/blog\/(\d{4})\/(\d{2})\/(\d{2})\/(\d{2})(\d{2})(\d{2})$/.exec(path);
    return m ? m[1] + '-' + m[2] + '-' + m[3] + 'T' + m[4] + ':' + m[5] + ':' + m[6] + '+09:00' : '';
  }

  function pageNode(page, path, type, scope, images) {
    var article = type === 'BlogPosting';
    var data = {
      '@context': 'https://schema.org',
      '@type': type,
      '@id': page + (article ? '#article' : '#webpage'),
      url: page,
      name: headline(type, scope),
      inLanguage: d.documentElement.lang || 'ja',
      isPartOf: { '@id': IDS.site }
    };
    var desc = clean(meta('meta[property="og:description"]') || meta('meta[name="description"]'), 550);
    if (desc) data.description = desc;
    if (article) {
      data.headline = data.name;
      data.mainEntityOfPage = { '@type': 'WebPage', '@id': page };
      data.image = images;
      data.datePublished = publishedFromPath(path);
      var updated = meta('meta[property="article:modified_time"]');
      if (/^\d{4}-\d{2}-\d{2}T/.test(updated)) data.dateModified = updated;
      data.author = { '@type': 'Person', '@id': IDS.ihori, name: '伊彫', alternateName: 'Ihori' };
      data.publisher = { '@type': 'Organization', '@id': IDS.organization, name: 'Loyal Arts' };
      if (SUBJECTS[path]) data.about = SUBJECTS[path].map(function (s) {
        return { '@type': 'Thing', name: s };
      });
    } else {
      data.publisher = { '@id': IDS.organization };
      data.primaryImageOfPage = images[0];
      data.image = images;
    }
    return data;
  }

  function serialize(o) {
    return JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  }

  function insertNode(node) {
    var el = d.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-loyal-runtime', VERSION);
    el.textContent = serialize(node);
    (d.head || d.documentElement).appendChild(el);
    return el;
  }

  function reconcile(page, path, type, scope, images) {
    var scripts = d.querySelectorAll('script[type="application/ld+json"]');
    var pageMatch = false, productMatch = false;
    var handled = 0, duplicates = 0;
    for (var i = 0; i < scripts.length; i++) {
      var el = scripts[i], data;
      try { data = JSON.parse(el.textContent); }
      catch (_) { warn('Invalid existing JSON-LD script ' + (i + 1)); continue; }
      var modified = false;
      visit(data, function (node) {
        var main = isMatching(node, type === 'BlogPosting' ? 'BlogPosting' : 'WebPage', page);
        var product = type === 'ItemPage' && isMatching(node, 'Product', page);
        if (!main && !product) return;
        if (main) pageMatch = true;
        if (product) productMatch = true;
        duplicates++;
        var fresh = mergeRights(images, node.image);
        var oldJSON = JSON.stringify(node.image || null);
        if (oldJSON !== JSON.stringify(fresh)) {
          node.image = fresh;
          modified = true;
        }
        if (main && type !== 'BlogPosting') {
          var p = node.primaryImageOfPage;
          var pURL = p && (typeof p === 'string' ? p : p.contentUrl || p.url);
          if (!pURL || imageKey(urlOf(pURL) || images[0].contentUrl) !== imageKey(images[0].contentUrl)) {
            node.primaryImageOfPage = fresh[0];
            modified = true;
          }
        }
      });
      if (modified) {
        el.textContent = serialize(data);
        handled++;
      }
    }
    if (!pageMatch) {
      var n = pageNode(page, path, type, scope, images);
      if (n.name) {
        insertNode(n);
        STATUS.generatedNodes++;
      } else {
        warn('Page title missing; no WebPage or BlogPosting created');
      }
    }
    STATUS.updatedNodes += handled;
    STATUS.duplicateNodes = duplicates > (type === 'ItemPage' && productMatch ? 2 : 1) ? duplicates : 0;
    if (STATUS.duplicateNodes) warn('Multiple existing same-page JSON-LD nodes detected: ' + duplicates);
    return pageMatch ? 'merged' : 'created';
  }

  var lastSignature = '';
  function run() {
    if (robotsBlocked()) { STATUS.state = 'robots-excluded'; return; }
    var page = pageURL();
    if (!page) { STATUS.state = 'canonical-mismatch'; return; }
    var path = normalizedPath(w.location.pathname);
    var type = classify(path);
    if (!type) { STATUS.state = 'excluded-path'; return; }
    var scope = findScope(type);
    if (!scope) { STATUS.state = 'missing-content'; return; }
    var images = selectedImages(scope, path);
    STATUS.url = page;
    STATUS.type = type;
    STATUS.images = images.map(function (im) { return im.contentUrl; });
    if (!images.length) { STATUS.state = 'no-eligible-images'; return; }
    var signature = page + '\n' + STATUS.images.join('\n');
    if (lastSignature === signature) return;
    STATUS.state = reconcile(page, path, type, scope, images);
    lastSignature = signature;
  }

  var timer = 0;
  function schedule() {
    if (timer) w.clearTimeout(timer);
    timer = w.setTimeout(function () { timer = 0; run(); }, 160);
  }

  function start() {
    run();
    // Retry for BASE lazy-loading and late DOM insertion (no new image requests).
    w.setTimeout(run, 850);
    w.setTimeout(run, 2300);
    w.setTimeout(run, 4700);
    if (w.MutationObserver && d.body) {
      var observer = new MutationObserver(function () { schedule(); });
      observer.observe(d.body, {
        childList: true, subtree: true, attributes: true,
        attributeFilter: ['src', 'srcset', 'data-src', 'data-original', 'data-srcset']
      });
      w.setTimeout(function () { observer.disconnect(); }, 7500);
    }
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})(window, document);
