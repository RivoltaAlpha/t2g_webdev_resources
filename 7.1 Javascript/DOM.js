const ourFunction = () => {
    const cod_title = document.title
    console.log(cod_title)
    const cod_body = document.body
    console.log(cod_body)
    
    const header = document.getElementById('intro');
    console.log(header)
}

ourFunction();

// create element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello DOM Manipulation'

document.body.appendChild(newDiv);

// manipulate content
const elementToManipulate = document.getElementById("me");
// elementToManipulate.textContent = 'I changed to this'
elementToManipulate.innerHTML = 'I changed to this the second time'

// append a child 
const parent = document.querySelector('.test-parent');
const newContent = document.createElement('p');

newContent.textContent = "I'm the new child element"
parent.appendChild(newContent)

function ClickedButton () {
    alert('Button Clicked')
}

// Mouse events
const mouseEvent =  document.querySelector(".mve")

mouseEvent.addEventListener('click', function(e) {
    alert('You clicked this')
})
mouseEvent.addEventListener('dblclick', function(e) {
    alert('You clicked this twice!!')
})
mouseEvent.addEventListener('mouseenter', function(e) {
    console.log('Mouse Entered')
})
mouseEvent.addEventListener('mouseleave', function(e) {
    console.log('Mouse Left')
})
mouseEvent.addEventListener('mousemove', function(e) {
    console.log('You Moved the mouse')
})
