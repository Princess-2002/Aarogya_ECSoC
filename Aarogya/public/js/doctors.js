document.addEventListener("DOMContentLoaded", async () => {
    const doctorsList = document.getElementById("doctorsList");

    try {
        const response = await fetch("/doctors");
        const doctors = await response.json();

        doctors.forEach(doctor => {
            const doctorCard = document.createElement("div");
            doctorCard.classList.add("doctor-card");
            doctorCard.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Specialization: ${doctor.specialization}</p>
                <button onclick="viewDoctor('${doctor._id}')">View Profile</button>
            `;
            doctorsList.appendChild(doctorCard);
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
});

// Declared on the global scope (not inside the DOMContentLoaded closure
// above) because it's invoked from an inline `onclick` attribute generated
// in the template string above — inline handlers can only reach functions
// that exist on `window`.
function viewDoctor(doctorId) {
    window.location.href = `/doctor/${doctorId}`; // Redirect to profile page
}
