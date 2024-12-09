// JavaScript to handle image click and show in lightbox
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.image-item img');
    
    // Create a lightbox element
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.style.display = 'none';
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    // Event listener for each image
    images.forEach(image => {
        image.addEventListener('click', function () {
            lightboxImg.src = image.src;  // Set the clicked image as the lightbox image
            lightbox.style.display = 'flex';  // Show the lightbox
        });
    });

    // Close the lightbox when clicked outside the image
    lightbox.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });
});
