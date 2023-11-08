document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("specForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form data
        const primaryUsage = document.getElementById("usage").value;
        const formFactor = document.getElementById("hardware").value;
        const budget = parseFloat(document.getElementById("budget").value);
        const popularity = document.getElementById("popularity").value;
        const other = document.getElementById("others").value;

        // Prepare data object
        const data = {
            primaryUsage: primaryUsage,
            formFactor: formFactor,
            budget: budget,
            popularity: popularity,
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
                const message = apiResponse[0].message.content.replace(/\n+/g, "\n");

                // If you want to display the response in the frontend, update the DOM here
                const responseElement = document.getElementById("response");

                // Display the extracted message in a readable format
                responseElement.textContent = message;
            })
            .catch(error => {
                // Handle errors
                console.error("Error:", error);
            });
    });
});
