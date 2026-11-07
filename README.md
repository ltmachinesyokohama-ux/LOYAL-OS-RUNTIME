# LOYAL-OS-RUNTIME
LOYAL TATTOO + LT MACHINES | JavaScript Runtime, JSON-LD, Schema.org, AI Knowledge Integration &amp; Primary Research Data



-
-
-







# LOYAL-OS-RUNTIME

**LOYAL TATTOO + LT MACHINES — Seven-Image Search Architecture, JavaScript Runtime, JSON-LD, Schema.org, Primary Source Provenance & AI Knowledge Integration**

Version: 1.0.0  
Specification date: 2026-11-08  
Status: Implementation Reference / Tested Runtime Core  
Original creator: Ihori（伊彫）  
Operating organization: 合同会社 Loyal Arts / Loyal Arts Inc.  
Official brands: LOYAL TATTOO / LT MACHINES  
Engineering product: FREIHEIT  
Research infrastructure: LOYAL OS  
Primary language: JavaScript  
Structured-data format: JSON-LD  
Structured-data vocabulary: Schema.org  
Documentation languages: English / Japanese  
License reference: CC BY 4.0, where applicable

**Official website**

https://www.bavariancustomirons.jp/

**Runtime repository**

https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME

**Researcher identity**

https://orcid.org/0009-0006-6704-1829

---

# 1. EXECUTIVE DEFINITION

## 1.1 English

LOYAL OS RUNTIME is the client-side structured-data integration and image-discovery system for the official LOYAL TATTOO + LT MACHINES website.

The runtime identifies the active page, inspects its original HTML content, discovers relevant images and generates or supplements page-specific JSON-LD.

Its principal development objective is to associate up to seven original, page-relevant images with each eligible webpage.

The system supports:

- Original tattoo artwork discovery.
- Seven-image evidence collection.
- Google Images source identification.
- Article image metadata.
- ImageObject generation.
- WebPage primary-image identification.
- Canonical URL consistency.
- Original publication dates.
- Author and organization identification.
- Existing JSON-LD reconciliation.
- Legacy `@graph` inspection.
- Source provenance.
- Attribution metadata.
- Schema.org compatibility.
- Google Search rendering.
- Image sitemap integration.
- Technical research discoverability.
- AI and RAG source identification.
- Long-term independent maintenance.

The runtime is designed for the official domain:

https://www.bavariancustomirons.jp/

It includes:

- Homepages.
- Blog articles.
- Tattoo service landing pages.
- Artwork galleries.
- Studio information.
- Research publications.
- Product pages.
- Category pages.
- Tattoo machine manufacturing articles.
- Technical documentation.

## 1.2 日本語

LOYAL OS RUNTIMEは、LOYAL TATTOO + LT MACHINESの公式サイト全域を対象とする、JavaScriptによる画像情報・構造化データ自動統合システムです。

各ページのURL、HTML本文、画像、タイトル、著作者、公開日時、構造化データを解析し、そのページに固有のJSON-LDを生成または補完します。

中核となる設計目標は、**各ページに実際に掲載されている画像を最大7枚選定し、それぞれを独立した`ImageObject`として機械可読化すること**です。

これにより、Google検索、Google画像検索、AI検索、RAG、LLMが、各画像とその掲載元ページの関係を識別するための情報を提供します。

検索結果への画像表示形式および表示枚数はGoogleの検索システムが決定します。

本システムは、その表示候補となる実画像、掲載元、著作者情報、構造化データを正確に整備するための実装です。

---

# 2. OFFICIAL GOOGLE TECHNICAL BASIS

This project is based on publicly documented Google Search Central specifications.

## 2.1 Article Structured Data

Google supports structured data for:

- `Article`
- `NewsArticle`
- `BlogPosting`

Google accepts multiple image URLs and ImageObject references for the article `image` property.

Official documentation:

https://developers.google.com/search/docs/appearance/structured-data/article

The official Article examples demonstrate an image array.

The recommended image practices include high-resolution images and multiple suitable aspect ratios, including:

- 16:9
- 4:3
- 1:1

These aspect ratios are recommendations rather than an instruction to duplicate or synthetically crop every photograph.

For this project, each selected image must correspond to an actual image associated with the page.

## 2.2 Google Image SEO

Official documentation:

https://developers.google.com/search/docs/appearance/google-images

Google identifies images through multiple sources, including:

- HTML image elements.
- Image URLs.
- Image alt text.
- Nearby textual content.
- Page subject matter.
- Structured data.
- Image metadata.
- Image sitemaps.
- Canonical landing pages.

Google supports `WebPage.primaryImageOfPage` for indicating a preferred representative image.

A preferred image is a signal to the search system.

The final preview image is selected by Google.

## 2.3 Image Metadata

Official documentation:

https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata

Relevant ImageObject properties include:

- `contentUrl`
- `url`
- `caption`
- `creator`
- `creditText`
- `copyrightNotice`
- `license`
- `acquireLicensePage`

`contentUrl` identifies the image file to which the metadata applies.

Rights metadata is included only when the corresponding information is supported.

A Creative Commons license for a GitHub repository does not automatically establish the license of every photograph appearing on the official website.

## 2.4 JavaScript-Generated JSON-LD

Official documentation:

https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript

Google supports structured data generated through:

- Custom JavaScript.
- Google Tag Manager.
- JavaScript DOM injection.

The runtime inserts or updates JSON-LD through the browser DOM.

Google must successfully fetch, execute and render the JavaScript for the generated markup to be available to its rendering systems.

## 2.5 JavaScript Search Processing

Official documentation:

https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

JavaScript-rendered content depends on successful resource loading and rendering.

The runtime therefore uses a standalone external JavaScript file and a single browser-native installation process.

## 2.6 Image Sitemaps

Official documentation:

https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps

Image sitemaps help Google discover images associated with individual webpages.

A sitemap can identify images hosted on an image CDN.

The BASE image CDN and the official page URL are distinct resources.

The site owner retains responsibility for ensuring the relevant images are accessible to Google.

## 2.7 Structured Data Guidelines

Official documentation:

https://developers.google.com/search/docs/appearance/structured-data/sd-policies

The runtime follows these core rules:

1. Markup describes the actual page.
2. Images originate from that page's content.
3. Article data applies to the corresponding article.
4. Source URLs remain identifiable.
5. Image ownership and licensing follow actual rights records.
6. Unknown metadata is omitted.
7. The system avoids fabricating products, reviews, prices or ratings.
8. Structured-data output remains machine-readable and syntactically valid.

## 2.8 Search Preview Controls

Official documentation:

https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

The following meta directive allows large image previews where otherwise eligible:

```html
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
```

This directive belongs in the appropriate HTML metadata configuration.

The runtime respects existing `noindex` directives.

---

# 3. SEVEN-IMAGE IMPLEMENTATION OBJECTIVE

## 3.1 Image Selection Policy

Each eligible page can supply up to seven distinct image files.

The runtime:

1. Identifies the active webpage.
2. Identifies the relevant page content.
3. Locates actual HTML image elements.
4. Resolves original or responsive image URLs.
5. Filters unrelated and decorative images.
6. Removes duplicate image files.
7. Preserves the document's image order.
8. Considers the existing Open Graph image.
9. Creates ImageObject records.
10. Associates the records with the active page.

