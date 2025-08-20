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

function toggleHelper() {
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

function ScrollController(scrollContainer, prevButton, nextButton, scrollAmounts) {
    const containers = document.getElementById(scrollContainer);
    const leftButton = document.getElementById(prevButton);
    const rightButton = document.getElementById(nextButton);
    if (!containers || !leftButton || !rightButton) return; // Prevent errors if elements don't exist
    let scrollAmount = scrollAmounts;
    leftButton.addEventListener("click", () => {
        containers.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    rightButton.addEventListener("click", () => {
        containers.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
}
ScrollController("scrollContainerImage", "prevBtnImage", "nextBtnImage", 316);
ScrollController("scrollContainerVideo", "prevBtnVideo", "nextBtnVideo", 412);
ScrollController("scrollContainerVideo1", "prevBtnVideo1", "nextBtnVideo1", 412);


// --- DYNAMIC DATA LOADING FUNCTIONS ---

// Helper function to extract YouTube video ID from the full URL
function getYouTubeId(url) {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        // Standard embed URL: https://www.youtube.com/embed/VIDEO_ID
        const pathParts = urlObj.pathname.split('/');
        return pathParts[pathParts.length - 1];
    } catch (e) {
        console.error("Invalid video URL:", url);
        return null;
    }
}

// Function to populate the top image-based posters
function populateImageCards(container, games) {
    const gamesHtml = games.map(game => `
        <div class="Container-poster">
            <div class="card-preview">
                <img src="${game.screenshots[0]}" alt="${game.title} App Preview">
            </div>
            <div class="card-info">
                <img class="app-icon" src="${game.icon}" alt="${game.title} Icon">
                <div class="app-details">
                    <div class="app-title">${game.title}</div>
                    <div class="app-meta">Action • Multiplayer</div>
                    <div class="app-meta">${game.score.toFixed(1)} &#9733;</div>
                </div>
            </div>
        </div>
    `).join('');
    container.innerHTML = gamesHtml;
}

// Function to populate the video-based posters
function populateVideoCards(container, games) {
    const gamesHtml = games.map(game => {
        const videoId = getYouTubeId(game.video);
        if (!videoId) return ''; // Skip if video ID is not found

        return `
        <div class="Container-vposter" data-youtube-id="${videoId}">
            <div class="video-thumbnail">
                <img src="${game.screenshots[0]}" class="video-poster" alt="${game.title} Poster">
                <div class="play-button"></div>
            </div>
            <div class="game-info">
                <img class="game-icon" src="${game.icon}" alt="${game.title} Icon">
                <div class="game-details">
                    <div class="game-title">${game.title}</div>
                    <div class="game-genre">Action • Role playing</div>
                    <div class="game-rating">${game.score.toFixed(1)} &#9733;</div>
                </div>
            </div>
        </div>
    `}).join('');
    container.innerHTML = gamesHtml;
}

// Main function to fetch data and populate all sections
async function loadAllContent() {
    const url = 'https://raw.githubusercontent.com/Renukeshdurgaprasad/playstore-clone/refs/heads/main/data/GamesData.json';
    
    // Get all the containers we need to fill
    const imageContainer = document.getElementById('imageContainer');
    const videoContainer1 = document.getElementById('videoContainer1');
    const videoContainer2 = document.getElementById('videoContainer2');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const gamesData = await response.json();

        // Populate each section with a different slice of data
        if (imageContainer) populateImageCards(imageContainer, gamesData.slice(0, 15));
        if (videoContainer1) populateVideoCards(videoContainer1, gamesData.slice(9, 24)); // Use a different slice
        if (videoContainer2) populateVideoCards(videoContainer2, gamesData.slice(17,32 )); // And another one
        
    } catch (error) {
        console.error("Failed to fetch and load game data:", error);
        if (imageContainer) imageContainer.innerHTML = '<p>Error loading content.</p>';
        if (videoContainer1) videoContainer1.innerHTML = '<p>Error loading content.</p>';
        if (videoContainer2) videoContainer2.innerHTML = '<p>Error loading content.</p>';
    }
}


// --- YOUTUBE PLAYER & EVENT LISTENERS ---

let player;
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player-container', {
        height: '100%',
        width: '100%',
        playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0, 'showinfo': 0 }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Load all dynamic content when the page is ready
    loadAllContent();

    const modalOverlay = document.getElementById('video-modal-overlay');
    const modalContent = document.getElementById('modal-content');

    // Event Delegation: Listen for clicks on the whole document
    // This is more efficient and works for dynamically added elements
    document.body.addEventListener('click', (event) => {
        // Find the closest parent with the .Container-vposter class
        const videoCard = event.target.closest('.Container-vposter');
        
        if (videoCard) {
            const youtubeId = videoCard.dataset.youtubeId;
            if (youtubeId && player) {
              if (!modalOverlay.classList.contains('active')) {
                  modalOverlay.classList.add('active');
              }
                player.loadVideoById(youtubeId);
            }
        }
    });

    modalOverlay.addEventListener('click', () => {
        if (modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
        if (player && typeof player.stopVideo === 'function') {
            player.stopVideo();
        }
    });

    modalContent.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents modal from closing when clicking inside the video
    });
});