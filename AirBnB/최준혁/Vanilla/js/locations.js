export function makeLocations(locationList) {
    const locationListHtml = document.querySelector('#location-container');

    const locationItems = locationList.map(data => `
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
    
    locationListHtml.innerHTML = locationItems;
};