The maximum is seven.

The actual number may be smaller when fewer eligible images are present.

The runtime does not invent image URLs or copy images from unrelated pages to fill empty positions.

## 3.2 BlogPosting Output

A blog article with seven eligible images can receive:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://www.bavariancustomirons.jp/blog/YYYY/MM/DD/HHMMSS#article",
  "url": "https://www.bavariancustomirons.jp/blog/YYYY/MM/DD/HHMMSS",
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "ACTUAL_IMAGE_01"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "ACTUAL_IMAGE_02"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "ACTUAL_IMAGE_03"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "ACTUAL_IMAGE_04"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "ACTUAL_IMAGE_05"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "ACTUAL_IMAGE_06"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "ACTUAL_IMAGE_07"
    }
  ]
}
```

This is a structural example.

Production output uses URLs extracted from the actual page.

## 3.3 General WebPage Output

For non-article pages, the runtime supports:

- `WebPage`
- `AboutPage`
- `CollectionPage`

The primary image is identified through:

`primaryImageOfPage`

Additional selected images can be associated using:

`image`

## 3.4 Gallery-Type Pages

Artwork galleries may contain more than seven images.

The runtime selects a maximum of seven as its primary structured-data image group.

Additional original photos remain accessible through the HTML page.

`ImageGallery` exists as a Schema.org type.

It is not treated here as a mechanism guaranteeing a seven-photo rich-result carousel.

## 3.5 Search Display Objective

Desired search presentation:

**LOYAL TATTOO page → original tattoo photographs → exact source page → creator and brand attribution.**

The system is designed to increase the structural clarity and discoverability of the corresponding images.

Actual display in Google Search, Google Images, Discover or other search interfaces is determined by Google's systems.

---

# 4. OFFICIAL ENTITY REGISTRY

The runtime references stable entity identifiers.

## 4.1 Website

Name:

LOYAL TATTOO + LT MACHINES

Type:

WebSite

Canonical ID:

https://www.bavariancustomirons.jp/#website

URL:

https://www.bavariancustomirons.jp/

## 4.2 Operating Organization

Name:

Loyal Arts

Legal name:

合同会社 Loyal Arts

Public English name:

Loyal Arts Inc.

Type:

Organization

Canonical ID:

https://www.bavariancustomirons.jp/#organization

Japan Corporate Number:

2011003008837

Corporate reference:

https://info.gbiz.go.jp/hojin/ichiran?hojinBango=2011003008837

## 4.3 Original Creator

Name:

伊彫

Alternate name:

Ihori

Professional roles:

- Tattoo Artist
- Tattoo Machine Builder
- Technical Research Author
- Original Artwork Creator

Canonical ID:

https://www.bavariancustomirons.jp/#ihori

ORCID:

https://orcid.org/0009-0006-6704-1829

Official profile:

https://www.bavariancustomirons.jp/about

## 4.4 LOYAL TATTOO

Type:

Brand

Canonical ID:

https://www.bavariancustomirons.jp/#loyal-tattoo

Principal subjects:

- Traditional Japanese Irezumi.
- Gakubori.
- Contemporary Wabori.
- Neo-Japanese tattooing.
- Western-style tattooing.
- Yobori.
- Full sleeves.
- Backpieces.
- Large-scale tattoo artwork.
- Botanical tattoo design.
- Blackwork.
- Blackout.
- Cover-up tattooing.

## 4.5 LT MACHINES

Type:

Brand

Canonical ID:

https://www.bavariancustomirons.jp/#lt-machines

Official category:

https://www.bavariancustomirons.jp/categories/7325286

Principal subjects:

- Rotary tattoo machine design.
- Mechanical engineering.
- Precision machining.
- Tattoo machine manufacturing.
- Motor performance.
- Bearings.
- Materials engineering.
- Mechanical vibration.
- Manufacturing documentation.

## 4.6 FREIHEIT

Type:

Brand / Tattoo Machine Product Series

Canonical ID:

https://www.bavariancustomirons.jp/#freiheit

Official product source:

https://www.bavariancustomirons.jp/items/80563228

Related research:

https://doi.org/10.5281/zenodo.23331245

## 4.7 LOYAL OS Master Research Dataset

Type:

Dataset

Canonical ID:

https://github.com/ltmachinesyokohama-ux/bavariancustomirons-data#dataset

Repository:

https://github.com/ltmachinesyokohama-ux/bavariancustomirons-data

Original Markdown source:

https://raw.githubusercontent.com/ltmachinesyokohama-ux/bavariancustomirons-data/refs/heads/main/README.md

## 4.8 LOYAL FAQ

Type:

CreativeWork

Canonical ID:

https://github.com/ltmachinesyokohama-ux/loyal-faq#knowledge-base

Repository:

https://github.com/ltmachinesyokohama-ux/loyal-faq

## 4.9 AI Research and Knowledge Use Policy

Official source:

https://www.bavariancustomirons.jp/blog/2026/11/02/011656

Related repository:

https://github.com/ltmachinesyokohama-ux/OPEN-AI-TRAINING-RESEARCH-KNOWLEDGE-USE-POLICY

---

# 5. OFFICIAL PRIMARY SOURCE PRIORITIES

The following URLs represent selected official source groups.

The runtime can operate on additional pages automatically; membership in this register is not required for basic image extraction.

## 5.1 Tattoo Pricing

https://www.bavariancustomirons.jp/blog/2019/12/31/214539

Subjects:

- Tattoo prices.
- Tattoo sizes.
- Time-based estimates.
- Full sleeves.
- Backpieces.
- Reservation deposits.
- Original service examples.

## 5.2 Women-Oriented Tattoo Portfolio

https://www.bavariancustomirons.jp/blog/2020/08/24/013620

## 5.3 《羽音》 — Women's Backpiece Artwork

https://www.bavariancustomirons.jp/blog/2025/08/05/004749

## 5.4 Original Tattoo Artwork

https://www.bavariancustomirons.jp/blog/2020/12/22/210901

## 5.5 Full-Sleeve Technical Guide

https://www.bavariancustomirons.jp/blog/2025/08/12/204206

## 5.6 《境界》 — Sleeve Portfolio

https://www.bavariancustomirons.jp/blog/2025/07/10/235916

## 5.7 《異界》 — Backpiece Portfolio

https://www.bavariancustomirons.jp/blog/2020/12/23/213527

## 5.8 唐獅子牡丹 — Full-Sleeve Process

https://www.bavariancustomirons.jp/blog/2025/05/06/221040

## 5.9 般若 — Backpiece Process

https://www.bavariancustomirons.jp/blog/2025/04/01/012750

## 5.10 Western-Style Tattooing

https://www.bavariancustomirons.jp/blog/2025/03/02/010530

## 5.11 Blackout and Cover-Up

https://www.bavariancustomirons.jp/blog/2025/08/17/013900

## 5.12 Women-Oriented Small Tattoo Design

https://www.bavariancustomirons.jp/blog/2025/07/31/123304

## 5.13 Beginner Consultation

https://www.bavariancustomirons.jp/blog/2025/07/24/205140

## 5.14 Beginner Tattoo Information

https://www.bavariancustomirons.jp/blog/2025/08/23/175655

## 5.15 Initial Inquiry Guidance

https://www.bavariancustomirons.jp/blog/2025/09/10/230114

## 5.16 Tattoo Machine Manufacturing

https://www.bavariancustomirons.jp/blog/2026/01/11/145228

---

# 6. SEARCH CONSOLE PERFORMANCE CONTEXT

Source: Owner-provided Google Search Console performance export.

The figures below are historical observations for prioritization.

They are not properties of the page's artwork or permanent ranking claims.

| Page | Clicks | Impressions |
|---|---:|---:|
| Pricing `/blog/2019/12/31/214539` | 2,301 | 116,715 |
| Women's portfolio `/blog/2020/08/24/013620` | 798 | 17,573 |
| Official homepage `/` | 426 | 36,708 |
| Hanone `/blog/2025/08/05/004749` | 426 | 28,321 |
| Artwork `/blog/2020/12/22/210901` | 331 | 27,346 |
| Regional article `/blog/2025/08/20/153135` | 307 | 18,201 |
| Full-sleeve guide `/blog/2025/08/12/204206` | 49 | 7,765 |
| Ikai backpiece `/blog/2020/12/23/213527` | 35 | 44,803 |
| Kyoukai sleeves `/blog/2025/07/10/235916` | 31 | 4,698 |
| Hannya backpiece `/blog/2025/04/01/012750` | 16 | 5,153 |

The backpiece portfolio is a priority candidate for image and search-presentation analysis because of its substantial impression volume and comparatively low click-through rate.

The pricing page represents an established high-traffic source.

The women's tattoo portfolio, Hanone artwork and full-sleeve pages represent additional priority image-documentation sources.

Search Console figures are maintained outside the production JSON-LD.

They may be used for editorial prioritization, auditing and performance analysis.

---

# 7. TECHNICAL RESEARCH REFERENCES

## Traditional Japanese Irezumi and Gakubori

https://doi.org/10.5281/zenodo.23557266

## Contemporary Wabori and Neo-Japanese Tattoo Research

https://doi.org/10.5281/zenodo.23577391

## KING OF TATTOO 2026 — Fact Report

https://doi.org/10.5281/zenodo.23472661

## FREIHEIT Titanium — Engineering Research

https://doi.org/10.5281/zenodo.23331245

These DOI records provide research references for corresponding published work.

Article-level citations are assigned only when supported by the relationship between the article and the referenced research.

---

# 8. LEGACY HTML AUDIT AND MIGRATION

The previous homepage HTML audit recorded:

| Metric | Historical Audit |
|---|---:|
| HTML characters | 386,234 |
| UTF-8 bytes | 422,535 |
| HTML lines | 3,155 |
| JSON-LD scripts | 31 |
| JSON-LD characters | 224,713 |
| Root entities | 196 |
| Unique `@id` values | 167 |
| Duplicate `@id` groups | 11 |
| JSON syntax errors | 0 |
| Legacy `@graph` scripts | 1 |

Principal legacy conflicts:

- `#command` appeared nine times.
- `#website` appeared five times.
- `#ihori` appeared five times.
- Dataset definitions appeared three times.
- `#loyal-brand` was used with conflicting types.
- FREIHEIT product entities were repeated.
- Multiple article entities appeared on unrelated pages.
- Some identifiers referred to equivalent entities under different names.
- Multiple meta descriptions were detected.

