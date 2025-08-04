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
    const deliveryMode = document.getElementById("delivery-mode").value.trim();
    const contentName = document.getElementById("content-name").value.trim();
    const contentWeight = document.getElementById("content-weight").value.trim();
    const deliveryStatus = document.getElementById("delivery-status").value.trim();
    const trackingId = document.getElementById("tracking-id").value.trim();


    if (!senderName || !senderEmail || !senderPhone || !senderLocation ||
        !receiverName || !receiverEmail || !receiverPhone || 
        !receiverLocation || !deliveryMode || !contentName || !contentWeight || !deliveryStatus ||  !trackingId) {
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
        receiverLocation,
        deliveryMode,
        contentName,
        contentWeight,
        deliveryStatus,     
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


        const data = await response.json();
        console.log(data)

        if (response.status == 400) {
            hideLoader()
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
            });
        }
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


async function trackPackage() {
    console.log("i am clicked")
    const trackID = document.getElementById("track-id").value.trim();

    const baseUrl = "https://aloyserver.onrender.com/package/single/";

    // Construct the full endpoint URL
    const endpoint = `${baseUrl}${trackID}`;
    // Perform the GET request

    if (!trackID) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a tracking ID",
        });
    }
    showLoader()
    try {
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data)
        if (response.status == 400) {
            hideLoader()
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
            });
        }
        hideLoader()
        localStorage.setItem('packageTracking', JSON.stringify(data));
       window.location = "./trackdetails.html"



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

async function trackPackage2() {
    console.log("i am clicked")
    const trackID = document.getElementById("track-id2").value.trim();

    const baseUrl = "https://aloyserver.onrender.com/package/single/";

    // Construct the full endpoint URL
    const endpoint = `${baseUrl}${trackID}`;
    // Perform the GET request
    showLoader()
    try {
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data)
        if (response.status == 400) {
            hideLoader()
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
            });
        }
        hideLoader()
        localStorage.setItem('packageTracking', JSON.stringify(data));
       window.location = "./trackdetails.html"
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




function populatePackageInfo() {
    console.log("Oh men am active")
    // Retrieve the package information from local storage
    const packageInfo = JSON.parse(localStorage.getItem('packageTracking'));
    console.log(packageInfo)
    // Check if packageInfo exists
    if (packageInfo) {
        // Populate the HTML elements with the package information
        document.getElementById('tracking-id').innerText = packageInfo.trackingId;
        document.getElementById('sender-name').innerText = packageInfo.senderName;
        document.getElementById('sender-email').innerText = packageInfo.senderEmail;
        document.getElementById('sender-phone').innerText = packageInfo.senderPhone;
        document.getElementById('sender-location').innerText = packageInfo.senderLocation;
        document.getElementById('receiver-name').innerText = packageInfo.receiverName;
        document.getElementById('receiver-email').innerText = packageInfo.receiverEmail;
        document.getElementById('receiver-phone').innerText = packageInfo.receiverPhone;
        document.getElementById('receiver-location').innerText = packageInfo.receiverLocation;
        document.getElementById('content-weight').innerText = packageInfo.contentWeight;
        document.getElementById('content-name').innerText = packageInfo.contentName;
        document.getElementById('delivery-status').innerText = packageInfo.deliveryStatus;
        document.getElementById('delivery-mode').innerText = packageInfo.deliveryMode;
        
        // Load package timeline
        loadPackageTimeline(packageInfo.trackingId);
    } else {
        // Handle case where no package information is found
        document.getElementById('package-info').innerText = 'No package information found.';
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

// Function to load and display package timeline
async function loadPackageTimeline(trackingId) {
    const timelineContainer = document.getElementById('package-timeline-container');
    
    if (!timelineContainer) {
        console.log('Timeline container not found - probably not on track details page');
        return;
    }
    
    try {
        const response = await fetch(`https://aloyserver.onrender.com/package/timeline/${trackingId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch timeline');
        }
        
        const data = await response.json();
        
        // Check if timeline exists and has entries
        if (!data.timeline || data.timeline.length === 0) {
            timelineContainer.innerHTML = `
                <div class="timeline-empty">
                    <div style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;">🕒</div>
                    <h3>No Timeline Available</h3>
                    <p>Timeline information will appear here as your package moves through our delivery network.</p>
                </div>
            `;
            return;
        }
        
        // Generate timeline HTML
        const timelineHTML = data.timeline.map(entry => {
            const date = new Date(entry.timestamp);
            const statusClass = getTimelineStatusClass(entry.status);
            
            return `
                <div class="timeline-item ${statusClass}">
                    <div class="timeline-status">${entry.status.replace(/-/g, ' ')}</div>
                    ${entry.description ? `<div class="timeline-description">${entry.description}</div>` : ''}
                    <div class="timeline-meta">
                        <span>📅 ${date.toLocaleDateString()}</span>
                        <span>🕒 ${date.toLocaleTimeString()}</span>
                        ${entry.location ? `<span>📍 ${entry.location}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        timelineContainer.innerHTML = `
            <div class="timeline-container">
                ${timelineHTML}
            </div>
        `;
        
    } catch (error) {
        console.error('Error loading timeline:', error);
        timelineContainer.innerHTML = `
            <div class="timeline-empty">
                <div style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;">⚠️</div>
                <h3>Timeline Unavailable</h3>
                <p>Unable to load timeline information at this time. Please try refreshing the page.</p>
            </div>
        `;
    }
}

// Helper function to get status class for timeline styling
function getTimelineStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'delivered':
            return 'completed';
        case 'cancelled':
            return 'cancelled';
        case 'exception':
        case 'on-hold':
            return 'exception';
        default:
            return '';
    }
}


