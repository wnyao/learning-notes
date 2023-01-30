/**
 *
 * Example of expanding list build through a customized built-in element
 *
 * Further readings:
 * - https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
 * - https://github.com/mdn/web-components-examples/tree/master/expanding-list-web-component
 *
 */

// Create a class for the element
class ExpandingList extends HTMLUListElement {
  constructor() {
    // Always call super first in constructor
    super();

    window.onload = function () {
      const uls = Array.from(document.querySelectorAll(":root ul"));
      const lis = Array.from(document.querySelectorAll(":root li"));

      uls.slice(1).forEach((ul) => {
        ul.style.display = "none";
      });

      // Frame all li text content in span elements
      lis.forEach((li) => {
        const childText = li.childNodes[0]; // Object type
        const newSpan = document.createElement("span");

        newSpan.textContent = childText.textContent; // Assign text content to span only
        childText.parentNode.insertBefore(newSpan, childText); // Insert span-framed element to li
        childText.parentNode.removeChild(childText); // Remove initial child text
      });

      const spans = Array.from(document.querySelectorAll(":root span"));

      spans.forEach((span) => {
        if (span.nextElementSibling) {
          // if next sibling element is found; list within a list
          span.style.cursor = "pointer";
          span.parentNode.setAttribute("class", "closed");
          span.onclick = showul;
        }
      });

      function showul(e) {
        const nextul = e.target.nextElementSibling;

        // If opened then close
        if (nextul.style.display == "block") {
          nextul.style.display = "none";
          nextul.parentNode.setAttribute("class", "closed");
        } else {
          // Else closed then open
          nextul.style.display = "block";
          nextul.parentNode.setAttribute("class", "open");
        }
      }
    };
  }
}

// Define the new element
customElements.define("expanding-list", ExpandingList, { extends: "ul" });
