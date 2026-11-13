
/* WEDDING WEBSITE SETTINGS */
const weddingDate = new Date("2027-12-25T10:00:00");
const coupleWhatsApp = ""; // Add the couple's number later.

/* OPENING INVITATION */
const invitation = document.getElementById("invitation");
const mainWebsite = document.getElementById("mainWebsite");
const openInvitation = document.getElementById("openInvitation");
const envelope = document.querySelector(".envelope");
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

let invitationOpened = false;

openInvitation.addEventListener("click", function () {
  if (invitationOpened) return;
  invitationOpened = true;

  envelope.classList.add("open");

  // Start music directly after the guest taps.
  music.play().catch(function () {
    console.log("Music could not start automatically.");
  });

  setTimeout(function () {
    invitation.classList.add("opened");

    setTimeout(function () {
      invitation.style.display = "none";
      mainWebsite.classList.remove("hidden");
      window.scrollTo(0, 0);
    }, 1000);
  }, 1100);
});

/* MUSIC CONTROL */
musicToggle.addEventListener("click", function () {
  if (music.paused) {
    music.play().catch(function () {
      alert("Please tap again to play the music.");
    });
  } else {
    music.pause();
  }
});

music.addEventListener("play", function () {
  musicToggle.textContent = "♫ Music On";
});

music.addEventListener("pause", function () {
  musicToggle.textContent = "♫ Music Off";
});

/* WEDDING COUNTDOWN */
function updateCountdown() {
  const difference = weddingDate.getTime() - Date.now();

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (difference <= 0) {
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    return;
  }

  days.textContent = String(
    Math.floor(difference / 86400000)
  ).padStart(2, "0");

  hours.textContent = String(
    Math.floor((difference / 3600000) % 24)
  ).padStart(2, "0");

  minutes.textContent = String(
    Math.floor((difference / 60000) % 60)
  ).padStart(2, "0");

  seconds.textContent = String(
    Math.floor((difference / 1000) % 60)
  ).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* OUR MOMENTS GALLERY */
const galleryTrack = document.getElementById("galleryTrack");
const galleryNext = document.getElementById("galleryNext");
const galleryPrev = document.getElementById("galleryPrev");

galleryNext.addEventListener("click", function () {
  galleryTrack.scrollBy({
    left: galleryTrack.clientWidth * 0.8,
    behavior: "smooth"
  });
});

galleryPrev.addEventListener("click", function () {
  galleryTrack.scrollBy({
    left: -galleryTrack.clientWidth * 0.8,
    behavior: "smooth"
  });
});

/* RSVP INVITATION */
const openRsvpButton = document.getElementById("openRsvpButton");
const rsvpFormPanel = document.getElementById("rsvpFormPanel");

openRsvpButton.addEventListener("click", function () {
  rsvpFormPanel.classList.remove("hidden");

  rsvpFormPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  openRsvpButton.textContent = "FORM OPENED";
});

/* RSVP FORM */
const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const email = document.getElementById("guestEmail").value.trim();
  const phone = document.getElementById("guestPhone").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guestCount = document.getElementById("guestCount").value;
  const note = document.getElementById("guestMessage").value.trim();

  const message =
    "WEDDING RSVP\n\n" +
    "Guest: " + name + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "Attendance: " + attendance + "\n" +
    "Number of guests: " + guestCount + "\n" +
    "Message: " + note;

  if (!coupleWhatsApp.trim()) {
    alert("Thank you, " + name +
      "! The RSVP form is working. The couple's WhatsApp number still needs to be connected.");
    return;
  }

  window.open(
    "https://wa.me/" + coupleWhatsApp +
    "?text=" + encodeURIComponent(message),
    "_blank"
  );
});
   
