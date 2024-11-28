function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

// Hide the loader
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}


async function registerPackage() {
    const senderName = document.getElementById("sender-name").value.trim();
    const senderEmail = document.getElementById("sender-email").value.trim();
    const senderPhone = document.getElementById("sender-phone").value.trim();
    const senderLocation = document.getElementById("sender-location").value.trim();
    const receiverName = document.getElementById("receiver-name").value.trim();
    const receiverEmail = document.getElementById("receiver-email").value.trim();
    const receiverPhone = document.getElementById("receiver-phone").value.trim();
    const receiverLocation = document.getElementById("receiver-location").value.trim();
    const trackingId = document.getElementById("tracking-id").value.trim();


    if (!senderName || !senderEmail || !senderPhone || !senderLocation ||
        !receiverName || !receiverEmail || !receiverPhone || !receiverLocation || !trackingId) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Important fields are missing",
        });
    }

    if (!validateEmail(senderEmail) || !validateEmail(receiverEmail)) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid email addresses.",
        });

    }

    if (!validatePhone(senderPhone) || !validatePhone(receiverPhone)) {
        alert("Please enter valid phone numbers.");
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid phone numbers.",
        });
    }

    // Construct the payload
    const payload = {
        trackingId,
        senderName,
        senderEmail,
        senderPhone,
        senderLocation,
        receiverName,
        receiverEmail,
        receiverPhone,
        receiverLocation

    };
    showLoader()
    console.log(payload)

    try {
        const response = await fetch("https://aloyserver.onrender.com/package/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

    

        const data = await response.json();
        console.log(data)

        // if (data) {
        //     const errorData = await response.json();
        //     return Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: errorData.message,
        //     });
        // }
        console.log("Response:", data);
        hideLoader()
        return Swal.fire({
            icon: "success",
            title: "Success",
            text: "Tracking code generated",
        });

    } catch (error) {
        console.error("Error:", error);
        hideLoader()
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while sending the request. Please try again.",
        });
    }




}






function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,15}$/; // Modify as needed for phone format
    return phoneRegex.test(phone);
}

