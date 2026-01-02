const examples = [
  {
    id: 1,
    title: "Portrait — Blurry Background",
    aperture: "f/1.8",
    shutter: "1/200",
    iso: 100,
    categories: ["wide", "fast", "lowISO"],
    image: "images/portrait.jpg"
  },
  {
    id: 2,
    title: "Landscape — Everything Sharp",
    aperture: "f/11",
    shutter: "1/125",
    iso: 200,
    categories: ["narrow", "medium", "lowISO"],
    image: "images/landscape.jpg"
  },
  {
    id: 3,
    title: "Sports Action — Freeze Motion",
    aperture: "f/2.8",
    shutter: "1/500",
    iso: 400,
    categories: ["wide", "fast", "midISO"],
    image: "images/sports.jpg"
  },
  {
    id: 4,
    title: "Night — Long Exposure",
    aperture: "f/4",
    shutter: "1/5",
    iso: 1600,
    categories: ["mid", "slow", "highISO"],
    image: "images/night.jpg"
  },
  {
    id: 5,
    title: "Indoor Low Light Portrait",
    aperture: "f/2.0",
    shutter: "1/60",
    iso: 800,
    categories: ["wide", "medium", "midISO"],
    image: "images/indoor.jpg"
  },
  {
    id: 6,
    title: "Street — Motiony People",
    aperture: "f/5.6",
    shutter: "1/250",
    iso: 400,
    categories: ["mid", "fast", "midISO"],
    image: "images/street.jpeg"
  },
  {
    id: 7,
    title: "Sunset Silhouette",
    aperture: "f/8",
    shutter: "1/30",
    iso: 200,
    categories: ["narrow", "slow", "lowISO"],
    image: "images/sunset.jpg"
  },
  {
    id: 8,
    title: "Concert — Stage Light",
    aperture: "f/2.8",
    shutter: "1/160",
    iso: 3200,
    categories: ["wide", "medium", "highISO"],
    image: "images/concert.jpg"
  },
  {
    id: 9,
    title: "Macro — Flower Close-up",
    aperture: "f/16",
    shutter: "1/100",
    iso: 200,
    categories: ["narrow", "medium", "lowISO"],
    image: "images/macro.jpg"
  }
];

/*Utility: select helpers */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

/*Rendering for Collection page */
function renderCollection(data){
  const grid = $("#collectionGrid");
  if(!grid) return;
  grid.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-image">
          <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="card-info">
          <h3>${item.title}</h3>
          <p>Aperture: ${item.aperture}</p>
          <p>Shutter: ${item.shutter}</p>
          <p>ISO: ${item.iso}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}


// DARK / LIGHT MODE
const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeButton.textContent = "Dark Mode";
  } else {
    themeButton.textContent = "Light Mode";
  }

  // save preference
  localStorage.setItem("site-theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
});

// Load saved theme
const savedTheme = localStorage.getItem("site-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeButton.textContent = "Dark Mode";
}


/* initial render on collection page */
document.addEventListener("DOMContentLoaded", () => {
  renderCollection(examples);

  // Wire up filter controls only if they exist on page
  const applyBtn = $("#applyFilterBtn");
  const showAllBtn = $("#showAllBtn");
  const select = $("#filterSelect");

  if(applyBtn && select && showAllBtn){
    applyBtn.addEventListener("click", () => {
      const val = select.value;
      if(!val){
        alert("Please choose a filter option first.");
        return;
      }
      const filtered = examples.filter(e => e.categories.includes(val));
      renderCollection(filtered);
    });

    showAllBtn.addEventListener("click", () => renderCollection(examples));
  }
  // Contact form behavior
  const form = $("#contactForm");
  if(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      if(!name || !email){
        alert("Please fill required fields (name and email).");
        return;
      }
      // simulate success
      alert(`Thanks ${name}! Your message was received.`);
      form.reset();
    });
  }
});

