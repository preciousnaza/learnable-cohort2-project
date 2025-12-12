const sliderSection = document.querySelector(".slider-section");
const slides = document.querySelectorAll(".slider");
const dots = document.querySelectorAll(".dot span");
const userNavSec = document.querySelector(".nav-menu");
const headerListSec= document.querySelector(".header-list");



let index = 0;
const totalSlides = slides.length;

// Update slide & dot
function showSlide(i) {
  if (!sliderSection || !slides[i]) return;
  sliderSection.scrollTo({
    left: slides[i].offsetLeft,
    behavior: "smooth",
  });

  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[i]) dots[i].classList.add("active");
}

// Auto slide every 3 seconds
function startAutoSlide() {
  setInterval(() => {
    index = (index + 1) % totalSlides;
    showSlide(index);
  }, 3000);
}

// Dot click event (supports touch)
dots.forEach((dot, i) => {
  const handler = (e) => {
    e && e.preventDefault && e.preventDefault();
    index = i;
    showSlide(index);
  };
  dot.addEventListener("click", handler);
  dot.addEventListener("touchstart", handler);
});

// Initialize if slides exist
if (totalSlides > 0) {
  showSlide(index);
  startAutoSlide();
}

// ---- helpers to select and add both click & touch handlers ----
const q = (s) => document.querySelector(s);
const qa = (s) => document.querySelectorAll(s);
const id = (id) => document.getElementById(id);
const className = (cls) => document.getElementsByClassName(cls);

function addClickTouch(el, handler) {
  if (!el) return;
  el.addEventListener("click", handler);
  el.addEventListener("touchstart", function (e) {
    // prevent double-firing on some browsers
    e.preventDefault && e.preventDefault();
    handler(e);
  }, {passive: false});
}

// SHOW SEARCH PAGE
const searchPage = id("searchPage");
const searchIcon = document.querySelectorAll(".searchIcon");
const searchPlay = id("searchPlay");
const searchMsg = className("search-msg")[0];
const inputSearch = id("searchInput");
const searchResult = id("searchResult");
const listPage = id("listPage");
const listPageLarge = id("listPageLarge");
const listBtn = id("listBtn");
const listCloseBtn = id("listCloseBtn");

//search play button
if (searchPlay) {
  addClickTouch(searchPlay, () => {
    if (searchMsg) {
      searchMsg.classList.add("search-msgError");
      searchMsg.innerText = "Not Available Yet!";
    }
  });
}

// Search Not Found
if (inputSearch) {
  inputSearch.addEventListener("input", () => {
    const searchValue = inputSearch.value.trim();
    const query = searchValue.toLowerCase();
    if (query.length === 0 || query !== "mickey") {
      if (searchMsg) {
        searchMsg.innerText = "No results found for ${searchValue}";
        searchMsg.classList.add("search-msgError");
      }
      if (searchResult) searchResult.innerText = "0 Results";
    } else {
      if (searchMsg) searchMsg.classList.remove("search-msgError");
      if (searchResult) searchResult.innerText = "1 of 1 Result";
    }
  });
}

//open and close search page
if (searchIcon) {
    searchIcon.forEach(function(searchIcon){
   searchIcon.addEventListener("click", () => {
    searchPage.classList.add("show-search");
      userNavSec.style.zIndex = '1';
      headerListSec.style.zIndex = '1';
  });
})
}
if (searchPage) {
  searchPage.addEventListener("click", (e) => {
    if (e.target === searchPage) {
      searchPage.classList.remove("show-search");
    }
  });
}

// FOR THE WATCH LIST PAGE
if (listBtn) {
  addClickTouch(listBtn, showWatch);
}
function showWatch(e) {
  e && e.preventDefault && e.preventDefault();
  if (listPage) listPage.classList.add("show-list");
  if (listPageLarge) listPageLarge.classList.add("show-list");
  if (searchPage) searchPage.classList.remove("show-search");
  document.body.classList.add("lock-scroll");

  if (menuClose) menuClose.classList.remove("active");
  if (mainmenu) mainmenu.classList.remove("active");
}

//search icon animation (if you still use these classes elsewhere)
const searchBtn = document.querySelector(".ti-search");
const searchLine = document.querySelector(".line");
const searchInput = document.querySelector(".search-input");
if (searchBtn) {
  addClickTouch(searchBtn, function () {
    if (searchLine) searchLine.classList.toggle("hidden");
    if (searchInput) searchInput.classList.toggle("hidden");
    searchBtn.style.animation = "search-scale 2s forwards ease";
  });
}

//Menu Section
const menuClose = document.querySelector(".menu-close");
const mainmenu = document.querySelector(".mainmenu");
const hamburger = document.querySelectorAll(".menuIcon");

