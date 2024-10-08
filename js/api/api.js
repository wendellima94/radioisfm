document.addEventListener("DOMContentLoaded", function () {
  // Faz a chamada para a API
  fetch("https://api-portal-axli.onrender.com/api/v1/horoscope/data")
    .then((response) => response.json())
    .then((data) => {
      const blogContainer = document.getElementById("blog-container");
      console.log(data);

      // Limpa o container antes de inserir os dados
      blogContainer.innerHTML = "";

      // Itera sobre os 6 primeiros posts recebidos da API
      data.posts.slice(0, 8).forEach((post) => {
        // Cria o HTML para cada post com classes personalizadas
        const blogHTML = `
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="custom-blog-card">
                <img src="${post.imageUrl}" class="img-responsive" alt="Blog image" />
                <div class="custom-blog-content">
                  <span class="custom-category"><i class="flaticon-calendar"></i> ${post.category}</span>
                  <p class="custom-blog-title"><a href="${post.url}" target="_blank">${post.title}</a></p>
                  <p class="custom-blog-description">${post.description}</p>
                  <a class="custom-blog-link" href="${post.url}" target="_blank">Seguir para o site da notícia</a>
                </div>
              </div>
            </div>
          `;

        blogContainer.insertAdjacentHTML("beforeend", blogHTML);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});


let currentImageIndex = 0;
const images = document.querySelectorAll('.slider .prop-image');

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove('active');
    img.style.display = 'none';
    if (i === index) {
      img.classList.add('active');
      img.style.display = 'block'; // Exibe a imagem atual
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

// Troca automática a cada 3 segundos
setInterval(nextImage, 5000);
