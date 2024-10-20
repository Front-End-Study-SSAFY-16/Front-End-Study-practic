export function makeCategory(categoryList) {
    const categoryListHTML = document.getElementById('category-list');

    categoryList.forEach(data => {
        const div = document.createElement('div');

        div.className = 'little-something category-item';
    
        
        const img = document.createElement('img');
        img.src = data.src;

        const text = document.createElement('text');
        text.textContent = data.text;

        div.appendChild(img);
        div.appendChild(text);

        categoryListHTML.appendChild(div);
    });


    const categoryContainer = document.querySelector('#category-list');

    const scrollAmount = 500;
    const leftBtn = document.querySelector('#carousel-left-btn');
    
    leftBtn.addEventListener('click', function () {
        categoryContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    })


    const rightBtn = document.querySelector('#carousel-right-btn');
    rightBtn.addEventListener('click', function () {
        categoryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    })
};