function closeMenu() {
  if (mainmenu) mainmenu.classList.remove("active");
  if (menuClose) menuClose.classList.remove("active");
  document.body.classList.remove("lock-scroll");
  if (listPage) listPage.classList.remove("show-list");
  if (listPageLarge) listPageLarge.classList.remove("show-list");
}
if (hamburger && hamburger.length) {
  hamburger.forEach(function(hamb) {
     addClickTouch(hamb, () => {
      if (menuClose) menuClose.classList.add("active");
      if (mainmenu) mainmenu.classList.add("active");
      document.body.classList.add("lock-scroll");
        userNavSec.style.zIndex = '1';
      headerListSec.style.zIndex = '1';
    });
  });
}
if (menuClose) {
  addClickTouch(menuClose, closeMenu);
}
if (listCloseBtn) {
  addClickTouch(listCloseBtn, closeMenu);
}

// Dropdown toggle for Genre
const menuBody = document.querySelector(".menu-body");
let menuItems = [];
if (menuBody) menuItems = menuBody.querySelectorAll("li");
const genreItem = menuItems && menuItems.length ? menuItems[0] : null;
const dropdown = document.querySelector(".menu-dropdown");

if (genreItem) {
  addClickTouch(genreItem, (e) => {
    e && e.preventDefault && e.preventDefault();
    if (dropdown) dropdown.classList.toggle("active");
    genreItem.classList.toggle("active");
  });
}

// Close dropdown when other menu items are clicked
if (menuItems && menuItems.length) {
  menuItems.forEach((item, index) => {
    if (index !== 0) {
      addClickTouch(item, () => {
        if (dropdown) dropdown.classList.remove("active");
        if (genreItem) genreItem.classList.remove("active");
      });
    }
  });
}

// Show notification
const notification = document.querySelector(".notification-btn");
const notifyPage = document.querySelector(".notification-container");
if (notification) {
  addClickTouch(notification, function () {
    if (notifyPage) notifyPage.classList.add("show-notify");
    if (mainmenu) mainmenu.classList.remove("active");
  });
}

// FOR MOVIDETAILS
const mickey = document.querySelectorAll(".mickey");
const mvDeatil = document.querySelector(".movie-detail");
const main = document.querySelector(".main");
const hdImage = document.querySelector(".hPhd-image");
const footer = document.querySelector(".home-footer");

if (mickey && mickey.length) {
  mickey.forEach(function (m) {
    addClickTouch(m, function () {
      if (mvDeatil) mvDeatil.classList.add("active");
      if (main) main.style.display = "none";
      if (hdImage) hdImage.style.display = "none";
      if (footer) {
        footer.style.backgroundColor = "#000080";
        footer.style.margin = "0";
        footer.style.paddingBottom = "10px";
      }
    });
  });
}

//movie-detail watchlist
const watchlaterBtn = document.querySelector(".watch-later-btn");
const watchlaterBox = document.querySelector(".add-wachlist");
let synopsis = document.querySelector(".synopsis");
if (watchlaterBtn) {
  addClickTouch(watchlaterBtn, function () {
    if (watchlaterBox) watchlaterBox.style.display = "block";
    if (synopsis) synopsis.style.opacity = "0.5";
  });
}

//FOR FORM
const loginBtn = document.querySelectorAll(".formlog-btn");
const signupBtn = document.querySelectorAll(".formsign-btn");
const loginForm = document.querySelector(".login");
const signForm = document.querySelector(".signup");
let header = document.querySelector("header");
let menu = document.querySelector(".mainmenu");
const userSec = document.querySelector('.user');
const nonUser = document.querySelector('.non-user');
const logSign = document.querySelectorAll('.enter-home');
const logoutBtn = document.getElementById('logoutBtn');

// Handle Login or Signup
if (logSign && logSign.length) {
  logSign.forEach(function(btn){
    addClickTouch(btn, function(){
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    });
  });
}

// Check login state when page loads
window.addEventListener("load", function(){
  const logged = localStorage.getItem("isLoggedIn");

  if(logged === "true"){
    if (userSec) userSec.style.display = "block";
    if (nonUser) nonUser.style.display = "none";
  } else {
    if (userSec) userSec.style.display = "none";
    if (nonUser) nonUser.style.display = "block";
  }
});

//logout
if (logoutBtn) {
  addClickTouch(logoutBtn, function(e){
    e && e.preventDefault && e.preventDefault();
    // Remove login state
    localStorage.removeItem("isLoggedIn");
    // Redirect to homepage
    window.location.href = "index.html";
  });
}

if (loginBtn && loginBtn.length) {
  loginBtn.forEach(function (lb) {
    addClickTouch(lb, function () {
      if (loginForm) loginForm.classList.add("active");
      if (signForm) signForm.classList.remove('active');
      if (main) main.style.display = "none";
      if (header) header.style.display = "none";
      if (menu) menu.style.display = "none";
      if (footer) {
        footer.style.backgroundColor = '#000033'
        footer.style.margin = '0px'
      }
    });
  });
}

if (signupBtn && signupBtn.length) {
  signupBtn.forEach(function (sb) {
    addClickTouch(sb, function () {
      if (signForm) signForm.classList.add("active");
      if (loginForm) loginForm.classList.remove('active');
      if (main) main.style.display = "none";
      if (header) header.style.display = "none";
      if (menu) menu.style.display = "none";
      if (footer) {
        footer.style.margin = '0px';
        footer.style.backgroundColor = '#000033';
      }
    });
  });
}
