import getData from './getData.js';
import { makeCategory } from './category.js';
import { makeLocations } from './locations.js'

window.onload = async function () {
    const categoryPath = await getData('/AirBnB/최준혁/Vanilla/data/category.json');
    makeCategory(categoryPath);

    const locationPath = await getData('/AirBnB/최준혁/Vanilla/data/locations.json')
    makeLocations(locationPath);
};