
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
ScrollController("scrollContainerImage", "prevBtnImage", "nextBtnImage", 316);
ScrollController("scrollContainerVideo", "prevBtnVideo", "nextBtnVideo", 412);
ScrollController("scrollContainerVideo1", "prevBtnVideo1", "nextBtnVideo1", 412);

const searchFunction=document.getElementById("searchIcon");
searchFunction.addEventListener("click", async () => {
    
});




