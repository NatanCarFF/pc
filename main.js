import { fetchData } from './dataFetcher.js';
import { renderCards } from './cardRenderer.js';
import { setupPagination } from './pagination.js';
import { setupFilter } from './filter.js';
import { setupThemeSelector } from './themeSelector.js';

const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1GfE-B04M2a37XhHhVn4G1BvQ0Tf4t8kFh3kF5q/pub?output=csv";

document.addEventListener('DOMContentLoaded', async () => {
    const cardContainer = document.getElementById('cardContainer');
    const allData = await fetchData(spreadsheetUrl);

    if (allData) {
        setupPagination(allData, cardContainer, renderCards);
        setupFilter(allData, cardContainer);
        setupThemeSelector();
    }
});