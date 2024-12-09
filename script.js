// Access the video element, canvas, and other necessary elements
const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const canvas = document.getElementById('canvas');
const dateTimeDisplay = document.getElementById('dateTime');
const locationDisplay = document.getElementById('location');
const imageList = document.getElementById('imageList');

// Start the video feed
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (err) {
        alert("Error accessing the camera: " + err);
    });

// Capture the photo when the button is clicked
captureButton.addEventListener('click', function () {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Show the canvas
    canvas.style.display = 'block';

    // Get the current date, time, and location
    const now = new Date();
    const dateTime = now.toLocaleString();
    dateTimeDisplay.textContent = `Date & Time: ${dateTime}`;

    // Get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            locationDisplay.textContent = `Location: Latitude: ${lat}, Longitude: ${lon}`;
        }, function (err) {
            locationDisplay.textContent = 'Location: Not available';
        });
    } else {
        locationDisplay.textContent = 'Location: Geolocation not supported';
    }

    // Convert the canvas to a data URL (image format) for upload
    const imageData = canvas.toDataURL('image/png');

    // Upload image (for now just display it in the list)
    const listItem = document.createElement('li');
    const img = document.createElement('img');
    img.src = imageData;
    img.width = 100;  // Set size for display

    listItem.appendChild(img);
    listItem.appendChild(document.createTextNode(`Captured at ${dateTime}`));
    imageList.appendChild(listItem);
});
