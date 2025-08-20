
const mainHeader = document.querySelector('.main-header');
    const openSearchBtn = document.getElementById('openSearchBtn');
    const closeSearchBtn = document.getElementById('headerCloseSearchBtn');
    const headerSearchInput = document.getElementById('headerSearchInput');
 if (mainHeader && openSearchBtn && closeSearchBtn && headerSearchInput) {
        
        openSearchBtn.addEventListener('click', () => {
            mainHeader.classList.add('search-active');
            headerSearchInput.focus();
        });

        closeSearchBtn.addEventListener('click', () => {
            mainHeader.classList.remove('search-active');
        });
    }

function toggleHelper(){
  const helperContainer = document.querySelector('.help-function');
  const infoBoxCloseBtn = document.getElementById('infoBoxCloseBtn');
  const helpIcon = document.getElementById('helpIcon');
  helpIcon.addEventListener('click', () => {
    helperContainer.classList.contains('active') ? helperContainer.classList.remove('active') : helperContainer.classList.add('active');
  });
  infoBoxCloseBtn.addEventListener('click', () => {
    helperContainer.classList.remove('active');
  });
}
toggleHelper();
function ScrollController(scrollContainer,prevButton,nextButton,scrollAmounts){
const containers = document.getElementById(scrollContainer);
const leftButton = document.getElementById(prevButton);
const rightButton = document.getElementById(nextButton);
let scrollAmount = scrollAmounts;
  leftButton.addEventListener("click", () => {
  containers.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

rightButton.addEventListener("click", () => {
  containers.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});
}
ScrollController("scrollContainerImage", "prevBtnImage", "nextBtnImage", 316);
ScrollController("scrollContainerVideo", "prevBtnVideo", "nextBtnVideo", 412);
ScrollController("scrollContainerVideo1", "prevBtnVideo1", "nextBtnVideo1", 412);

// Wait for the HTML document to be fully loaded before running the script
let player; // This will hold the single, reusable YouTube player object

// This function is required by the YouTube API and is called automatically
function onYouTubeIframeAPIReady() {
    // Create the player, but don't specify a video ID yet
    player = new YT.Player('youtube-player-container', {
        height: '100%',
        width: '100%',
        playerVars: {
            'autoplay': 1,    // Autoplay the video when the modal opens
            'controls': 1,    // Show the player controls
            'rel': 0,         // Don't show related videos at the end
            'showinfo': 0     // Hide video title and uploader info
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('video-modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    // Find all video cards on the page
    const videoCards = document.querySelectorAll('.Container-vposter');

    // Add a click listener to each card
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const youtubeId = card.dataset.youtubeId;
            if (youtubeId && player) {
                // Show the modal
                modalOverlay.classList.add('active');
                // Load and play the video corresponding to the clicked card
                player.loadVideoById(youtubeId);
            }
        });
    });

    // Close the modal when clicking on the dark overlay
    modalOverlay.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        // Stop the video to prevent it from playing in the background
        if (player && typeof player.stopVideo === 'function') {
            player.stopVideo();
        }
    });

    // Prevent the modal from closing when clicking on the video itself
    modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});