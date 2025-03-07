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


function copyToClipboard() {
    const shortUrlElement = document.getElementById("shortUrl");

    if (!shortUrlElement) {
        console.error("Error: Element with id 'shortUrl' not found!");
        return;
    }

    const shortUrl = shortUrlElement.href;

    if (!shortUrl || shortUrl === "#") {
        console.error("Error: No valid short URL found to copy!");
        alert("No valid short URL to copy!");
        return;
    }

    navigator.clipboard.writeText(shortUrl)
        .then(() => {
            showToast("Short URL copied to clipboard! ✅");
        })
        .catch(err => console.error("Error copying to clipboard: ", err));
}

// ✅ Function to show toast notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast-message";
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show"); // Show toast
    }, 100); 

    setTimeout(() => {
        toast.classList.remove("show"); // Hide toast
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 2500); // Auto-hide after 2.5s
}

document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
});