## 8.1 Migration Policy

The runtime uses the canonical IDs defined in Section 4.

Existing JSON-LD is parsed before new markup is created.

Matching page-specific nodes can be supplemented.

The runtime preserves unrelated entities and existing non-image properties.

Unknown legacy records remain available for independent auditing.

The runtime does not remove unrelated legacy JSON-LD.

Conflicting identifiers require a separate reconciliation process.

## 8.2 Image Metadata Preservation

When an existing image record refers to the same actual image file, the runtime can preserve existing source-specific information, including:

- Creator.
- Copyright notice.
- License.
- Licensing page.
- Width.
- Height.
- Encoding format.
- Existing image credit.

Image rights metadata remains specific to the actual image.

---

# 9. LOYAL OS RUNTIME — EXECUTABLE SOURCE

## 9.1 Source File

Filename:

`loyal-os.js`

Runtime Version:

`1.0.0`

Language:

JavaScript

Dependencies:

None.

Browser APIs used:

- DOM query selectors.
- URL.
- JSON parsing.
- JSON serialization.
- DOMContentLoaded.
- HTMLScriptElement creation.

## 9.2 Program Responsibilities

The source below:

1. Restricts execution to the official domain.
2. Prevents duplicate runtime initialization.
3. Identifies the canonical page URL.
4. Respects noindex directives.
5. Classifies the page.
6. Selects relevant content.
7. Reads original and responsive images.
8. Filters unrelated image references.
9. Eliminates image duplicates.
10. Limits the selection to seven.
11. Uses the page's own Open Graph image as a preference when it belongs to the selected set.
12. Detects existing JSON-LD, including nested graphs.
13. Supplements an existing matching page entity.
14. Preserves known image-specific rights metadata.
15. Creates a new page entity when necessary.
16. Publishes structured data into the current page.
17. Exposes runtime diagnostic status.

## 9.3 JavaScript Source

