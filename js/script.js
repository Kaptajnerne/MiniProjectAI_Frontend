document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const spinner = document.getElementById("spinner");
    const responseElement = document.getElementById("response");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        spinner.style.display = "block";

        const primaryUsage = document.getElementById("usage").value;
        const hardware = document.getElementById("hardware").value;
        const buildType = document.getElementById("buildType").value;
        const budget = parseFloat(document.getElementById("budget").value);
        const other = document.getElementById("others").value;

        const data = {
            primaryUsage: primaryUsage,
            hardware: hardware,
            buildType: buildType,
            budget: budget,
            other: other
        };

        fetch("http://localhost:8082/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(apiResponse => {
                console.log(apiResponse);

                const message = apiResponse[0].message.content.replace(/\n+/g, "\n");
                responseElement.textContent = message;
                spinner.style.display = "none";
            })
            .catch(error => {
                console.error("Error:", error);
                spinner.style.display = "none";
            });
    });
});

