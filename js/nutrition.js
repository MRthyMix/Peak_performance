'use strict';

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";

// Nutrient IDs used by USDA FoodData Central
const NUTRIENT_IDS = {
    calories: 1008,
    protein:  1003,
    fat:      1004,
    carbs:    1005
};

function getNutrientValue(foodNutrients, id) {
    const match = foodNutrients.find(n => n.nutrientId === id);
    return match ? match.value.toFixed(1) : "N/A";
}

document.addEventListener("DOMContentLoaded", () => {
    const foodInput       = document.getElementById("foodInput");
    const fetchBtn        = document.getElementById("fetchNutrition");
    const nutritionResult = document.getElementById("nutritionResult");

    // --- Autocomplete ---
    const suggestionList = document.createElement("ul");
    suggestionList.className = "autocomplete-list";
    foodInput.parentNode.style.position = "relative";
    foodInput.parentNode.appendChild(suggestionList);

    let debounceTimer;

    foodInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        const query = foodInput.value.trim();
        suggestionList.innerHTML = "";

        if (query.length < 2) return;

        debounceTimer = setTimeout(async () => {
            const apiKey = (window.API_CONFIG || {}).USDA_API_KEY;
            if (!apiKey) return;

            try {
                const res = await fetch(
                    `${USDA_BASE}/foods/search?query=${encodeURIComponent(query)}&pageSize=6&api_key=${apiKey}`
                );
                if (!res.ok) return;
                const data = await res.json();

                (data.foods || []).forEach(food => {
                    const li = document.createElement("li");
                    li.textContent = food.description;
                    li.addEventListener("click", () => {
                        foodInput.value = food.description;
                        suggestionList.innerHTML = "";
                    });
                    suggestionList.appendChild(li);
                });
            } catch (_) { /* silently ignore autocomplete errors */ }
        }, 300);
    });

    document.addEventListener("click", e => {
        if (!suggestionList.contains(e.target) && e.target !== foodInput) {
            suggestionList.innerHTML = "";
        }
    });

    // --- Nutrition lookup ---
    fetchBtn.addEventListener("click", async () => {
        const query = foodInput.value.trim();
        suggestionList.innerHTML = "";

        if (!query) {
            nutritionResult.innerHTML = "<p>Please enter a food item.</p>";
            return;
        }

        const apiKey = (window.API_CONFIG || {}).USDA_API_KEY;
        if (!apiKey) {
            nutritionResult.innerHTML = "<p>API key not found. Please check js/config.js.</p>";
            return;
        }

        nutritionResult.innerHTML = "<p>Loading...</p>";

        try {
            const res = await fetch(
                `${USDA_BASE}/foods/search?query=${encodeURIComponent(query)}&pageSize=1&api_key=${apiKey}`
            );
            if (!res.ok) throw new Error("Failed to fetch nutrition data.");

            const data = await res.json();
            const food = (data.foods || [])[0];

            if (!food) {
                nutritionResult.innerHTML = "<p>No data found for that food item.</p>";
                return;
            }

            const nutrients = food.foodNutrients || [];
            nutritionResult.innerHTML = `
                <p><strong>${food.description} Nutrition Info:</strong></p>
                <p>Calories: ${getNutrientValue(nutrients, NUTRIENT_IDS.calories)} kcal</p>
                <p>Protein: ${getNutrientValue(nutrients, NUTRIENT_IDS.protein)} g</p>
                <p>Fat: ${getNutrientValue(nutrients, NUTRIENT_IDS.fat)} g</p>
                <p>Carbohydrates: ${getNutrientValue(nutrients, NUTRIENT_IDS.carbs)} g</p>
            `;
        } catch (error) {
            nutritionResult.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});
