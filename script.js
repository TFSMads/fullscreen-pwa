// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function(registration) {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });
}

const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const displayedImage = document.getElementById('displayedImage');

// Load the image from localStorage on page load, if available
window.addEventListener('load', () => {
  const savedImage = localStorage.getItem('uploadedImage');
  if (savedImage) {
    displayedImage.src = savedImage;
    displayedImage.style.display = 'block';
    uploadBtn.style.display = 'none';
  }
});

// Prevent context menu from appearing on long-press or right-click
window.addEventListener('contextmenu', (e) => e.preventDefault());

// Handle image upload
uploadBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageDataUrl = e.target.result;
      displayedImage.src = imageDataUrl;
      displayedImage.style.display = 'block';
      uploadBtn.style.display = 'none';

      // Save the image in localStorage
      localStorage.setItem('uploadedImage', imageDataUrl);
    };
    reader.readAsDataURL(file);
  }
});
