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
    if (!containers || !leftButton || !rightButton) return; 
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

function getYouTubeId(url) {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        return pathParts[pathParts.length - 1];
    } catch (e) {
        console.error("Invalid video URL:", url);
        return null;
    }
}

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

function populateVideoCards(container, games) {
    const gamesHtml = games.map(game => {
        const videoId = getYouTubeId(game.video);
        if (!videoId) return ''; 

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

async function loadAllContent() {
    const url = 'https://raw.githubusercontent.com/Renukeshdurgaprasad/playstore-clone/refs/heads/main/data/GamesData.json';
    const imageContainer = document.getElementById('imageContainer');
    const videoContainer1 = document.getElementById('videoContainer1');
    const videoContainer2 = document.getElementById('videoContainer2');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const gamesData = await response.json();
        if (imageContainer) populateImageCards(imageContainer, gamesData.slice(0, 15));
        if (videoContainer1) populateVideoCards(videoContainer1, gamesData.slice(9, 24));
        if (videoContainer2) populateVideoCards(videoContainer2, gamesData.slice(17,32));
    } catch (error) {
        console.error("Failed to fetch and load game data:", error);
        if (imageContainer) imageContainer.innerHTML = '<p>Error loading content.</p>';
        if (videoContainer1) videoContainer1.innerHTML = '<p>Error loading content.</p>';
        if (videoContainer2) videoContainer2.innerHTML = '<p>Error loading content.</p>';
    }
}


let player;
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player-container', {
        height: '100%',
        width: '100%',
        playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0, 'showinfo': 0 }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAllContent();
    const modalOverlay = document.getElementById('video-modal-overlay');
    const modalContent = document.getElementById('modal-content');
    document.body.addEventListener('click', (event) => {
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
        event.stopPropagation(); 
    });
});