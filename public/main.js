var typed = new Typed(".text", {
    strings: ["Computer Engineer","Web Developer", "Support Engineer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        // Disable the submit button and show a loading message
        const submitButton = e.target.querySelector('input[type="submit"]');
        submitButton.disabled = true;
        responseMessage.style.color = 'blue';
        responseMessage.textContent = 'Sending your message...';

        const response = await fetch('/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.style.color = 'green';
            responseMessage.textContent = data.message;
            e.target.reset(); // Clear the form after a successful submission
        } else {
            responseMessage.style.color = 'red';
            responseMessage.textContent = data.message || 'Failed to send message.';
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'An error occurred. Please try again later.';
    } finally {
        // Re-enable the submit button after the response
        const submitButton = e.target.querySelector('input[type="submit"]');
        submitButton.disabled = false;
    }
});


