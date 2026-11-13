
/* ========================================
   WEDDING WEBSITE SETTINGS
======================================== */

// CHANGE THIS DATE TO THE REAL WEDDING DATE
const weddingDate = new Date("2027-12-25T10:00:00");

// Add the couple's WhatsApp number later.
// Use international format without the + sign.
const coupleWhatsApp = "";


/* ========================================
   OPENING INVITATION
======================================== */

const invitation = document.getElementById("invitation");
const mainWebsite = document.getElementById("mainWebsite");
const music = document.getElementById("weddingMusic");

let invitationOpened = false;

invitation.addEventListener("click", function () {

  if (invitationOpened) return;

  invitationOpened = true;

  invitation.classList.add("opening");

  // Allow the envelope animation to begin
  setTimeout(function () {

    invitation.style.transition = "opacity 1s ease";
    invitation.style.opacity = "0";

    setTimeout(function () {

      invitation.classList.add("hidden");
      mainWebsite.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      // Start music after the guest's tap
      music.play().catch(function () {
        console.log("Music playback requires another tap.");
      });

    }, 1000);

  }, 900);

});


/* ========================================
   BACKGROUND MUSIC CONTROL
======================================== */

const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", function () {

  if (music.paused) {

    music.play().then(function () {
      musicToggle.innerHTML = "♫ Music On";
    }).catch(function () {
      musicToggle.innerHTML = "♫ Tap to Play";
    });

  } else {

    music.pause();
    musicToggle.innerHTML = "♫ Music Off";

  }

});

music.addEventListener("play", function () {
  musicToggle.innerHTML = "♫ Music On";
});

music.addEventListener("pause", function () {
  musicToggle.innerHTML = "♫ Music Off";
});


/* ========================================
   WEDDING COUNTDOWN
======================================== */

function updateCountdown() {

  const now = new Date().getTime();
  const target = weddingDate.getTime();

  let difference = target - now;

  if (difference <= 0) {

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* ========================================
   OUR MOMENTS GALLERY
======================================== */

const galleryTrack = document.getElementById("galleryTrack");

const galleryNext = document.getElementById("galleryNext");

const galleryPrev = document.getElementById("galleryPrev");

galleryNext.addEventListener("click", function () {

  galleryTrack.scrollBy({
    left: 280,
    behavior: "smooth"
  });

});

galleryPrev.addEventListener("click", function () {

  galleryTrack.scrollBy({
    left: -280,
    behavior: "smooth"
  });

});


/* ========================================
   RSVP FORM
======================================== */

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const name =
    document.getElementById("guestName").value.trim();

  const email =
    document.getElementById("guestEmail").value.trim();

  const phone =
    document.getElementById("guestPhone").value.trim();

  const attendance =
    document.getElementById("attendance").value;

  const guestCount =
    document.getElementById("guestCount").value;

  const note =
    document.getElementById("guestNote").value.trim();

  if (!name || !attendance) {
    alert("Please enter your name and attendance response.");
    return;
  }

  const message =
    "WEDDING RSVP\n\n" +
    "Guest: " + name + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "Attendance: " + attendance + "\n" +
    "Number of guests: " + guestCount + "\n" +
    "Message: " + note;

  if (coupleWhatsApp.trim() === "") {

    alert(
      "Thank you, " + name +
      "! Your response has been prepared. The couple's WhatsApp number will be connected when the wedding details are added."
    );

    return;

  }

  const whatsappURL =
    "https://wa.me/" +
    coupleWhatsApp +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");

});

// RSVP INVITATION OPENING
const openRsvpButton = document.getElementById("openRsvpButton");
const rsvpFormPanel = document.getElementById("rsvpFormPanel");

if (openRsvpButton && rsvpFormPanel) {
  openRsvpButton.addEventListener("click", function () {
    rsvpFormPanel.classList.remove("hidden");

    rsvpFormPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    openRsvpButton.textContent = "RSVP FORM OPENED";
  });
}



/* ========================================
   END OF WEDDING WEBSITE SCRIPT
======================================== */
