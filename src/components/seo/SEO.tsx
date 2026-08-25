import { useEffect } from "react";

export const SITE_URL = "https://www.vipinraj.in";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const SITE_NAME = "Vipin Raj";

const DEFAULT_LOCALE = "en_IN";

export interface SEOProps {
  /**
   * Browser/search-result title.
   */
  title: string;

  /**
   * Search-result description.
   *
   * Keep this concise and naturally descriptive.
   */
  description: string;

  /**
   * Canonical path.
   *
   * Examples:
   * "/"
   * "/about"
   * "/services"
   * "/contact"
   */
  canonicalPath: string;

  /**
   * Optional Open Graph image.
   *
   * Must be an absolute URL.
   */
  ogImage?: string;

  /**
   * Open Graph type.
   *
   * Default: "website"
   */
  ogType?: "website" | "article";

  /**
   * Robots directive.
   *
   * Default:
   * "index, follow"
   *
   * Use "noindex, nofollow" only for pages
   * that should not appear in Google.
   */
  robots?: string;

  /**
   * Optional page language.
   *
   * Default: "en-IN"
   */
  language?: string;

  /**
   * Optional article metadata.
   */
  publishedTime?: string;

  /**
   * Optional article metadata.
   */
  modifiedTime?: string;

  /**
   * Optional article author.
   */
  author?: string;
}

/**
 * Ensure a path always begins with "/".
 */
const normalizePath = (path: string): string => {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
};

/**
 * Create an absolute canonical URL.
 */
const buildCanonicalUrl = (path: string): string => {
  const normalizedPath = normalizePath(path);

  return normalizedPath === "/"
    ? `${SITE_URL}/`
    : `${SITE_URL}${normalizedPath}`;
};

/**
 * Set or update a <meta> tag created by this SEO component.
 *
 * The data-seo attribute prevents this component from accidentally
 * modifying unrelated metadata defined elsewhere in index.html.
 */
const setMetaTag = (
  selector: string,
  attributes: Record<string, string>,
): HTMLMetaElement => {
  let element = document?.head.querySelector<HTMLMetaElement>(
    `meta[data-seo="true"][${selector}]`,
  );

  if (!element) {
    element = document?.createElement("meta");

    element?.setAttribute("data-seo", "true");

    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });

    document?.head.appendChild(element);
  } else {
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
  }

  return element;
};

/**
 * Set or update the canonical URL.
 */
const setCanonical = (url: string): HTMLLinkElement => {
  let element = document?.head.querySelector<HTMLLinkElement>(
    'link[data-seo="true"][rel="canonical"]',
  );

  if (!element) {
    element = document?.createElement("link");

    element?.setAttribute("rel", "canonical");
    element?.setAttribute("data-seo", "true");

    document?.head.appendChild(element);
  }

  element?.setAttribute("href", url);

  return element;
};

/**
 * Set or update JSON-LD structured data.
 */
const setJsonLd = (data: Record<string, unknown>): HTMLScriptElement => {
  const id = "seo-webpage-jsonld";

  let script = document.getElementById(id) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");

    script.id = id;
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "true");

    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);

  return script;
};

/**
 * Production-grade SEO component for the Twinkle Offset Press website.
 *
 * This component is designed for a Vite + React SPA.
 *
 * Note:
 * Google can process JavaScript-generated metadata, but server-side
 * rendered/prerendered HTML is still preferable for maximum SEO.
 */
