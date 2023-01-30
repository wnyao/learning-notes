# Event flow / Event Propagation process

- Event is responsible for interaction of JS with HTML web pages.
- Event can be defined as any act occur by someone, Eg. User or server.
- Event flow process in JS is completed in three processes/phases: 
  1. Event Capturing
  2. Event Target
  3. Event Bubbling

### Event flow

- Event flow is the order in which events is received on the web page.
- Before the click is performed on the target element. It must trigger the click event each of its parent elements first, starting at the top with the global window object.
- There are two ways Top to Bottom (Event Capturing) and Bottom to Top (Event Bubbling)

### Event Bubbling

- The event starts from the deepest element or target element to its parent.
- At present, all modern browsers have event bubbling as the default way of event flow.
- When clicked on child elements, the event passes from inner event target to Document.
- Event bubbling can be stopped using `event.stopPropagation()` method.

![Event Bubbling](https://miro.medium.com/max/640/1*QXDzDRLYkUwbVvVGBPTWHw.webp)

### Event Capturing

- The event starts from top element to target element.
- Modern browsers don't support event capturing by default, but can be achieved by code.
- Passing third optional argument to `addEventListener` method enable event capturing in the parent div.

![Event Capturing](https://miro.medium.com/max/640/1*eVliu4Tezwgm7flcUWIaVg.webp)

### Reference

- [Event Bubbling and Event Capturing in JavaScript](https://vsvaibhav2016.medium.com/event-bubbling-and-event-capturing-in-javascript-6ff38bec30e#:~:text=Event%20Flow%20%3A,performed%20on%20the%20target%20element.)
- [Bubbling and Capturing](https://javascript.info/bubbling-and-capturing#bubbling)




