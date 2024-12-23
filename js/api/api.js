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
const images = document.querySelectorAll('.slider .prop-image');

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove('active');
    img.style.display = 'none';
    if (i === index) {
      img.classList.add('active');
      img.style.display = 'block';
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
document.addEventListener('DOMContentLoaded', () => {
  const sliderTrack = document.querySelector('.slider-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const slides = sliderTrack.children.length;
  const visibleSlides = 4; // Quantidade de slides visíveis
  const slideWidth = 100 / slides; // Porcentagem da largura de um slide
  let currentIndex = 0;

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextBtn.addEventListener('click', () => {
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
