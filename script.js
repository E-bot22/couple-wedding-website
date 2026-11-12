
// Wedding website settings
const wedding = {
  names: "Alex & Jamie",
  date: "2026-12-12T10:00:00",
  dateLabel: "12 December 2026",
  venue: "Wedding venue, City",
  map: "https://maps.google.com"
};

// Open the wedding invitation
document.getElementById("openInvite").addEventListener("click", () => {
  document.getElementById("cover").hidden = true;
  document.getElementById("site").hidden = false;
  window.scrollTo(0, 0);
});

// Display couple details
document.getElementById("coupleNames").textContent = wedding.names;
document.getElementById("footerNames").textContent = wedding.names;
document.getElementById("weddingDate").textContent = wedding.dateLabel;
document.getElementById("venue").textContent = wedding.venue;
document.getElementById("mapLink").href = wedding.map;

// Wedding countdown
function tick() {
  const diff = new Date(wedding.date) - new Date();

  if (diff <= 0) {
    document.getElementById("timer").textContent =
      "Today is the day!";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("timer").textContent =
    `${days} days · ${hours} hrs · ${minutes} mins · ${seconds} secs`;
}

tick();
setInterval(tick, 1000);

// RSVP form
document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const message =
    `Wedding RSVP%0AName: ${data.name}` +
    `%0AAttendance: ${data.attendance}` +
    `%0AGuests: ${data.guests}` +
    `%0APhone: ${data.phone || "Not given"}` +
    `%0ANote: ${data.note || "—"}`;

  const result = document.getElementById("rsvpMessage");
  result.textContent =
    "Your RSVP is ready. Tap below to send it to the couple.";

  const link = document.createElement("a");
  link.href = "https://wa.me/?text=" + message;
  link.target = "_blank";
  link.textContent = "Send RSVP on WhatsApp";

  result.appendChild(link);
});
