# JavaScript DOM - Student Learning Guide

## Table of Contents
- [Section 1: Getting Started](#section-1-getting-started)
- [Section 2: Selecting Elements](#section-2-selecting-elements)
- [Section 3: Traversing Elements](#section-3-traversing-elements)
- [Section 4: Manipulating Elements](#section-4-manipulating-elements)
- [Section 5: Working with Attributes](#section-5-working-with-attributes)
- [Section 6: Manipulating Element Styles](#section-6-manipulating-element-styles)
- [Section 7: Working with Events](#section-7-working-with-events)

---

## Section 1: Getting Started

### Understanding the Document Object Model (DOM)

The DOM is a programming interface for HTML documents. It represents the structure of a document as a tree of objects that JavaScript can manipulate.

**Key Concepts:**
- The DOM treats HTML elements as objects
- Each element becomes a node in the DOM tree
- JavaScript can access, modify, add, or delete these nodes
- Changes to the DOM are reflected immediately in the browser

**Example:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a paragraph</p>
  </body>
</html>
```

---

## Section 2: Selecting Elements

Learn different methods to select DOM elements for manipulation.

### Core Selection Methods

| Method | Description | Returns | Example |
|--------|-------------|---------|---------|
| `getElementById()` | Select element by unique ID | Single element or null | `document.getElementById('myId')` |
| `getElementsByName()` | Select elements by name attribute | NodeList | `document.getElementsByName('username')` |
| `getElementsByTagName()` | Select elements by tag name | HTMLCollection | `document.getElementsByTagName('p')` |
| `getElementsByClassName()` | Select elements by class name(s) | HTMLCollection | `document.getElementsByClassName('highlight')` |
| `querySelector()` | Select first element matching CSS selector | Single element or null | `document.querySelector('.class')` |
| `querySelectorAll()` | Select all elements matching CSS selector | NodeList | `document.querySelectorAll('div.container')` |

### Practical Examples

```javascript
// Select by ID
const header = document.getElementById('main-header');

// Select by class name
const buttons = document.getElementsByClassName('btn');

// Select using CSS selectors (most flexible)
const firstButton = document.querySelector('.btn');
const allButtons = document.querySelectorAll('.btn');
```

---

## Section 3: Traversing Elements

Navigate between related elements in the DOM tree.

### Parent-Child Relationships

```javascript
const element = document.getElementById('myElement');

// Get parent element
const parent = element.parentNode;
const parentElement = element.parentElement;

// Get child elements
const children = element.children; // HTMLCollection
const childNodes = element.childNodes; // NodeList (includes text nodes)
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Get siblings
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;
```

### Navigation Methods Summary

- **Parent Access:** `parentNode`, `parentElement`
- **Child Access:** `children`, `childNodes`, `firstElementChild`, `lastElementChild`
- **Sibling Access:** `nextElementSibling`, `previousElementSibling`

---

## Section 4: Manipulating Elements

Create, modify, and organize DOM elements.

### Creating Elements

```javascript
// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';

// Append to parent
document.body.appendChild(newDiv);
```

### Content Manipulation

```javascript
const element = document.getElementById('myElement');

// Text content (safe from XSS)
element.textContent = 'Plain text content';

// HTML content (use carefully)
element.innerHTML = '<strong>Bold text</strong>';
```

### Element Insertion Methods

| Method | Description | Position |
|--------|-------------|----------|
| `appendChild()` | Add as last child | End of parent |
| `append()` | Add multiple nodes/text | End of parent |
| `prepend()` | Add as first child | Beginning of parent |
| `after()` | Insert after element | After target |
| `insertBefore()` | Insert before element | Before target |
| `insertAdjacentHTML()` | Insert HTML at position | Specified position |

### Advanced Manipulation

```javascript
// Clone elements
const clone = element.cloneNode(true); // true = deep clone

// Replace elements
parent.replaceChild(newElement, oldElement);

// Remove elements
parent.removeChild(element);
// or (modern approach)
element.remove();

// Document fragments for efficient DOM manipulation
const fragment = document.createDocumentFragment();
// Add multiple elements to fragment, then append fragment to DOM
```

---

## Section 5: Working with Attributes

Manage HTML attributes programmatically.

### Attribute Methods

```javascript
const element = document.getElementById('myElement');

// Set attribute
element.setAttribute('class', 'highlight');

// Get attribute
const className = element.getAttribute('class');

// Remove attribute
element.removeAttribute('data-temp');

// Check if attribute exists
const hasId = element.hasAttribute('id');
```

### HTML Attributes vs DOM Properties

```javascript
// Attribute (as written in HTML)
element.setAttribute('value', 'initial');

// Property (current state)
element.value = 'current value';

// They can differ!
console.log(element.getAttribute('value')); // 'initial'
console.log(element.value); // 'current value'
```

---

## Section 6: Manipulating Element Styles

Control the visual presentation of elements.

### Inline Styles

```javascript
const element = document.getElementById('myElement');

// Set individual styles
element.style.color = 'red';
element.style.fontSize = '20px';
element.style.backgroundColor = 'yellow';

// Get computed styles
const styles = getComputedStyle(element);
console.log(styles.color);
```

### CSS Classes

```javascript
// Using className (string manipulation)
element.className = 'class1 class2';

// Using classList (recommended)
element.classList.add('new-class');
element.classList.remove('old-class');
element.classList.toggle('active');
element.classList.contains('highlight'); // returns boolean
```

### Element Dimensions

```javascript
// Get element dimensions
const width = element.offsetWidth;  // includes padding, border
const height = element.offsetHeight;
const clientWidth = element.clientWidth;  // excludes border
const scrollWidth = element.scrollWidth; // total content width
```

---

## Section 7: Working with Events

Handle user interactions and browser events.

### Event Handling Methods

```javascript
// Method 1: HTML attribute (not recommended)
<button onclick="alert('Clicked!')">Click me</button>

// Method 2: DOM property
button.onclick = function() {
    alert('Clicked!');
};

// Method 3: Event listeners (recommended)
button.addEventListener('click', function() {
    alert('Clicked!');
});
```

### Common Event Types

#### Page Load Events
- **`load`** - Fires when page and all resources are loaded
- **`DOMContentLoaded`** - Fires when DOM is ready (before images load)
- **`beforeunload`** - Before page unloads
- **`unload`** - When page unloads

```javascript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready!');
});

window.addEventListener('load', function() {
    console.log('Page fully loaded!');
});
```

#### Mouse Events
- `click`, `dblclick`
- `mousedown`, `mouseup`
- `mouseover`, `mouseout`
- `mouseenter`, `mouseleave`
- `mousemove`

#### Keyboard Events
- `keydown`, `keyup`, `keypress`

```javascript
document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.keyCode);
});
```

#### Other Important Events
- **Scroll Events:** `scroll`
- **Focus Events:** `focus`, `blur`
- **Form Events:** `submit`, `change`, `input`
- **Hash Change:** `hashchange`

### Advanced Event Concepts

#### Event Delegation
Handle events on parent elements instead of individual children:

```javascript
// Instead of adding listeners to each button
document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.classList.contains('button')) {
        console.log('Button clicked:', event.target.textContent);
    }
});
```

#### Custom Events

```javascript
// Create custom event
const customEvent = new CustomEvent('myCustomEvent', {
    detail: { message: 'Hello from custom event!' }
});

