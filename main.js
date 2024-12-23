var typed = new Typed(".text", {
    strings: ["Computer Engineer","Web Developer", "Support Engineer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


    document.getElementById('contactForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData.entries()); // Convert form data to an object

        try {
            const response = await fetch('http://localhost:5000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            const result = await response.json();

            // Display success or error message
            const messageElement = document.getElementById('responseMessage');
            if (response.ok) {
                messageElement.innerHTML = `<p style="color: green;">${result.message}</p>`;
                document.getElementById('contactForm').reset(); // Clear form
            } else {
                messageElement.innerHTML = `<p style="color: red;">${result.message}</p>`;
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('responseMessage').innerHTML = `<p style="color: red;">Failed to send the message. Please try again later.</p>`;
        }
    });


