/**
 * Polyfill version of intersection observer API (for older or unsupport browser)
 *
 * Note:
 *  - intersection observer API can be used for supported browsers.
 *  - There are potential performance issues on such polyfill.
 *  - Use intersection observer wherever possible, and fall back to event handlers
 *    if the widest possible compatibility is a critical application requirement.
 *
 * Reference:
 * - https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
 */

document.addEventListener("DOMContentLoaded", function() {
    // Get all elements with img.lazy
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    let active = false; // use to throttle function calls

    // event handlers
    const lazyLoad = function() {
        if (active === false) {
            active = true;

            // Set timeout delay processing
            setTimeout(function() {
                lazyImages.forEach(function(lazyImage) {
                    // Utilize element.getBoundingClientRect() to determine whther element is in viewport
                    if (
                        lazyImage.getBoundingClientRect().top <=
                            window.innerHeight &&
                        lazyImage.getBoundingClientRect().bottom >= 0 &&
                        getComputedStyle(lazyImage).display !== "none"
                    ) {
                        // Assign data to img element
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.classList.remove("lazy");

                        // If image is lazy loaded, remove them from lazyImages arrays
                        lazyImages = lazyImages.filter(function(image) {
                            return image !== lazyImage;
                        });

                        // Unsubscribe all events when all images are lazy loaded
                        if (lazyImages.length === 0) {
                            document.removeEventListener("scroll", lazyLoad);
                            window.removeEventListener("resize", lazyLoad);
                            window.removeEventListener(
                                "orientationchange",
                                lazyLoad
                            );
                        }
                    }
                });

                active = false;
            }, 200);
        }
    };

    // Subscribe to events
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
});