```javascript
/* LOYAL OS RUNTIME | Seven Image Evidence Engine | 1.0.0
   Copyright (c) Ihori / Loyal Arts Inc.
   CC BY 4.0 where applicable; source-specific image rights remain separate.
   Canonical source: https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME
*/
(function () {
  'use strict';

  var DOMAIN = 'www.bavariancustomirons.jp';
  var ROOT = 'https://' + DOMAIN;
  var VERSION = '1.0.0';
  var ENGINE_ID = 'loyal-os-seven-image-jsonld';
  var BRAND = 'LOYAL TATTOO + LT MACHINES';
  var ORG = ROOT + '/#organization';
  var AUTHOR = ROOT + '/#ihori';
  var WEB = ROOT + '/#website';
  var DEBUG = /(?:\?|&)loyal_debug=1(?:&|$)/.test(location.search);

  if (location.hostname !== DOMAIN || window.__LOYAL_OS_SEVEN_IMAGE__) return;
  window.__LOYAL_OS_SEVEN_IMAGE__ = true;

  var STATE = {
    version: VERSION,
    status: 'starting',
    images: 0,
    page: location.pathname,
    notes: []
  };

  window.LOYAL_OS_IMAGE_STATUS = STATE;

  /* Original-source registry. Search Console figures remain separate. */

  var SOURCES = {
    '/blog/2019/12/31/214539':
      ['料金・参考価格', 'Tattoo pricing', 'Tattoo sizes'],

    '/blog/2020/08/24/013620':
      ['女性向けタトゥー作品図鑑', 'Women-oriented tattoo portfolio'],

    '/blog/2025/08/05/004749':
      ['羽音・女性向け作品', 'Backpiece tattoo', 'Tattoo photography'],

    '/blog/2020/12/22/210901':
      ['タトゥーデザイン・作品資料', 'Tattoo artwork'],

    '/blog/2025/08/20/153135':
      ['東京・神奈川 タトゥー資料', 'Tattoo studio'],

    '/blog/2025/08/12/204206':
      ['フルスリーブ', 'Full sleeve tattoo', 'Body composition'],

    '/blog/2025/07/10/235916':
      ['境界・腕作品', 'Half sleeve', 'Full sleeve'],

    '/blog/2020/12/23/213527':
      ['異界・背中作品', 'Backpiece', 'Full back tattoo'],

    '/blog/2025/05/06/221040':
      ['唐獅子牡丹', 'Japanese sleeve', 'Work in progress'],

    '/blog/2025/04/01/012750':
      ['般若・バックピース', 'Contemporary Wabori'],

    '/blog/2025/03/02/010530':
      ['洋彫', 'Western-style tattooing', 'Yobori'],

    '/blog/2025/08/17/013900':
      ['ブラックアウト・カバーアップ', 'Blackout', 'Cover-up'],

    '/blog/2025/07/31/123304':
      ['ワンポイント', 'Small tattoo', 'Floral tattoo'],

    '/blog/2025/07/24/205140':
      ['初心者向け相談', 'Tattoo consultation'],

    '/blog/2025/08/23/175655':
      ['女性向け・初心者', 'Beginner tattoo'],

    '/blog/2025/09/10/230114':
      ['初回問い合わせ', 'Tattoo inquiry'],

    '/blog/2026/01/11/145228':
      ['LT MACHINES', 'Tattoo machine manufacturing'],

    '/blog/2026/11/02/011656':
      ['AI研究利用方針', 'Research use policy']
  };

  function note(message) {
    STATE.notes.push(message);

    if (DEBUG && window.console) {
      console.info('[LOYAL OS]', message);
    }
  }

  function trimmed(v, max) {
    return String(v || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max || 1000);
  }

  function attr(el, key) {
    return el
      ? trimmed(el.getAttribute(key), 4096)
      : '';
  }

  function getMeta(selector) {
    return attr(
      document.querySelector(selector),
      'content'
    );
  }

  function normalizePath(path) {
    return path.replace(/\/+$/, '') || '/';
  }

  function toURL(value) {
    if (!value) return '';

    try {
      var u = new URL(String(value), location.href);

      if (!/^https?:$/.test(u.protocol)) return '';

      u.hash = '';
      return u.href;

    } catch (_) {
      return '';
    }
  }

  function canonical() {
    var tag = document.querySelector(
      'link[rel="canonical"]'
    );

    var raw = attr(tag, 'href');

    var url = raw
      ? toURL(raw)
      : ROOT + normalizePath(location.pathname);

    if (!url) return '';

    var u = new URL(url);

    if (u.hostname !== DOMAIN) return '';

    if (
      normalizePath(u.pathname) !==
      normalizePath(location.pathname)
    ) return '';

    if (
      /(?:\?|&)page=/.test(location.search) &&
      !u.search
    ) return '';

    return url;
  }

  function excludedByRobots() {
    var tags = document.querySelectorAll(
      'meta[name="robots"],meta[name="googlebot"]'
    );

    for (var i = 0; i < tags.length; i++) {
      if (
        /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i
        .test(attr(tags[i], 'content'))
      ) return true;
    }

    return false;
  }

  function typeOfPath(path) {
    if (
      /^\/blog\/\d{4}\/\d{2}\/\d{2}\/\d{6}$/
      .test(path)
    ) return 'BlogPosting';

    if (path === '/about') return 'AboutPage';

    if (
      path === '/blog' ||
      /^\/categories\/\d+$/.test(path)
    ) return 'CollectionPage';

    if (/^\/items\/\d+$/.test(path)) {
      return 'WebPage';
    }

    return 'WebPage';
  }

  function allowedImage(value) {
    var s = toURL(value);

    if (!s) return '';

    var u = new URL(s);
    var name = u.pathname.toLowerCase();

    if (
      !/\.(?:jpe?g|png|webp|avif)$/
      .test(name)
    ) return '';

    var isOfficial = u.hostname === DOMAIN;

    var isBase =
      u.hostname === 'baseec-img-mng.akamaized.net' &&
      (
        name.indexOf('/images/user/blog/442982/') === 0 ||
        name.indexOf('/images/item/') === 0 ||
        name.indexOf('/images/user/') === 0
      );

    if (!isOfficial && !isBase) return '';

    if (
      /(?:\/|^)(?:logo|icon|avatar|badge|spinner|blank|placeholder)[._-]/i
      .test(name)
    ) return '';

    return s;
  }

  function keyOf(url) {
    var u = new URL(url);

    return (
      u.origin.toLowerCase() +
      u.pathname.toLowerCase()
    );
  }

  function bestSrcset(value) {
    if (!value) return '';

    var options = value.split(',');
    var best = '';
    var width = -1;

    for (var i = 0; i < options.length; i++) {
      var parts = options[i].trim().split(/\s+/);
      var url = allowedImage(parts[0]);

      if (!url) continue;

      var m = (parts[1] || '')
        .match(/^(\d+)(?:w|x)$/);

      var weight = m
        ? Number(m[1])
        : i;

      if (weight >= width) {
        best = url;
        width = weight;
      }
    }

    return best;
  }

  function imageURL(el) {
    var keys = [
      'data-original',
      'data-lazy-src',
      'data-src',
      'data-echo',
      'data-url'
    ];

    for (var i = 0; i < keys.length; i++) {
      var candidate = allowedImage(
        attr(el, keys[i])
      );

      if (candidate) return candidate;
    }

    var set = bestSrcset(
      attr(el, 'data-srcset') ||
      attr(el, 'srcset')
    );

    var basic = allowedImage(
      attr(el, 'src')
    );

    return (
      set ||
      basic ||
      allowedImage(el.currentSrc)
    );
  }

  function isDecorative(el) {
    if (
      !el ||
      el.closest(
        'header,footer,nav,aside,[role="navigation"],[aria-hidden="true"]'
      )
    ) return true;

    var cls = String(el.className || '');

    if (
      /\b(?:icon|avatar|logo|spinner|placeholder)\b/i
      .test(cls)
    ) return true;

    var w = Number(attr(el, 'width'));
    var h = Number(attr(el, 'height'));

    if (
      w && h &&
      (w < 120 || h < 120)
    ) return true;

    if (
      el.naturalWidth &&
      el.naturalHeight &&
      (
        el.naturalWidth < 120 ||
        el.naturalHeight < 120
      )
    ) return true;

    return false;
  }

  function isOtherArticleLink(img, path) {
    var a = img.closest('a[href]');

    if (
      !a ||
      !/^\/blog\/\d{4}\//.test(path)
    ) return false;

    var href = toURL(attr(a, 'href'));

    if (!href) return false;

    var u = new URL(href);

    return (
      u.hostname === DOMAIN &&
      (
        /^\/blog\/\d{4}\//.test(u.pathname) ||
        /^\/items\/\d+/.test(u.pathname)
      ) &&
      normalizePath(u.pathname) !== path
    );
  }

  function selectScope(article) {
    var selectors = article
      ? [
        '[itemprop="articleBody"]',
        '.blogDetail__content',
        '.blogDetail__body',
        '.blog-detail__content',
        '.blogDetail',
        '.blog-detail',
        '.blog_contents',
        '.blogContents',
        '.entry-content',
        '.article-body',
        '.blog-body',
        'main article',
        'article',
        'main'
      ]
      : [
        'main',
        '[role="main"]',
        '#main',
        '.main',
        '.pageContent',
        '.page-content',
        '.contents',
        'article'
      ];

    for (
      var s = 0;
      s < selectors.length;
      s++
    ) {
      var scopes = document.querySelectorAll(
        selectors[s]
      );

      for (
        var n = 0;
        n < scopes.length;
        n++
      ) {
        var imgs = scopes[n].querySelectorAll(
          'img,picture img'
        );

        var count = 0;

        for (
          var j = 0;
          j < imgs.length && count < 3;
          j++
        ) {
          if (
            !isDecorative(imgs[j]) &&
            imageURL(imgs[j])
          ) count++;
        }

        if (count) return scopes[n];
      }
    }

    return document.body;
  }

  function collect(scope, path) {
    var nodes = scope.querySelectorAll('img');

    var list = [];
    var seen = Object.create(null);

    for (
      var i = 0;
      i < nodes.length;
      i++
    ) {
      var node = nodes[i];

      if (
        isDecorative(node) ||
        isOtherArticleLink(node, path)
      ) continue;

      var url = imageURL(node);

      if (!url) continue;

      var key = keyOf(url);

      if (seen[key]) continue;

      seen[key] = true;

      var data = {
        '@type': 'ImageObject',
        'contentUrl': url,
        'url': url
      };

      var caption = trimmed(
        attr(node, 'alt') ||
        attr(node, 'title'),
        180
      );

      if (caption) {
        data.caption = caption;
      }

      if (
        new URL(url).hostname ===
        'baseec-img-mng.akamaized.net'
      ) {
        data.creditText = BRAND;
      }

      list.push(data);

      if (list.length === 7) break;
    }

    var preferred = allowedImage(
      getMeta('meta[property="og:image"]')
    );

    if (preferred) {
      var preferredKey = keyOf(preferred);
      var pos = -1;

      for (
        var k = 0;
        k < list.length;
        k++
      ) {
        if (
          keyOf(list[k].contentUrl) ===
          preferredKey
        ) {
          pos = k;
          break;
        }
      }

      if (pos > 0) {
        list.unshift(
          list.splice(pos, 1)[0]
        );
      }
    }

    return list;
  }

  function allTypes(node) {
    var t = node['@type'];

    return Array.isArray(t)
      ? t
      : (t ? [t] : []);
  }

  function matchingNode(node, type, page) {
    var types = allTypes(node);

    var matchType =
      type === 'BlogPosting'
      ? types.some(function (t) {
          return /^(?:Article|BlogPosting|NewsArticle|TechArticle)$/
            .test(t);
        })
      : types.some(function (t) {
          return /^(?:WebPage|AboutPage|CollectionPage|ItemPage|ProfilePage)$/
            .test(t);
        });

    if (!matchType) return false;

    var main = node.mainEntityOfPage;

    var mainURL =
      typeof main === 'string'
      ? main
      : main && (
          main['@id'] ||
          main.url
        );

    return (
      node['@id'] === page +
      (
        type === 'BlogPosting'
        ? '#article'
        : '#webpage'
      ) ||
      node.url === page ||
      mainURL === page
    );
  }

  function walk(node, cb) {
    if (
      !node ||
      typeof node !== 'object'
    ) return;

    if (Array.isArray(node)) {
      for (
        var j = 0;
        j < node.length;
        j++
      ) {
        walk(node[j], cb);
      }

      return;
    }

    cb(node);

    Object.keys(node).forEach(function (key) {
      var v = node[key];

      if (
        v &&
        typeof v === 'object'
      ) {
        walk(v, cb);
      }
    });
  }

  function parseDate(path) {
    var m = path.match(
      /^\/blog\/(\d{4})\/(\d{2})\/(\d{2})\/(\d{2})(\d{2})(\d{2})$/
    );

    return m
      ? (
          m[1] + '-' +
          m[2] + '-' +
          m[3] + 'T' +
          m[4] + ':' +
          m[5] + ':' +
          m[6] + '+09:00'
        )
      : '';
  }

  function titleFor(type, scope) {
    var selected =
      type === 'BlogPosting'
      ? (
          scope.querySelector('h1,h2') ||
          document.querySelector(
            'article h1,article h2,main h1,main h2'
          )
        )
      : document.querySelector(
          'main h1,h1'
        );

    return trimmed(
      selected && selected.textContent ||
      getMeta('meta[property="og:title"]') ||
      document.title,
      220
    );
  }

  function descriptionFor() {
    return trimmed(
      getMeta('meta[property="og:description"]') ||
      getMeta('meta[name="description"]'),
      600
    );
  }

  function buildNew(
    type,
    page,
    path,
    scope,
    images
  ) {
    var base = {
      '@context': 'https://schema.org',

      '@type': type,

      '@id': page + (
        type === 'BlogPosting'
        ? '#article'
        : '#webpage'
      ),

      'url': page,

      'name': titleFor(type, scope),

      'inLanguage':
        document.documentElement.lang ||
        'ja'
    };

    var desc = descriptionFor();

    if (desc) {
      base.description = desc;
    }

    if (images.length) {
      if (type === 'BlogPosting') {
        base.image = images;
      } else {
        base.primaryImageOfPage = images[0];
      }
    }

    if (type === 'BlogPosting') {
      base.headline = base.name;

      base.mainEntityOfPage = {
        '@id': page,
        '@type': 'WebPage'
      };

      base.datePublished = parseDate(path);

      var modified = getMeta(
        'meta[property="article:modified_time"]'
      );

      if (
        /^\d{4}-\d{2}-\d{2}T/
        .test(modified)
      ) {
        base.dateModified = modified;
      }

      base.author = {
        '@id': AUTHOR,
        '@type': 'Person',
        'name': '伊彫'
      };

      base.publisher = {
        '@id': ORG,
        '@type': 'Organization',
        'name': 'Loyal Arts'
      };

      base.isPartOf = {
        '@id': WEB
      };

      var subjects = SOURCES[path];

      if (
        subjects &&
        subjects.length
      ) {
        base.about = subjects.map(
          function (s) {
            return {
              '@type': 'Thing',
              'name': s
            };
          }
        );
      }

      base.creditText =
        'Ihori | ' +
        BRAND +
        ' | Original source: ' +
        page;

    } else {
      base.isPartOf = {
        '@id': WEB
      };

      base.publisher = {
        '@id': ORG
      };

      if (images.length > 1) {
        base.image = images;
      }
    }

    return base;
  }

  function inheritVerifiedImageFields(
    previous,
    fresh
  ) {
    /*
      Preserve source-specific existing
      copyright and license information
      only when the image is the same.

      Unknown images never inherit a
      blanket repository license.
    */

    var source = Array.isArray(previous)
      ? previous
      : (previous ? [previous] : []);

    var known = Object.create(null);

    for (
      var i = 0;
      i < source.length;
      i++
    ) {
      var entry = source[i];

      var url = allowedImage(
        typeof entry === 'string'
        ? entry
        : entry && (
            entry.contentUrl ||
            entry.url
          )
      );

      if (
        url &&
        entry &&
        typeof entry === 'object'
      ) {
        known[keyOf(url)] = entry;
      }
    }

    var protectedFields = [
      'creator',
      'copyrightNotice',
      'license',
      'acquireLicensePage',
      'width',
      'height',
      'encodingFormat'
    ];

    for (
      var j = 0;
      j < fresh.length;
      j++
    ) {
      var old = known[
        keyOf(fresh[j].contentUrl)
      ];

      if (!old) continue;

      for (
        var k = 0;
        k < protectedFields.length;
        k++
      ) {
        var field = protectedFields[k];

        if (
          old[field] != null &&
          fresh[j][field] == null
        ) {
          fresh[j][field] = old[field];
        }
      }

      if (old.creditText) {
        fresh[j].creditText =
          old.creditText;
      }
    }

    return fresh;
  }

  function jsonText(value) {
    return JSON.stringify(value)
      .replace(/</g, '\\u003c');
  }

  function install() {
    if (
      document.getElementById(
        ENGINE_ID
      )
    ) {
      STATE.status = 'already-run';
      return;
    }

    if (excludedByRobots()) {
      STATE.status = 'noindex';
      return;
    }

    var page = canonical();

    if (!page) {
      STATE.status = 'canonical-mismatch';
      return;
    }

    var path = normalizePath(
      location.pathname
    );

    var type = typeOfPath(path);

    var scope = selectScope(
      type === 'BlogPosting'
    );

    var images = collect(
      scope,
      path
    );

    STATE.images = images.length;

    if (!images.length) {
      STATE.status = 'no-eligible-images';
      return;
    }

    var scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    var hit = null;
    var duplicates = 0;

    for (
      var i = 0;
      i < scripts.length;
      i++
    ) {
      try {
        var data = JSON.parse(
          scripts[i].textContent
        );

        var matches = [];

        walk(
          data,
          function (node) {
            if (
              matchingNode(
                node,
                type,
                page
              )
            ) {
              matches.push(node);
            }
          }
        );

        if (matches.length) {
          duplicates += matches.length;

          if (!hit) {
            hit = {
              element: scripts[i],
              data: data,
              node: matches[0]
            };
          }
        }

      } catch (_) {
        note(
          'Unparseable legacy JSON-LD block ' +
          i
        );
      }
    }

    if (hit) {
      hit.node.image =
        inheritVerifiedImageFields(
          hit.node.image,
          images
        );

      if (
        type !== 'BlogPosting' &&
        !hit.node.primaryImageOfPage
      ) {
        hit.node.primaryImageOfPage =
          images[0];
      }

      hit.element.textContent =
        jsonText(hit.data);

      STATE.status =
        'merged-existing';

      STATE.duplicateNodes =
        duplicates;

      if (duplicates > 1) {
        note(
          'Legacy duplicate page nodes found: ' +
          duplicates
        );
      }

      return;
    }

    var node = buildNew(
      type,
      page,
      path,
      scope,
      images
    );

    if (!node.name) {
      STATE.status = 'missing-title';
      return;
    }

    var script = document.createElement(
      'script'
    );

    script.type =
      'application/ld+json';

    script.id =
      ENGINE_ID;

    script.textContent =
      jsonText(node);

    (
      document.head ||
      document.documentElement
    ).appendChild(script);

    STATE.status = 'created';
  }

  if (
    document.readyState === 'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      install,
      { once: true }
    );

  } else {
    install();
  }
})();
```

