1. Import ConfirmModal component to app.js
2. Import ConfirmModalManager to where you want to use

Example:
```
showModal = () => {
    const callback = () => {
        // code to execute when ok is clicked
        ConfirModalManager.toggle(); // turn modal off
    }
    ConfirModalManager.show('header', 'body', callback);
}

```
