const weddingDate = new Date("2026-08-21T14:45:00+03:00");

const invitations = {
  "mama-ir-tetis-sabaiciai": { greeting: "Mieli Mama ir Tėti Sabaičiai,", count: 2, names: "Mama ir Tėtis Sabaičiai" },
  "agne": { greeting: "Miela Agne,", count: 1, names: "Agnė" },
  "mama-ir-tetis-gudukai": { greeting: "Mieli Mama ir Tėti Gudukai,", count: 2, names: "Mama ir Tėtis Gudukai" },
  "zana-ir-nerijus": { greeting: "Mieli Žana ir Nerijau,", count: 2, names: "Žana ir Nerijus" },
  "justinas-ir-valda": { greeting: "Mieli Justinai ir Valda,", count: 2, names: "Justinas ir Valda" },
  "aiste-ir-tomas": { greeting: "Mieli Aiste ir Tomai,", count: 2, names: "Aistė ir Tomas" },
  "benas-ir-deimante": { greeting: "Mieli Benai ir Deimante,", count: 2, names: "Benas ir Deimantė" },
  "eivinas-ir-juste": { greeting: "Mieli Eivinai ir Juste,", count: 2, names: "Eivinas ir Justė" },
  "matas-ir-austeja": { greeting: "Mieli Matai ir Austėja,", count: 2, names: "Matas ir Austėja" },
  "darius-ir-elvyra": { greeting: "Mieli Dariau ir Elvyra,", count: 2, names: "Darius ir Elvyra" },
  "egidijus-ir-inga": { greeting: "Mieli Egidijau ir Inga,", count: 2, names: "Egidijus ir Inga" },
  "brigita-ir-dziugas": { greeting: "Mieli Brigita ir Džiugai,", count: 2, names: "Brigita ir Džiugas" },
  "laurynas-ir-emilija": { greeting: "Mieli Laurynai ir Emilija,", count: 2, names: "Laurynas ir Emilija" },
  "teta-vida": { greeting: "Brangi Teta Vida,", count: 1, names: "Teta Vida" },
  "martynas-ir-ramune": { greeting: "Mieli Martynai ir Ramune,", count: 2, names: "Martynas ir Ramunė" },
  "mylima-ingrida": { greeting: "Mylima Ingrida,", count: 1, names: "Ingrida" },
  "fbc-bimbos": { greeting: "Mylimi mano FBC BIMBOS ♥", count: 6, names: "FBC BIMBOS" },
  "brangus-sveciai": { greeting: "Brangūs svečiai,", count: 2, names: "" }
};

const meals = [
  "Svieste kepta starkio filė su pomidoriukais, ankštinėmis pupelėmis, mažomis bulvytėmis ir kaparėlių padažu",
  "Jautienos žandai su bulvių piure, degintais svogūnais ir apelsininėmis morkomis",
  "Degintas kalafioras su anakardžių tyre, čimičiuri ir vytintais pomidoriukais (tinka veganams)"
];

function slug() {
  const path = decodeURIComponent(location.pathname.replace(/^\/+|\/+$/g, "")).toLowerCase();
  return (path || "brangus-sveciai")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "-");
}

function renderMeals(count) {
  const target = document.getElementById("mealSelectors");
  target.innerHTML = "";
  for (let i = 1; i <= Number(count); i++) {
    const block = document.createElement("div");
    block.className = "meal-selector";
    block.innerHTML = `
      <label>Svečias ${i}<input name="svecias_${i}_vardas" type="text" placeholder="Vardas" required></label>
      <label>Patiekalas<select name="svecias_${i}_patiekalas" required>
        <option value="">Pasirinkite</option>
        ${meals.map(m => `<option value="${m}">${m}</option>`).join("")}
      </select></label>`;
    target.appendChild(block);
  }
}

function applyInvite() {
  const key = slug();
  const invite = invitations[key] || invitations["brangus-sveciai"];
  document.getElementById("guestGreeting").textContent = invite.greeting;
  document.getElementById("inviteSlug").value = key;
  document.getElementById("guestNames").value = invite.names;
  const guestCount = document.getElementById("guestCount");
  guestCount.innerHTML = "";
  for (let i = 1; i <= invite.count; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    guestCount.appendChild(option);
  }
  guestCount.value = invite.count;
  renderMeals(invite.count);
}

function ltForm(number, forms) {
  const n = Math.abs(Number(number));
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 11 && lastTwo <= 19) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 9) return forms[1];
  return forms[2];
}
function setUnit(id, number, forms) {
  document.getElementById(id).closest("div").querySelector("span").textContent = ltForm(number, forms);
}
function tick() {
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    countdown.hidden = true;
    weddingDayMessage.hidden = false;
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000 % 24);
  const m = Math.floor(diff / 60000 % 60);
  const s = Math.floor(diff / 1000 % 60);
  days.textContent = d; hours.textContent = h; minutes.textContent = m; seconds.textContent = s;
  setUnit("days", d, ["diena","dienos","dienų"]);
  setUnit("hours", h, ["valanda","valandos","valandų"]);
  setUnit("minutes", m, ["minutė","minutės","minučių"]);
  setUnit("seconds", s, ["sekundė","sekundės","sekundžių"]);
}

