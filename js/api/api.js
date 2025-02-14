// document.addEventListener("DOMContentLoaded", function () {
//   // Faz a chamada para a API
//   fetch("https://api-portal-axli.onrender.com/api/v1/horoscope/data")
//     .then((response) => response.json())
//     .then((data) => {
//       const blogContainer = document.getElementById("blog-container");
//       console.log(data);

//       // Limpa o container antes de inserir os dados
//       blogContainer.innerHTML = "";

//       // Itera sobre os 6 primeiros posts recebidos da API
//       data.posts.slice(0, 8).forEach((post) => {
//         // Cria o HTML para cada post com classes personalizadas
//         const blogHTML = `

//             <div class="col-lg-6 col-md-12 col-sm-12">
//               <div class="custom-blog-card">
//                 <img src="${post.imageUrl}" class="img-responsive" alt="Blog image" />
//                 <div class="custom-blog-content">
//                   <span class="custom-category"><i class="flaticon-calendar"></i> ${post.category}</span>
//                   <p class="custom-blog-title"><a href="${post.url}" target="_blank">${post.title}</a></p>
//                   <p class="custom-blog-description">${post.description}</p>
//                   <a class="custom-blog-link" href="${post.url}" target="_blank">Seguir para o site da notícia</a>
//                 </div>
//               </div>
//             </div>
//           `;

//         blogContainer.insertAdjacentHTML("beforeend", blogHTML);
//       });
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// });

let currentImageIndex = 0;
const images = document.querySelectorAll(".slider .prop-image");

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("active");
    img.style.display = "none";
    if (i === index) {
      img.classList.add("active");
      img.style.display = "block";
    }
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
}

setInterval(nextImage, 5000);

// carrousel programação
document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slides = sliderTrack.children.length;
  const visibleSlides = 4; // Quantidade de slides visíveis
  const slideWidth = 100 / slides; // Porcentagem da largura de um slide
  let currentIndex = 0;

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides - visibleSlides) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  function updateSliderPosition() {
    const offset = currentIndex * -slideWidth; // Move 1 slide por vez
    sliderTrack.style.transform = `translateX(${offset}%)`;
  }
});

// stick bar
document.addEventListener("DOMContentLoaded", () => {
  const stickyElement = document.getElementById("sticky-social-bar");
  const stickyOffset = stickyElement.offsetTop;

  window.addEventListener("scroll", () => {
    if (window.scrollY > stickyOffset) {
      stickyElement.classList.add("sticky-bar");
    } else {
      stickyElement.classList.remove("sticky-bar");
    }
  });
});

// Params
let mainSliderSelector = ".main-slider",
  navSliderSelector = ".nav-slider",
  interleaveOffset = 0.5;

// Main Slider
let mainSliderOptions = {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
  },
  loopAdditionalSlides: 10,
  grabCursor: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      this.autoplay.stop();
    },
    imagesReady: function () {
      this.el.classList.remove("loading");
      this.autoplay.start();
    },
    slideChangeTransitionEnd: function () {
      let swiper = this,
        captions = swiper.el.querySelectorAll(".caption");
      for (let i = 0; i < captions.length; ++i) {
        captions[i].classList.remove("show");
      }
      swiper.slides[swiper.activeIndex]
        .querySelector(".caption")
        .classList.add("show");
    },
    progress: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress,
          innerOffset = swiper.width * interleaveOffset,
          innerTranslate = slideProgress * innerOffset;

        swiper.slides[i].querySelector(".slide-bgimg").style.transform =
          "translateX(" + innerTranslate + "px)";
      }
    },
    touchStart: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function (speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-bgimg").style.transition =
          speed + "ms";
      }
    },
  },
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
let navSliderOptions = {
  loop: true,
  loopAdditionalSlides: 10,
  speed: 1000,
  spaceBetween: 4,
  slidesPerView: 4,
  centeredSlides: true,
  touchRatio: 0.1,
  slideToClickedSlide: true,
  direction: "vertical",
  on: {
    imagesReady: function () {
      this.el.classList.remove("loading");
    },
    click: function () {
      mainSlider.autoplay.stop();
    },
  },
};
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