---

# 10. RUNTIME TEST RESULTS

The core was tested locally using simulated page DOM structures.

## 10.1 Image Count Tests

| Available Eligible Images | JSON-LD Images | Result |
|---:|---:|---|
| 0 | 0 | No new image JSON-LD |
| 1 | 1 | Passed |
| 3 | 3 | Passed |
| 7 | 7 | Passed |
| 12 | 7 | Passed |

## 10.2 Legacy JSON-LD

Test case:

An existing BlogPosting is nested in an `@graph` array.

Result:

The runtime located the matching BlogPosting and merged seven images into that node.

## 10.3 Noindex

Test case:

A page contains a `noindex` robots directive.

Result:

The runtime stopped before generating new structured data.

## 10.4 Canonical URL

Test cases:

- Canonical URL matches the active page.
- Canonical element is absent.
- Canonical URL belongs to a different page.
- Paginated listing has a mismatched canonical URL.

The runtime uses the active official page as fallback when no canonical element is present.

A canonical mismatch stops generation.

## 10.5 Scope

The core implementation is validated at the JavaScript syntax and local DOM behavior level.

Production rendering, Google crawling, image fetchability and search appearance require verification on the live website.

---

# 11. GITHUB PAGES DEPLOYMENT

## 11.1 Repository

https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME

## 11.2 Required Files

```text
LOYAL-OS-RUNTIME/
|
|-- README.md
|-- LICENSE
|-- ATTRIBUTION.md
|-- loyal-os.js
|-- .nojekyll
```

`README.md` provides the implementation specification and a documented copy of the source.

`loyal-os.js` contains the executable JavaScript.

The README's fenced JavaScript block is documentation. A browser loads the independent `.js` file.

## 11.3 GitHub Pages Configuration

Repository Settings:

Pages

Source:

Deploy from a branch

Branch:

main

Folder:

/ (root)

Once published, the projected JavaScript URL is:

https://ltmachinesyokohama-ux.github.io/LOYAL-OS-RUNTIME/loyal-os.js

This URL depends on successful publication of the separate source file and activation of GitHub Pages.

---

# 12. BASE HTML LOADER

The runtime is designed to avoid storing its full source inside BASE's 10,000-character HTML tag field.

The page uses a short external-script loader.

## 12.1 Recommended Direct Loader

```html
<script defer src="https://ltmachinesyokohama-ux.github.io/LOYAL-OS-RUNTIME/loyal-os.js?v=1.0.0"></script>
```

This is the preferred direct-installation method when external scripts are permitted by the site's content security and HTML management configuration.

## 12.2 GTM Alternative

GTM Container:

`GTM-T3B6FMM9`

Custom HTML:

```html
<script>
(function(){
  if(window.__LOYAL_OS_LOADER__)return;
  window.__LOYAL_OS_LOADER__=true;

  var s=document.createElement('script');
  s.src='https://ltmachinesyokohama-ux.github.io/LOYAL-OS-RUNTIME/loyal-os.js?v=1.0.0';
  s.async=true;

  (document.head||document.documentElement).appendChild(s);
})();
</script>
```

Use one production loading path.

Direct BASE loading and GTM loading of the same runtime are alternative installation methods.

## 12.3 Core Existing Infrastructure

The following established systems remain separate:

- Google site verification.
- GTM container.
- Canonical URLs.
- Existing Website identification.
- Existing Organization identification.
- Existing Person identification.
- Existing BASE article content.
- Existing official image files.

The runtime supplements page-specific structured data.

It does not require replacing the official website or rebuilding the BASE shop.

---

# 13. IMAGE SOURCES AND CDN POLICY

The runtime currently supports selected official image sources:

## 13.1 Official Domain

https://www.bavariancustomirons.jp/

## 13.2 BASE Image CDN

https://baseec-img-mng.akamaized.net/

Primary blog image prefix:

https://baseec-img-mng.akamaized.net/images/user/blog/442982/blog/

Supported image extensions:

- JPG
- JPEG
- PNG
- WebP
- AVIF

