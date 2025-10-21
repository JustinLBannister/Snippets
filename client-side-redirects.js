/**
 * redirect-rbccm.js
 * ------------------
 * This script handles client-side redirects for legacy RBC Capital Markets URLs.
 * It looks for specific fragments of the current page's URL (case-insensitive)
 * and redirects users to updated destinations.
 *
 * Why this exists:
 *  - Keeps old bookmarked or indexed URLs working.
 *  - Provides client-side fallbacks where server-level 301 redirects aren't possible.
 *  - Easy to update and maintain (edit the map below to add/change redirects).
 *
 * Note: Client-side redirects are temporary and should ideally be replaced
 *       by permanent server redirects (HTTP 301) for SEO and analytics accuracy.
 */

$(document).ready(function () {

  /**
   * Redirect map
   * ------------
   * Each key represents part of an old URL (a substring to search for).
   * Each value is the new destination URL (relative to domain root).
   * The script checks the current page's URL against these keys and redirects
   * to the corresponding new path when a match is found.
   */
  const redirects = {
    "insights/macro-minutes": "/en/insights/podcasts/macro-minutes",
    "insights/powering-sustainable-ideas": "/en/insights/podcasts/powering-sustainable-ideas",
    "insights/markets-in-motion": "/en/insights/podcasts/markets-in-motion",
    "insights/strategic-alternatives-podcast": "/en/insights/podcasts/strategic-alternatives",
    "gib/ma-inflection-points/about-the-team": "/en/insights/strategic-alternatives/about-the-team",
    "gib/biopharma": "/en/insights/podcasts/biopharma",
    "gib/technology": "/gib/technology" // ✅ Updated destination
  };

  // Grab the full URL and make it lowercase for case-insensitive matching
  const currentURL = window.location.href.toLowerCase();

  // Track if any redirect has been triggered (for debug safety)
  let redirected = false;

  /**
   * Loop through each key in the redirects map
   * ------------------------------------------
   * - Checks if the current URL contains the key substring
   * - If so, logs a message for debugging
   * - Redirects to the new URL
   * - Stops further checking after the first match
   */
  for (const oldPath in redirects) {
    if (currentURL.indexOf(oldPath.toLowerCase()) !== -1) {
      const newURL = redirects[oldPath];
      console.log(`[redirect-rbccm.js] Redirecting: matched "${oldPath}" → "${newURL}"`);
      window.location.href = newURL;
      redirected = true;
      break; // Stop after first valid match
    }
  }

  /**
   * If no redirect occurred, optionally log that as well
   * ----------------------------------------------------
   * (You can comment this out in production if desired)
   */
  if (!redirected) {
    console.log("[redirect-rbccm.js] No redirect triggered for this page.");
  }
});