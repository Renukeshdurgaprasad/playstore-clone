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
ScrollController("scrollContainerImage-app", "prevBtnImage-app1", "nextBtnImage-app1", 316);
ScrollController("scrollContainerVideo-app", "prevBtnVideo-app2", "nextBtnVideo-app2", 412);
ScrollController("scrollContainerVideo1-app", "prevBtnVideo1-app", "nextBtnVideo1-app", 412);
ScrollController("scrollContainerVideo2-app", "prevBtnVideo2-app", "nextBtnVideo2-app", 412);
ScrollController("scrollContainerVideo3-app", "prevBtnVideo3-app", "nextBtnVideo3-app", 412);
ScrollController("scrollContainerVideo4-app", "prevBtnVideo4-app", "nextBtnVideo4-app", 412);
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
  

document.addEventListener('DOMContentLoaded', () => {

    const apiUrl = 'https://raw.githubusercontent.com/Renukeshdurgaprasad/playstore-clone/refs/heads/main/data/appsData.json';
    const container = document.getElementById('appContainer1');

    async function loadAppCards() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const appsData = await response.json();
            
            container.innerHTML = ''; 
            appsData.forEach(app => {
                const appCard = createAppCard(app);
                container.appendChild(appCard);
            });

        } catch (error) {
            console.error("Failed to fetch or process app data:", error);
            container.innerHTML = '<p>Sorry, could not load the apps. Please try again later.</p>';
        }
    }
    function createAppCard(app) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'app-card';
        cardDiv.innerHTML = `
            <div class="card-banner">
                <img src="${app.screenshots[0]}" alt="${app.title} Banner">
            </div>
            <div class="card-details">
                <img class="card-icon" src="${app.icon}" alt="${app.title} Icon">
                <div class="card-text-info">
                    <div class="card-title">${app.title}</div>
                    <div class="card-category">${app.summary}</div>
                    <div class="card-rating">
                        ${(app.ratings/100000000).toFixed(1)} &#9733; 
                    </div>
                </div>
            </div>
        `;
        
        return cardDiv;
    }

    async function loadIcons(iconContainer, startIndex = 0, endIndex = 15) {

    try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const appsData = await response.json();
            iconContainer.innerHTML = '';
            appsData.slice(startIndex, endIndex).forEach(app => {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'Container-vposter-app';

                iconDiv.innerHTML = `
                    <img src="${app.icon}" alt="${app.title} Icon">
                    <div class="app-title">${app.title}</div>
                    <div class="app-rating">
                        <span>${(app.ratings/100000000).toFixed(1)}</span>
                        <span class="star-icon">★</span>
                    </div>
                `;

                iconContainer.appendChild(iconDiv);
            });
        } catch (error) {
            console.error("Failed to fetch or process app data:", error);
            iconContainer.innerHTML = '<p>Sorry, could not load the app icons. Please try again later.</p>';
        }
    }
    loadAppCards();
       const iconContainer = document.getElementById('appImage1');
    loadIcons(iconContainer);
    const iconContainer2 = document.getElementById('Container-app3');
    loadIcons(iconContainer2,1,11);
    const iconContainer3 = document.getElementById('Container-app4');
    loadIcons(iconContainer3,12,23);
    const iconContainer4 = document.getElementById('Container-app5');
    loadIcons(iconContainer4,9,20);
    const iconContainer5 = document.getElementById('Container-app6');
    loadIcons(iconContainer5,15,26);
});