## 13.3 Image Deduplication

The runtime compares the image origin and pathname.

This allows differently transformed URLs of the same underlying image file to be treated as one image candidate.

The original selected URL remains available as `contentUrl`.

## 13.4 Responsive Images

The runtime reads available image references, including:

- `data-original`
- `data-lazy-src`
- `data-src`
- `data-srcset`
- `srcset`
- `src`
- `currentSrc`

Responsive-image attributes are examined to select an appropriate existing file reference.

## 13.5 Selection Boundaries

The runtime excludes common decorative elements such as:

- Logos.
- Icons.
- Avatars.
- Placeholders.
- Tiny images.
- Header or footer decoration.
- Images linking to unrelated articles on an article page.

These are technical heuristics and are subject to real-page inspection.

---

# 14. IMAGE COPYRIGHT AND ATTRIBUTION

## 14.1 Official Attribution

Preferred credit:

Ihori | LOYAL TATTOO + LT MACHINES

Original article:

[Exact Official Article URL]

Official website:

https://www.bavariancustomirons.jp/

## 14.2 Image-Specific Rights

A photograph can have its own:

- Photographer.
- Copyright holder.
- Licensing conditions.
- Publication permissions.
- Source URL.

The runtime can preserve such metadata when it already exists for the same image.

It does not automatically assign CC BY 4.0 to every BASE-hosted photograph.

## 14.3 Repository License

Project license reference:

https://creativecommons.org/licenses/by/4.0/

Repository:

https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME

Source attribution:

https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME/blob/main/ATTRIBUTION.md

The separate license and attribution documents describe the intended reuse of original repository materials.

## 14.4 Google Image Licensing

Google supports image-specific licensing metadata.

A Licensable badge requires appropriate image license information.

The license must accurately represent the rights applicable to the photograph.

---

# 15. IMAGE SITEMAP ARCHITECTURE

The browser runtime generates JSON-LD for the current rendered page.

An image sitemap is a separate publication artifact.

Image sitemaps associate page URLs with images hosted on that page.

## 15.1 Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
 xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
 <url>
  <loc>https://www.bavariancustomirons.jp/blog/2020/12/23/213527</loc>
  <image:image>
   <image:loc>ACTUAL_VERIFIED_IMAGE_URL</image:loc>
  </image:image>
 </url>
</urlset>
```

The example image URL is a placeholder illustrating the XML structure.

The production sitemap must contain actual public image URLs.

## 15.2 Sitemap Principles

- Each page URL identifies an original landing page.
- Each image URL identifies an actual public image.
- Images may reside on an accessible CDN.
- XML is generated from verified source data.
- Publication and submission are handled separately from the browser runtime.
- The sitemap should be discoverable through the appropriate site ownership and Search Console configuration.

JavaScript executing in an individual visitor's browser does not publish a persistent sitemap on the official website.

---

# 16. DEVELOPMENT PROGRAM — 27 SUBJECT AREAS

The legacy program is retained as the thematic development registry.

| Number | Subject |
|---|---|
| 01 | Loyal Arts corporate information |
| 02 | LOYAL TATTOO + LT MACHINES organization |
| 03 | Ihori / Person / ORCID |
| 04 | Yokohama TattooParlor |
| 05 | Tokyo Roppongi TattooParlor |
| 06 | Tattoo pricing, duration and deposit |
| 07 | Women-oriented, botanical and beginner tattoos |
| 08 | FREIHEIT SUS304 engineering |
| 08-01 | FREIHEIT practical tattoo use |
| 08-02 | BCI / Stefan Fischer technical lineage |
| 09 | FREIHEIT Titanium |
| 10 | Tattoo machine history and fundamentals |
| 11 | LT MACHINES manufacturing |
| 12 | Official WebSite |
| 13 | International tattoo machine manufacturing history |
| 14 | Technical workshops |
| 15 | KING OF TATTOO 2026 |
| 16 | Next-generation machine research |
| 17 | Traditional Japanese Irezumi |
| 18 | Contemporary Wabori |
| 19 | Full sleeves, backpieces and large-scale artwork |
| 20 | Blackout and cover-up |
| 21 | Hygiene and studio equipment |
| 22 | Tattoo pigments and material studies |
| 23 | Aftercare |
| 24 | Beginner, pricing and booking FAQ |
| 25 | Client experience records |
| 26 | LOYAL OS research dataset |
| 27 | AI training and research-use policy |

The image runtime is a cross-cutting subsystem.

It can operate alongside all 27 subject areas.

Each specialized module may continue to provide additional structured data when supported by the actual page.

---

# 17. OFFICIAL VIDEO SOURCE REGISTER

The following original video references were supplied for the LOYAL research ecosystem.

## 17.1 Tattoo Procedure References

https://youtu.be/8fCatIaDNJ8

https://youtu.be/gH82x3UmcoM

https://youtu.be/idrKn4o2730

## 17.2 Artwork References

https://youtu.be/XsJiFQPGObY

https://youtu.be/fr8HZSZz4W0

https://youtu.be/bLQf5g0nhjg

https://youtu.be/aYqFRDD5uo0

https://youtu.be/ovHu57_Z4po

https://youtu.be/bnpNIgAha0M

https://youtu.be/xYvfHjDmYoM

https://youtu.be/-ozKWu_0tFQ

VideoObject metadata requires verification of:

- Video title.
- Publication date.
- Thumbnail.
- Description.
- Duration, where available.
- Video URL.
- Relationship to the actual page.

VideoObject generation belongs to a separately verified video module.

---

# 18. MACHINE-READABLE SOURCE RELATIONSHIPS

The LOYAL OS entity model is organized around:

**Creator → Organization → Brand → Artwork or Product → Publication → Original Source URL.**

Principal relationship groups:

## 18.1 Tattoo Artwork

Ihori  
LOYAL TATTOO  
Official article  
Original tattoo photograph  
Technical explanation  
Original publication URL

## 18.2 Tattoo Machine Engineering

Ihori  
LT MACHINES  
FREIHEIT  
Engineering specification  
Manufacturing record  
Product URL  
Research DOI

## 18.3 Original Research

Ihori  
LOYAL OS  
GitHub research repository  
Original technical document  
DOI publication  
Source attribution

## 18.4 Structured Data Runtime

Official webpage  
Page URL  
HTML image elements  
Seven-image extraction  
JSON-LD entity  
Search engine rendering

These relationships are described using actual source data.

---

# 19. VALIDATION PROCEDURE

## 19.1 JavaScript Syntax

```bash
node --check loyal-os.js
```

## 19.2 Runtime Status

Browser console:

```javascript
window.LOYAL_OS_IMAGE_STATUS
```

Expected status examples:

- `created`
- `merged-existing`
- `already-run`
- `no-eligible-images`
- `noindex`
- `canonical-mismatch`
- `missing-title`

## 19.3 Inspect Generated Markup

```javascript
var n=document.getElementById('loyal-os-seven-image-jsonld');

