const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", saveEnquiry);

function saveEnquiry(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const place = document.getElementById("place").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !place || !message) {
        alert("Please fill all fields.");
        return;
    }

    // Save to Local Storage
    const enquiry = {
        id: Date.now(),
        name,
        phone,
        place,
        message,
        // createdAt: new Date().toLocaleString()
    };

    const enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

    enquiries.push(enquiry);

    localStorage.setItem("enquiries", JSON.stringify(enquiries));
// -----------------------------------------------------------------------------------------
    // WhatsApp Message
    const whatsappMessage = `Hello NK EVENTS,

I would like to enquire about your event rental services.

Name: ${name}
Phone: ${phone}
Place: ${place}

Requirement:
${message}

Please contact me with more details.

Thank you.`;

    // Your WhatsApp Number
    const whatsappNumber = "919745832783";

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");

   

    enquiryForm.reset();
}