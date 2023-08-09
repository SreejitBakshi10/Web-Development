let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  fadeout();
};

function loader() {
  document.querySelector(".loader-container").classList.add("active");
}

function fadeout() {
  setTimeout(loader, 650);
}

// Function to animate numbers
function animateNumbers(targetElement, endValue, displayText) {
  let currentNumber = 0;
  const duration = 2000; // Animation duration in milliseconds
  const stepTime = Math.abs(Math.floor(duration / (endValue - currentNumber)));

  const timer = setInterval(() => {
    currentNumber += 1;
    targetElement.textContent = currentNumber + displayText;
    if (currentNumber >= endValue) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Function to handle intersection
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const iconContainer = entry.target;
      const icons = iconContainer.querySelectorAll(".icons");

      icons.forEach((icon) => {
        const countElement = icon.querySelector("h3");
        const endValue = parseInt(countElement.textContent);
        const displayText = countElement.textContent.replace(/\d+/g, ""); // Get the non-numeric part (e.g., "+")

        animateNumbers(countElement, endValue, displayText);
      });

      observer.unobserve(iconContainer);
    }
  });
}

// Create an intersection observer
const iconContainer = document.querySelector(".icons-container");
const observerOptions = {
  root: null,
  threshold: 0.5, // Trigger animation when at least 50% of the section is visible
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Start observing the section
observer.observe(iconContainer);

// Add event listeners to navigation links
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".navbar a");
  var buttonCLick = document.querySelectorAll(".btn");

  navLinks.forEach(function (link) {
    link.addEventListener("click", playMusic);
  });
  buttonCLick.forEach(function (link) {
    link.addEventListener("click", playMusic);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("scroll-progress");

  function updateProgressBar() {
    const totalScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const scrollPercentage = (currentScroll / totalScroll) * 100;
    progressBar.style.width = scrollPercentage + "%";
  }

  window.addEventListener("scroll", updateProgressBar);
});

// Function to play music
function playMusic() {
  // Create an HTML audio element
  var audio = new Audio("./sounds/click.mp3"); // Replace with the actual path to your audio file
  audio.volume = 0.5;
  audio.play();
}