function hearts(anchor) {
  const r = anchor.getBoundingClientRect();
  for (let i = 0; i < 11; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = "♥";
    h.style.left = `${r.left + r.width/2}px`;
    h.style.top = `${r.top + r.height/2}px`;
    h.style.setProperty("--x", `${(Math.random()-.5)*230}px`);
    h.style.setProperty("--y", `${-80-Math.random()*170}px`);
    h.style.setProperty("--r", `${(Math.random()-.5)*90}deg`);
    heartBurst.appendChild(h);
    setTimeout(() => h.remove(), 1150);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const invitation = document.getElementById("invitation");
  const openInvitation = document.getElementById("openInvitation");
  const musicModal = document.getElementById("musicModal");
  const withMusic = document.getElementById("withMusic");
  const withoutMusic = document.getElementById("withoutMusic");

  const attendanceDetails = document.getElementById("attendanceDetails");
  const guestCount = document.getElementById("guestCount");
  const rsvpForm = document.getElementById("rsvpForm");
  const formStatus = document.getElementById("formStatus");
  const rsvpSuccess = document.getElementById("rsvpSuccess");
  const rsvpSuccessTitle = document.getElementById("rsvpSuccessTitle");
  const spotifyAfterRsvp = document.getElementById("spotifyAfterRsvp");
applyInvite();
  tick();
  setInterval(tick, 1000);

  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 1100);
  }

  openInvitation?.addEventListener("click", () => {
    if (musicModal) {
      musicModal.hidden = false;
      requestAnimationFrame(() => musicModal.classList.add("is-open"));
    } else {
      invitation?.scrollIntoView({ behavior: "smooth" });
    }
  });

  withMusic?.addEventListener("click", () => {
    closeMusicModal();
  });

  withoutMusic?.addEventListener("click", () => {
    closeMusicModal();
  });

  function closeMusicModal() {
    if (!musicModal) return;
    musicModal.classList.remove("is-open");
    setTimeout(() => {
      musicModal.hidden = true;
      invitation?.scrollIntoView({ behavior: "smooth" });
    }, 260);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  document.querySelectorAll('input[name="dalyvavimas"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const attending = radio.checked && radio.value === "Taip, dalyvausiu";
      attendanceDetails.hidden = !attending;

      attendanceDetails.querySelectorAll("input, select").forEach((element) => {
        element.required = attending;
      });

      if (attending) {
        hearts(radio.closest(".attendance-card"));
      }
    });
  });

  guestCount?.addEventListener("change", (event) => {
    renderMeals(event.target.value);
  });

  let submitted = false;
  let selectedAttendance = "";

  rsvpForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    selectedAttendance = rsvpForm.querySelector(
      'input[name="dalyvavimas"]:checked'
    )?.value || "";

    if (!selectedAttendance) {
      formStatus.textContent = "Pasirinkite, ar dalyvausite.";
      return;
    }

    const button = rsvpForm.querySelector(".submit-btn");
    formStatus.textContent = "Siunčiame…";
    button.disabled = true;

    try {
      const formData = new FormData(rsvpForm);
      formData.set("form-name", "vestuviu-rsvp");

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) {
        throw new Error(`Netlify form submission failed: ${response.status}`);
      }

      submitted = true;
      showSuccess();
    } catch (error) {
      console.error(error);
      formStatus.textContent =
        "Nepavyko išsiųsti. Patikrinkite interneto ryšį ir pabandykite dar kartą.";
      button.disabled = false;
    }
  });


function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function nextPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function slowScrollTo(element, duration = 900, block = "start") {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    const rect = element.getBoundingClientRect();
    const startY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const topOffset = block === "center"
      ? Math.max((viewportHeight - rect.height) / 2, 24)
      : 24;
    const targetY = Math.max(rect.top + startY - topOffset, 0);
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (progress) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}


function waitForViewportToSettle(timeout = 450) {
  return new Promise((resolve) => {
    const viewport = window.visualViewport;
    if (!viewport) {
      window.setTimeout(resolve, 180);
      return;
    }

    let lastHeight = viewport.height;
    let stableFrames = 0;
    const startedAt = performance.now();

    function check() {
      const currentHeight = viewport.height;

      if (Math.abs(currentHeight - lastHeight) < 1) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastHeight = currentHeight;
      }

      if (stableFrames >= 3 || performance.now() - startedAt >= timeout) {
        resolve();
        return;
      }

      requestAnimationFrame(check);
    }

    requestAnimationFrame(check);
  });
}

async function showSuccess() {
    if (!submitted || rsvpSuccess.dataset.shown === "true") return;

    rsvpSuccess.dataset.shown = "true";
    formStatus.textContent = "";

    // Close the mobile keyboard first and let the visual viewport settle.
    const activeElement = document.activeElement;
    if (activeElement && typeof activeElement.blur === "function") {
      activeElement.blur();
    }

    await waitForViewportToSettle();

    if (selectedAttendance === "Taip, dalyvausiu") {
      rsvpSuccessTitle.textContent = "Lauksime Jūsų!";
      spotifyAfterRsvp.hidden = false;
    } else {
      rsvpSuccessTitle.textContent = "Ačiū, kad pranešėte.";
      spotifyAfterRsvp.hidden = true;
    }

    // Replace the form with the confirmation card.
    rsvpSuccess.hidden = false;

    rsvpForm
      .querySelectorAll("fieldset, #attendanceDetails, .submit-btn")
      .forEach((element) => {
        element.hidden = true;
      });

    rsvpForm.classList.add("is-submitted");
    rsvpForm.style.minHeight = "";

    // Wait for the browser to finish recalculating the new layout.
    await nextPaint();
    await waitForViewportToSettle(320);

    // One controlled movement only: always reveal the confirmation card.
    // No automatic movement happens after this.
    await slowScrollTo(rsvpSuccess, 650, "center");
  }
});
