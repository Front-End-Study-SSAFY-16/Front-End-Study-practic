const locationListHtml = document.querySelector('#location-container');
let data = []
let curPage = 0;
const perPage = 20;
let allDataLoaded = false;

const listEnd = document.querySelector('#list-end');
const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
};

const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
        if (allDataLoaded) {
            console.log("done");
            observer.unobserve(listEnd);
            return;
        }
        if (entry.isIntersecting) {
            console.log("loadingData");
            showData();
        }
    })
}

export function showData() {
    const skeletonItems = Array.from({ length: perPage }, () => `
        <div class="skeleton flex-column img-container">
            <div>
                <div class="skeleton-color img-cover light-smooth-border"></div>
            </div>
            <div class="flex-column img-cover-width img-cover-height top-margin5 side-padding5"></div>
        </div>
    `).join('');

    for (let i = 0; i < perPage; i++){
        const skeleton = document.createElement('div');
        skeleton.className = "skeleton flex-column img-container";
        const img_container = document.createElement('div');
        const img = document.createElement('div');
        img.className = "skeleton-color img-cover light-smooth-border";
        img_container.appendChild(img);

        const content_container = document.createElement('div');
        content_container.className = "flex-column img-cover-width img-cover-height top-margin5 side-padding5";

        skeleton.appendChild(img_container);
        skeleton.appendChild(content_container);

        locationListHtml.appendChild(skeleton);

        setTimeout(function () {
            skeleton.classList.add('show');
        }, 30);
    }

    const start = curPage * perPage;
    const end = start + perPage;
    const items = data.slice(start, end);

    setTimeout(() => {
        items.forEach(data => {
            setTimeout(() => {
                let locationHtml = `
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
                </div>`;

                let firstSkeleton = document.querySelector('.skeleton');
                if (firstSkeleton !== null) {
                    firstSkeleton.outerHTML = locationHtml;
                } else {
                    locationListHtml.insertAdjacentHTML('beforeend', locationHtml);
                }
            }, 30);
        });

    }, 1000);
    
    if (end >= data.length) {
        console.log(data.length);
        allDataLoaded = true;
    }
    curPage++;
}

export function init(locationList) {
    data = locationList;
    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(listEnd);
};