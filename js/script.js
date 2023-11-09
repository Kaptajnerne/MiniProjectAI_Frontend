document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("specForm");
    const spinner = document.getElementById("spinner");
    const responseElement = document.getElementById("response");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Show the spinner when the form is submitted
        spinner.style.display = "block";

        // Get form data
        const primaryUsage = document.getElementById("usage").value;
        const formFactor = document.getElementById("hardware").value;
        const budget = parseFloat(document.getElementById("budget").value);
        const other = document.getElementById("others").value;

        // Prepare data object
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
                // Handle the response from the backend API
                console.log(apiResponse);

                // Extract relevant information from the response
                const content = apiResponse[0].message.content;

                // Display the complete content
                responseElement.innerHTML = content;

                // Hide the spinner when the response is received
                spinner.style.display = "none";
            })
            .catch(error => {
                // Handle errors
                console.error("Error:", error);

                // Hide the spinner in case of errors
                spinner.style.display = "none";
            });
    });
});
