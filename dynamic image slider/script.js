const images = [
  "https://picsum.photos/id/1018/700/450",
  "https://picsum.photos/id/1015/700/450",
  "https://picsum.photos/id/1016/700/450",
  "https://picsum.photos/id/1020/700/450",
];

const slidesContainer = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');

let currentIndex = 0;
let slideInterval;

function initSlider() {
  images.forEach((imgSrc, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slide');

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Slide ${index + 1}`;

    slideDiv.appendChild(img);
    slidesContainer.appendChild(slideDiv);

    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  if (index >= images.length) index = 0;
  if (index < 0) index = images.length - 1;
  currentIndex = index;
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function goToSlide(index) {
  showSlide(index);
}

function startInterval() {
  slideInterval = setInterval(nextSlide, 3500);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

document.getElementById('prevBtn').addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

initSlider();
showSlide(0);
startInterval();
