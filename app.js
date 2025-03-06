async function shortenUrl() {
    const urlInput = document.getElementById("originalUrl");
    const errorDiv = document.getElementById("error");
    const resultDiv = document.getElementById("result");
    const shortenBtn = document.getElementById("shortenBtn");

    try {
        // Clear previous state
        errorDiv.textContent = "";
        errorDiv.style.display = "none";
        resultDiv.style.display = "none";
        shortenBtn.disabled = true;
        shortenBtn.textContent = "Shortening...";

        const originalUrl = urlInput.value.trim();
        
        // Client-side validation
        if (!originalUrl) {
            throw new Error("Please enter a URL");
        }

        const response = await fetch("http://localhost:8080/api/v1/url/cut", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: originalUrl })
        });

        // Handle JSON parsing safely
        const contentType = response.headers.get("content-type");
        const data = contentType?.includes("application/json") 
            ? await response.json() 
            : await response.text();

        if (!response.ok) {
            // Extract error message from different response formats
            const errorMessage = typeof data === "object" 
                ? data.error || data.message 
                : data;
            throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
        }

        // Show successful result
        showResult(data);
        
    } catch (error) {
        // Display error to user
        errorDiv.textContent = error.message;
        errorDiv.style.display = "block";
        console.error("Shortening failed:", error);
    } finally {
        shortenBtn.disabled = false;
        shortenBtn.textContent = "Shorten URL";
    }
}

function showResult(data) {
    const resultDiv = document.getElementById("result");
    const shortUrlElement = document.getElementById("shortUrl");
    
    if (data?.shortUrl) {
        shortUrlElement.href = data.shortUrl;
        shortUrlElement.textContent = data.shortUrl;
        resultDiv.style.display = "block";
    }
}