// Dispatch event
element.dispatchEvent(customEvent);

// Listen for custom event
element.addEventListener('myCustomEvent', function(event) {
    console.log(event.detail.message);
});
```

#### MutationObserver
Monitor DOM changes:

```javascript
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log('DOM changed:', mutation.type);
    });
});

observer.observe(targetElement, {
    childList: true,
    attributes: true,
    subtree: true
});
```

---

## Best Practices & Tips

### 1. Performance Considerations
- Use `DocumentFragment` for multiple DOM insertions
- Cache DOM selections in variables
- Minimize DOM queries in loops

### 2. Security
- Prefer `textContent` over `innerHTML` when dealing with user input
- Sanitize HTML content before using `innerHTML`

### 3. Modern JavaScript
- Use `const` and `let` instead of `var`
- Prefer arrow functions for event handlers when appropriate
- Use template literals for dynamic HTML strings

### 4. Event Handling
- Always use `addEventListener()` for multiple event handlers
- Use event delegation for dynamic content
- Remove event listeners when elements are removed

---

## Practice Exercises

1. **Element Selection:** Create a page with various elements and practice selecting them using different methods.

2. **Dynamic Content:** Build a todo list application that adds, removes, and modifies list items.

3. **Event Handling:** Create an interactive form with validation and dynamic feedback.

4. **Style Manipulation:** Build a theme switcher that changes page colors and styles.

5. **Advanced Project:** Create a simple image gallery with navigation, filtering, and modal viewing.

---

## Additional Resources

- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [JavaScript.info - DOM](https://javascript.info/document)
- Practice with browser developer tools to inspect and manipulate DOM in real-time

Remember: The best way to learn DOM manipulation is through hands-on practice. Start with simple examples and gradually work toward more complex interactions!