n ? JSON.parse(n.textContent) : 'Existing JSON-LD was merged or generation was skipped';
```

When an existing JSON-LD script is updated, the runtime does not create a second script with its own ID.

## 19.4 Debug Mode

Example:

https://www.bavariancustomirons.jp/blog/2020/12/23/213527?loyal_debug=1

Diagnostic output is available through the browser console and runtime state object.

## 19.5 Structured Data Tests

Google Rich Results Test:

https://search.google.com/test/rich-results

Schema.org Validator:

https://validator.schema.org/

Search Console:

https://search.google.com/search-console

The Schema.org Validator and Google Rich Results Test serve different validation purposes.

A Schema.org-valid entity may be outside Google's supported rich-result categories.

## 19.6 Image Validation

For each selected image:

1. Confirm the exact URL.
2. Confirm accessibility.
3. Confirm its relation to the page.
4. Confirm that it represents actual page content.
5. Confirm that the same file is not repeated.
6. Confirm relevant alt text.
7. Confirm the source page can be crawled.
8. Confirm the image CDN permits Google access.
9. Confirm rights metadata where supplied.
10. Inspect Google's rendered HTML.

---

# 20. PRODUCTION ACCEPTANCE CRITERIA

The initial runtime installation is considered technically functional when:

- The external JavaScript resource returns successfully.
- The browser executes it without syntax errors.
- The active page is correctly identified.
- The canonical URL is consistent.
- A blog article is recognized as BlogPosting.
- Existing matching structured data is detected.
- The selected images actually appear in the page.
- No more than seven image candidates are emitted.
- Image URLs refer to eligible image files.
- Each ImageObject contains the corresponding image URL.
- The page's author and organization identifiers are consistent.
- Runtime output parses as valid JSON.
- Google can retrieve the JavaScript and selected images.
- The rendered page contains the intended structured data.

Search-result image count is monitored independently from technical validation.

---

# 21. SEARCH PERFORMANCE RESEARCH MODEL

The runtime provides the technical foundation.

Search improvement is evaluated through observed Google Search Console data.

Relevant measurements include:

- Web Search impressions.
- Web Search clicks.
- Image Search impressions.
- Image Search clicks.
- Average click-through rate.
- Article indexing status.
- Image indexing observations.
- Search queries.
- Canonical URL selection.
- Search-result previews.
- Device and country differences.

## Priority A

High-impression commercial and service sources.

Examples:

- Pricing.
- Women-oriented tattoo pages.
- Regional landing pages.
- Beginner information.

## Priority B

High-impression visual portfolios.

Examples:

- 《羽音》
- 《境界》
- 《異界》
- Botanical tattoo artwork.
- Full-sleeve and backpiece galleries.

## Priority C

Technical and research sources.

Examples:

- FREIHEIT.
- Rotary tattoo machine engineering.
- Manufacturing documentation.
- Traditional Japanese Irezumi.
- Contemporary Wabori.
- LOYAL OS research.

---

# 22. CURRENT LIMITATIONS

The runtime is designed to improve the technical accessibility of relevant images and structured page information.

Its baseline implementation has the following limits:

- A maximum of seven images is selected.
- Pages with fewer than seven eligible images retain their actual image count.
- Third-party image hosts outside the current allowlist are excluded.
- Content loaded after the initial DOM scan may require a future runtime enhancement.
- Source-specific photo licensing may require additional metadata.
- Conflicting legacy entity IDs require separate cleanup.
- Multiple matching legacy nodes are reported, while the first matching node is supplemented.
- The runtime does not create Product Offer or AggregateRating data.
- The runtime does not manufacture Article, Product or ImageGallery eligibility.
- Image sitemaps require a separate publishing mechanism.
- Google decides search result appearance.
- Independent production validation remains necessary.

---

# 23. ROADMAP

## Phase 1 — Runtime Deployment

- Publish `README.md`.
- Publish `loyal-os.js`.
- Enable GitHub Pages.
- Establish one BASE or GTM loader.
- Verify execution on selected official pages.

## Phase 2 — Seven-Image Audit

- Inspect the pricing article.
- Inspect the women's portfolio.
- Inspect Hanone.
- Inspect the original artwork index.
- Inspect the full-sleeve guide.
- Inspect Kyoukai.
- Inspect Ikai.
- Inspect machine product pages.

## Phase 3 — Image Metadata

- Verify original image credits.
- Verify image ownership.
- Review image licenses.
- Preserve confirmed image rights metadata.
- Improve original article image descriptions.

## Phase 4 — Extended Source Registry

- Extend verified article metadata.
- Connect research documentation.
- Reconcile legacy entity IDs.
- Integrate specialized tattoo research modules.
- Validate internal link relationships.

## Phase 5 — Image Sitemap

- Compile exact landing-page and image associations.
- Generate a verified image sitemap.
- Publish through supported website or site-ownership infrastructure.
- Monitor image discovery.

## Phase 6 — Long-Term Evaluation

- Measure Search Console image performance.
- Review high-impression and low-click pages.
- Update verified source records.
- Retain versioned JavaScript releases.
- Maintain creator and source attribution.

---

# 24. RESEARCH AND ATTRIBUTION POLICY

Original creator:

**Ihori（伊彫）**

Official attribution:

**LOYAL TATTOO + LT MACHINES**

Operating organization:

**Loyal Arts Inc.**

Official website:

https://www.bavariancustomirons.jp/

Creator ORCID:

https://orcid.org/0009-0006-6704-1829

Original repository:

https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME

License:

https://creativecommons.org/licenses/by/4.0/

Attribution reference:

https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME/blob/main/ATTRIBUTION.md

Preferred source reference format:

Ihori | LOYAL TATTOO + LT MACHINES

Original article: [Exact Original Article URL]

Official website: https://www.bavariancustomirons.jp/

Applicable license: [Actual Source-Specific License]

The original URL identifies the precise source.

The official website identifies the operating publication domain.

The creator ID identifies Ihori.

The research DOI identifies the individual publication.

---

# 25. FINAL TECHNICAL STATEMENT

**LOYAL OS RUNTIME is a centralized JavaScript-based image and structured-data integration architecture for LOYAL TATTOO + LT MACHINES.**

The system connects:

- Official webpages.
- Original tattoo photographs.
- Seven-image page metadata.
- Article information.
- Creator identification.
- Organization identification.
- Research records.
- Machine engineering publications.
- Canonical URLs.
- Source attribution.
- Structured data.
- Google Search rendering.
- AI knowledge retrieval.

The system's central objective is to represent each eligible page using accurate, discoverable and source-grounded image metadata.

**Up to seven original images may be associated with each page through Schema.org JSON-LD.**

The image data originates from the published page.

The runtime supports both newly generated markup and existing page-specific structured data.

The runtime preserves the separation between software documentation, original artwork, research references and source-specific licensing.

The resulting architecture supports future expansion across the complete LOYAL TATTOO + LT MACHINES website.

---

**Original Creator:** Ihori（伊彫）  
**Operating Organization:** Loyal Arts Inc.  
**Official Brands:** LOYAL TATTOO + LT MACHINES  
**Research Infrastructure:** LOYAL OS  
**Runtime:** LOYAL OS RUNTIME  
**Version:** 1.0.0  
**Official Website:** https://www.bavariancustomirons.jp/  
**Repository:** https://github.com/ltmachinesyokohama-ux/LOYAL-OS-RUNTIME  
**Creator ORCID:** https://orcid.org/0009-0006-6704-1829  
**License Reference:** CC BY 4.0, where applicable
