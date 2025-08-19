const mainHeader = document.querySelector('.main-header');
    const openSearchBtn = document.getElementById('openSearchBtn');
    const closeSearchBtn = document.getElementById('headerCloseSearchBtn');
    const headerSearchInput = document.getElementById('headerSearchInput');
 if (mainHeader && openSearchBtn && closeSearchBtn && headerSearchInput) {
        
        openSearchBtn.addEventListener('click', () => {
            mainHeader.classList.add('search-active');
            headerSearchInput.focus(); // Immediately focus the input field for good UX
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
  