const SEO = ({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  robots = "index, follow",
  language = "en-IN",
  publishedTime,
  modifiedTime,
  author,
}: SEOProps) => {
  const canonical = buildCanonicalUrl(canonicalPath);

  useEffect(() => {
    /*
     * ---------------------------------------------------------
     * TITLE
     * ---------------------------------------------------------
     */

    document.title = title;

    /*
     * ---------------------------------------------------------
     * STANDARD META
     * ---------------------------------------------------------
     */

    setMetaTag('name="description"', {
      name: "description",
      content: description,
    });

    setMetaTag('name="robots"', {
      name: "robots",
      content: robots,
    });

    setMetaTag('name="language"', {
      name: "language",
      content: language,
    });

    /*
     * ---------------------------------------------------------
     * OPEN GRAPH
     * ---------------------------------------------------------
     */

    setMetaTag('property="og:type"', {
      property: "og:type",
      content: ogType,
    });

    setMetaTag('property="og:title"', {
      property: "og:title",
      content: title,
    });

    setMetaTag('property="og:description"', {
      property: "og:description",
      content: description,
    });

    setMetaTag('property="og:url"', {
      property: "og:url",
      content: canonical,
    });

    setMetaTag('property="og:image"', {
      property: "og:image",
      content: ogImage,
    });

    setMetaTag('property="og:image:width"', {
      property: "og:image:width",
      content: "1200",
    });

    setMetaTag('property="og:image:height"', {
      property: "og:image:height",
      content: "630",
    });

    setMetaTag('property="og:image:alt"', {
      property: "og:image:alt",
      content: `${SITE_NAME} - Software Developer`,
    });

    setMetaTag('property="og:site_name"', {
      property: "og:site_name",
      content: SITE_NAME,
    });

    setMetaTag('property="og:locale"', {
      property: "og:locale",
      content: DEFAULT_LOCALE,
    });

    /*
     * ---------------------------------------------------------
     * TWITTER / X
     * ---------------------------------------------------------
     */

    setMetaTag('name="twitter:card"', {
      name: "twitter:card",
      content: "summary_large_image",
    });

    setMetaTag('name="twitter:title"', {
      name: "twitter:title",
      content: title,
    });

    setMetaTag('name="twitter:description"', {
      name: "twitter:description",
      content: description,
    });

    setMetaTag('name="twitter:image"', {
      name: "twitter:image",
      content: ogImage,
    });

    setMetaTag('name="twitter:image:alt"', {
      name: "twitter:image:alt",
      content: `${SITE_NAME} - Premium Printing Services in Balussery, Kozhikode`,
    });

    /*
     * ---------------------------------------------------------
     * CANONICAL
     * ---------------------------------------------------------
     */

    setCanonical(canonical);

    /*
     * ---------------------------------------------------------
     * ARTICLE METADATA
     * ---------------------------------------------------------
     *
     * Only populated when the page is an article.
     */

    if (ogType === "article") {
      if (publishedTime) {
        setMetaTag('property="article:published_time"', {
          property: "article:published_time",
          content: publishedTime,
        });
      }

      if (modifiedTime) {
        setMetaTag('property="article:modified_time"', {
          property: "article:modified_time",
          content: modifiedTime,
        });
      }

      if (author) {
        setMetaTag('property="article:author"', {
          property: "article:author",
          content: author,
        });
      }
    }

    /*
     * ---------------------------------------------------------
     * WEBPAGE JSON-LD
     * ---------------------------------------------------------
     */

    setJsonLd({
      "@context": "https://schema.org",
      "@type": "WebPage",

      "@id": `${canonical}#webpage`,

      name: title,

      description,

      url: canonical,

      inLanguage: language,

      isPartOf: {
        "@type": "WebSite",

        "@id": `${SITE_URL}/#website`,

        name: SITE_NAME,

        url: `${SITE_URL}/`,
      },

      publisher: {
        "@type": "Organization",

        name: SITE_NAME,

        url: `${SITE_URL}/`,

        logo: {
          "@type": "ImageObject",

          url: `${SITE_URL}/favicon.svg`,
        },
      },

      ...(publishedTime && {
        datePublished: publishedTime,
      }),

      ...(modifiedTime && {
        dateModified: modifiedTime,
      }),

      ...(author && {
        author: {
          "@type": "Person",
          name: author,
        },
      }),
    });

    /*
     * ---------------------------------------------------------
     * CLEANUP
     * ---------------------------------------------------------
     *
     * Only remove elements created by this component.
     */

    return () => {
      document
        .head
        .querySelectorAll('[data-seo="true"]')
        .forEach((element) => {
          element.remove();
        });
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogType,
    robots,
    language,
    publishedTime,
    modifiedTime,
    author,
  ]);

  return null;
};

export default SEO;