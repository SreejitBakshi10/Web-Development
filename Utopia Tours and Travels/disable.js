// Function to show the alert message
function showAlert() {
    alert("Right-Click and Ctrl functions are disabled");
}

// Disable right-click
document.oncontextmenu = function () {
    showAlert();
    return false;
};

// Disable Ctrl key
document.onkeydown = function (event) {
    if (event.ctrlKey) {
        showAlert();
        event.preventDefault();
    }
};