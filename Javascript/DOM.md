# JavaScript DOM - Student Learning Guide

## Table of Contents
- [Section 1: Getting Started](#section-1-getting-started)
- [Section 2: Selecting Elements](#section-2-selecting-elements)
- [Section 3: Traversing Elements](#section-3-traversing-elements)
- [Section 4: Manipulating Elements](#section-4-manipulating-elements)
- [Section 5: Working with Attributes](#section-5-working-with-attributes)
- [Section 6: Manipulating Element Styles](#section-6-manipulating-element-styles)
- [Section 7: Working with Events](#section-7-working-with-events)
- [Scripting Web Forms](#scripting-web-forms)

---

## Section 1: Getting Started

### Understanding the Document Object Model (DOM)

The DOM is a programming interface for HTML documents. It represents the structure of a document as a tree of objects that JavaScript can manipulate.

**Key Concepts:**
- The DOM treats HTML elements as objects
- Each element becomes a node in the DOM tree
- JavaScript can access, modify, add, or delete these nodes
- Changes to the DOM are reflected immediately in the browser

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree structure where each node is an object representing a part of the page.

```javascript
// The document object is your entry point to the DOM
console.log(document.title);
console.log(document.body);
console.log(document.URL);
```

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

Select a single element by its unique ID.

```javascript
const header = document.getElementById('main-header');
console.log(header);
```

### getElementsByName()
Select elements by their name attribute (commonly used with form elements).

```javascript
const radioButtons = document.getElementsByName('gender');
console.log(radioButtons.length);
```

### getElementsByTagName()
Select all elements with a specific tag name.

```javascript
const allParagraphs = document.getElementsByTagName('p');
for (let p of allParagraphs) {
    console.log(p.textContent);
}
```

### getElementsByClassName()
Select elements by one or more class names.

```javascript
const highlights = document.getElementsByClassName('highlight');
// Multiple classes
const items = document.getElementsByClassName('item active');
```

### querySelector() and querySelectorAll()
Select elements using CSS selectors (most flexible method).

```javascript
// Select first match
const firstButton = document.querySelector('.btn');

// Select all matches
const allButtons = document.querySelectorAll('.btn');

// Complex selectors
const nestedElement = document.querySelector('div.container > p.intro');
```

---

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

### Get Parent Element

```javascript
const child = document.querySelector('.child-element');
const parent = child.parentElement;
console.log(parent);
```

### Get Child Elements

```javascript
const parent = document.querySelector('.parent');

// All children
const children = parent.children;

// First and last child
const firstChild = parent.firstElementChild;
const lastChild = parent.lastElementChild;
```

### Get Siblings

```javascript
const element = document.querySelector('.middle-item');

// Next and previous siblings
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

# Manipulating Elements

### createElement()
Create a new element.

```javascript
const newDiv = document.createElement('div');
newDiv.textContent = 'I am a new div';
```

### appendChild()
Add a node to the end of a parent's child list.

```javascript
const parent = document.querySelector('.container');
const newParagraph = document.createElement('p');
newParagraph.textContent = 'New paragraph';
parent.appendChild(newParagraph);
```

### textContent
Get or set the text content of an element.

```javascript
const heading = document.querySelector('h1');

// Get text
console.log(heading.textContent);

// Set text
heading.textContent = 'New Heading';
```

### innerHTML
Get or set the HTML content of an element.

```javascript
const container = document.querySelector('.container');

// Get HTML
console.log(container.innerHTML);

// Set HTML
container.innerHTML = '<p>New <strong>HTML</strong> content</p>';
```

### innerHTML vs createElement

```javascript
// Using innerHTML (faster for large content, but replaces everything)
container.innerHTML += '<div>New content</div>';

// Using createElement (more control, preserves event listeners)
const newDiv = document.createElement('div');
newDiv.textContent = 'New content';
container.appendChild(newDiv);
```

### DocumentFragment
Efficiently compose multiple DOM nodes before inserting.

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}

// Single DOM operation
document.querySelector('ul').appendChild(fragment);
```

### after(), append(), prepend()

```javascript
const reference = document.querySelector('.reference');

// Insert after element
const afterEl = document.createElement('p');
afterEl.textContent = 'After';
reference.after(afterEl);

// Append to end of parent
const parent = document.querySelector('.parent');
parent.append('Text or element at end');

// Prepend to beginning of parent
parent.prepend('Text or element at start');
```

### insertAdjacentHTML()
Insert HTML at specific positions.

```javascript
const element = document.querySelector('.target');

element.insertAdjacentHTML('beforebegin', '<p>Before element</p>');
element.insertAdjacentHTML('afterbegin', '<p>First child</p>');
element.insertAdjacentHTML('beforeend', '<p>Last child</p>');
element.insertAdjacentHTML('afterend', '<p>After element</p>');
```

### replaceChild()
Replace a child element.

```javascript
const parent = document.querySelector('.parent');
const oldChild = document.querySelector('.old');
const newChild = document.createElement('div');
newChild.textContent = 'Replacement';

parent.replaceChild(newChild, oldChild);
```

### cloneNode()
Clone an element and optionally its descendants.

```javascript
const original = document.querySelector('.original');

// Shallow clone (element only)
const shallowClone = original.cloneNode(false);

// Deep clone (element and all descendants)
const deepClone = original.cloneNode(true);
```

### removeChild() and remove()

```javascript
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// Using removeChild
parent.removeChild(child);

// Using remove (simpler)
child.remove();
```

### insertBefore()

```javascript
const parent = document.querySelector('.parent');
const newNode = document.createElement('div');
const referenceNode = document.querySelector('.reference');

parent.insertBefore(newNode, referenceNode);
```
---

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

### setAttribute() and getAttribute()

```javascript
const link = document.querySelector('a');

// Set attribute
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');

// Get attribute
const href = link.getAttribute('href');
console.log(href);
```

### removeAttribute() and hasAttribute()

```javascript
const input = document.querySelector('input');

// Check if attribute exists
if (input.hasAttribute('required')) {
    console.log('Field is required');
}

// Remove attribute
input.removeAttribute('disabled');
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

```javascript
const input = document.querySelector('input');

// Using properties (preferred for standard attributes)
input.value = 'Hello';
input.disabled = true;

// Using attributes (for custom data attributes)
input.setAttribute('data-user-id', '123');
const userId = input.getAttribute('data-user-id');
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

```javascript
const box = document.querySelector('.box');

box.style.color = 'blue';
box.style.backgroundColor = 'yellow';
box.style.fontSize = '20px';
box.style.padding = '10px';
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

### className Property

```javascript
const element = document.querySelector('.element');

// Get classes
console.log(element.className);

// Set classes (replaces all)
element.className = 'new-class another-class';
```

### classList Property
More flexible way to manipulate classes.

```javascript
const element = document.querySelector('.element');

// Add classes
element.classList.add('active');
element.classList.add('highlight', 'featured');

// Remove classes
element.classList.remove('inactive');

// Toggle class
element.classList.toggle('visible');

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}
```

### Element Width and Height

```javascript
const box = document.querySelector('.box');

// Get dimensions
console.log(box.offsetWidth);  // Width including padding and border
console.log(box.offsetHeight); // Height including padding and border
console.log(box.clientWidth);  // Width including padding only
console.log(box.clientHeight); // Height including padding only
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
// DOMContentLoaded - fires when HTML is loaded and parsed
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready');
});

// load - fires when entire page is loaded (images, styles, etc.)
window.addEventListener('load', function() {
    console.log('Page fully loaded');
});

// beforeunload - fires before page unload
window.addEventListener('beforeunload', function(event) {
    event.preventDefault();
    event.returnValue = ''; // Shows confirmation dialog
});

// unload - fires when page is being unloaded
window.addEventListener('unload', function() {
    console.log('Page is unloading');
});
```

#### Mouse Events
- `click`, `dblclick`
- `mousedown`, `mouseup`
- `mouseover`, `mouseout`
- `mouseenter`, `mouseleave`
- `mousemove`

```javascript
const element = document.querySelector('.element');

element.addEventListener('click', function(e) {
    console.log('Clicked at:', e.clientX, e.clientY);
});

element.addEventListener('dblclick', function(e) {
    console.log('Double clicked');
});

element.addEventListener('mouseenter', function(e) {
    console.log('Mouse entered');
});

element.addEventListener('mouseleave', function(e) {
    console.log('Mouse left');
});

element.addEventListener('mousemove', function(e) {
    console.log('Mouse position:', e.clientX, e.clientY);
});

#### Keyboard Events
- `keydown`, `keyup`, `keypress`
```
```javascript
const input = document.querySelector('input');

input.addEventListener('keydown', function(e) {
    console.log('Key down:', e.key);
    
    if (e.key === 'Enter') {
        console.log('Enter pressed');
    }
});

input.addEventListener('keyup', function(e) {
    console.log('Key up:', e.key);
});

input.addEventListener('keypress', function(e) {
    console.log('Key press:', e.key);
});
```

### Scroll Events

```javascript
window.addEventListener('scroll', function() {
    console.log('Scrolled to:', window.scrollY);
});

// scrollIntoView
const element = document.querySelector('.target');
element.scrollIntoView({ behavior: 'smooth', block: 'center' });
```

### Focus Events

```javascript
const input = document.querySelector('input');

input.addEventListener('focus', function() {
    console.log('Input focused');
    this.style.borderColor = 'blue';
});

input.addEventListener('blur', function() {
    console.log('Input lost focus');
    this.style.borderColor = '';
});
```

#### Other Important Events
- **Scroll Events:** `scroll`
- **Focus Events:** `focus`, `blur`
- **Form Events:** `submit`, `change`, `input`
- **Hash Change:** `hashchange`

### Advanced Event Concepts

### Event Delegation
Handle events on parent instead of each child.

```javascript
// Instead of adding listeners to each button
const list = document.querySelector('ul');

list.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        console.log('List item clicked:', e.target.textContent);
    }
});
```

### dispatchEvent() and Custom Events

```javascript
// Create custom event
const customEvent = new CustomEvent('userLogin', {
    detail: { username: 'john_doe', timestamp: Date.now() }
});

// Listen for custom event
document.addEventListener('userLogin', function(e) {
    console.log('User logged in:', e.detail.username);
});

// Dispatch event
document.dispatchEvent(customEvent);
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
## Scripting Web Forms

### Form Submission

```javascript
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Validate form
    const username = form.querySelector('#username').value;
    if (username.length < 3) {
        alert('Username must be at least 3 characters');
        return;
    }
    
    // Submit form data
    console.log('Form submitted');
});
```

### Radio Buttons

```javascript
const radioButtons = document.getElementsByName('gender');

// Get selected value
function getSelectedRadio() {
    for (let radio of radioButtons) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

// Set selected value
function setSelectedRadio(value) {
    for (let radio of radioButtons) {
        if (radio.value === value) {
            radio.checked = true;
        }
    }
}
```

### Checkboxes

```javascript
const checkbox = document.querySelector('#agree');

// Check if checked
console.log(checkbox.checked);

// Toggle checkbox
checkbox.checked = !checkbox.checked;

// Listen for changes
checkbox.addEventListener('change', function() {
    if (this.checked) {
        console.log('Checkbox is checked');
    } else {
        console.log('Checkbox is unchecked');
    }
});
```

### Select Box

```javascript
const select = document.querySelector('select');

// Get selected value
const selectedValue = select.value;

// Get selected option
const selectedOption = select.options[select.selectedIndex];
console.log(selectedOption.text);

// Add new option
const newOption = document.createElement('option');
newOption.value = 'new';
newOption.text = 'New Option';
select.appendChild(newOption);

// Remove option
select.remove(0); // Remove first option
```

### Handling Input Events

```javascript
const input = document.querySelector('#username');

// Input event - fires on every change
input.addEventListener('input', function(e) {
    console.log('Current value:', e.target.value);
});

// Change event - fires when element loses focus
input.addEventListener('change', function(e) {
    console.log('Final value:', e.target.value);
});
```

### Complete Form Example

```javascript
const form = document.querySelector('#registration-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        username: form.querySelector('#username').value,
        email: form.querySelector('#email').value,
        gender: getSelectedRadio(form.querySelectorAll('[name="gender"]')),
        terms: form.querySelector('#terms').checked
    };
    
    // Validate
    if (!formData.terms) {
        alert('Please accept the terms');
        return;
    }
    
    console.log('Form data:', formData);
});

function getSelectedRadio(radios) {
    for (let radio of radios) {
        if (radio.checked) return radio.value;
    }
    return null;
}
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

## Best Practices

1. **Use `addEventListener`** instead of inline event handlers
2. **Cache DOM references** instead of querying repeatedly
3. **Use event delegation** for dynamic content
4. **Prefer `classList`** over `className` for class manipulation
5. **Use `textContent`** for plain text, `innerHTML` only when needed
6. **Always validate user input** on forms
7. **Remove event listeners** when elements are removed from DOM
8. **Use `DocumentFragment`** for batch DOM operations

---

## Resources

- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [JavaScript.info - DOM](https://javascript.info/document)
- [W3Schools - JavaScript HTML DOM](https://www.w3schools.com/js/js_htmldom.asp)

---