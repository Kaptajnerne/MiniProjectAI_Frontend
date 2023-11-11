document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const buildTypeContainer = document.getElementById("buildTypeContainer");

    buildTypeContainer.style.display = "none";

    function handleHardwareChange() {
        const hardware = document.getElementById("hardware").value;
        if (hardware === "desktop") {
            buildTypeContainer.style.display = "block";
        } else {
            buildTypeContainer.style.display = "none";
        }
    }
    form.addEventListener("change", handleHardwareChange);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
    });
});