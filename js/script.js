document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("specForm");
    const spinner = document.getElementById("spinner");
    const responseElement = document.getElementById("response");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        //Show spinner when the form is submitted
        spinner.style.display = "block";

        //Get form data
        const primaryUsage = document.getElementById("usage").value;
        const formFactor = document.getElementById("hardware").value;
        const budget = parseFloat(document.getElementById("budget").value);
        const other = document.getElementById("others").value;

        const data = {
            primaryUsage: primaryUsage,
            formFactor: formFactor,
            budget: budget,
            other: other
        };

        // Send data to backend API
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

                //Extract information from response
                const content = apiResponse[0].message.content;
                responseElement.innerHTML = content;
                spinner.style.display = "none";
            })
            .catch(error => {
                console.error("Error:", error);
                spinner.style.display = "none";
            });
    });
});
