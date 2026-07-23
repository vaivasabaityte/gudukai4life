const weddingDate = new Date("2026-08-21T14:45:00+03:00");

const invitations = {
  "mama-ir-tetis-sabaiciai": { greeting: "Mieli Mama ir Tėti Sabaičiai,", count: 2, names: "Mama ir Tėtis Sabaičiai" },
  "agne": { greeting: "Brangi Agne,", count: 1, names: "Agnė" },
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
  "brangus-sveciai": { greeting: "Brangūs svečiai,", count: 1, names: "" }
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
  applyInvite();
  tick();
  setInterval(tick, 1000);
  setTimeout(() => loader.classList.add("hide"), 1250);

  function revealInvitation() {
    musicModal.hidden = true;
    transitionHeart.classList.add("show");
    setTimeout(() => invitation.scrollIntoView({behavior:"smooth"}), 350);
    setTimeout(() => transitionHeart.classList.remove("show"), 950);
  }
  const openInvitationButton = document.getElementById("openInvitation");
  const musicModalElement = document.getElementById("musicModal");
  const browseSilentButton = document.getElementById("browseSilent");
  const playSpotifyLink = document.getElementById("playSpotify");

  openInvitationButton.addEventListener("click", () => {
    musicModalElement.hidden = false;
  });
  browseSilentButton.addEventListener("click", revealInvitation);
  playSpotifyLink.addEventListener("click", () => setTimeout(revealInvitation, 120));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll('input[name="dalyvavimas"]').forEach(radio => {
    radio.addEventListener("change", () => {
      const yes = radio.checked && radio.value === "Taip, dalyvausiu";
      attendanceDetails.hidden = !yes;
      attendanceDetails.querySelectorAll("input,select").forEach(el => el.required = yes);
      if (yes) hearts(radio.closest(".attendance-card"));
    });
  });

  guestCount.addEventListener("change", e => renderMeals(e.target.value));

  rsvpForm.addEventListener("submit", async e => {
    e.preventDefault();
    formStatus.textContent = "Siunčiame…";
    const button = rsvpForm.querySelector("button");
    button.disabled = true;
    const selectedAttendance = rsvpForm.querySelector('input[name="dalyvavimas"]:checked')?.value || "";
    try {
      const data = new FormData(rsvpForm);
      const response = await fetch("/", {
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:new URLSearchParams(data).toString()
      });
      if (!response.ok) throw new Error();
      formStatus.textContent = "";
      rsvpSuccess.hidden = false;
      if (selectedAttendance === "Taip, dalyvausiu") {
        rsvpSuccessTitle.textContent = "Lauksime Jūsų!";
        spotifyAfterRsvp.hidden = false;
        setTimeout(() => spotifyAfterRsvp.scrollIntoView({behavior:"smooth", block:"start"}), 350);
      } else {
        rsvpSuccessTitle.textContent = "Ačiū, kad pranešėte.";
        spotifyAfterRsvp.hidden = true;
      }
      rsvpForm.querySelectorAll("fieldset, #attendanceDetails, .submit-btn").forEach(el => el.hidden = true);
    } catch {
      formStatus.textContent = "Nepavyko išsiųsti. Pabandykite dar kartą.";
    } finally {
      button.disabled = false;
    }
  });
});
