const locationListHtml = document.querySelector('#location-container');
let data = []
let curPage = 0;
const perPage = 20;
let allDataLoaded = false;

export function init(locationList) {
    data = locationList;
    showData();
};

export function showData() {

    const skeletonItems = Array.from({ length: 10 }, () => `

    `).join('');

    locationListHtml.innerHTML += skeletonItems;

    setTimeout(() => {
        const start = curPage * perPage;
        const end = start + perPage;
        const items = data.slice(start, end);

        const locationItems = items.map(data => `
        <div class="flex-column img-container">
            <div>
                <img class="img-cover light-smooth-border" src="${data.src}" alt="">
                <div class="smooth-border light-shadow guest-good">
                    게스트 선호
                </div>
                <img class="heart-img" src="img/svgexport-12.svg" alt="">
            </div>
            <div class="flex-column img-cover-width img-cover-height top-margin5 side-padding5">
                <div class="star">
                    <img class="star-img" src="img/svgexport-15.svg" alt="">
                    ${data.rating}
                </div>
                <span>${data.location}</span>
                <span class="font-gray font-size15">${data.distance}</span>
                <span class="font-gray font-size15">${data.dates}</span>
                <span class="font-gray font-size15">게스트 한마디 ${data.review}</span>
                <div>
                    <span class="font-bold font-size15">${data.price}</span>
                    <span class="font-size15">/박</span>
                </div>
            </div>
        </div>
        `).join('');

        locationListHtml.innerHTML += locationItems;
        
    }, 500);
    
    locationListHtml.insertAdjacentHTML('beforeend', locationItems);
    
    if (end >= data.length) {
        console.log(data.length);
        allDataLoaded = true;
    }
}

function loadMoreData() {
    if (allDataLoaded) return;
    
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 20)) {
        curPage++;
        showData();
    }
}

window.addEventListener('scroll', loadMoreData);

window.addEventListener('resize', loadMoreData);