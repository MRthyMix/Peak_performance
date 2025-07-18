'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const fetchNutritionButton = document.getElementById("fetchNutrition");
    const nutritionResult = document.getElementById("nutritionResult");

    fetchNutritionButton.addEventListener("click", async () => {
        const foodItem = document.getElementById("foodInput").value.trim();
        if (!foodItem) {
            nutritionResult.innerHTML = "<p>Please enter a food item.</p>";
            return;
        }

        try {
            // Import API credentials from config file
            const { NUTRITIONIX_APP_ID: appId, NUTRITIONIX_APP_KEY: appKey } = window.API_CONFIG || {};
            
            if (!appId || !appKey) {
                throw new Error("API credentials not found. Please check your configuration.");
            }

            const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": appId,
                    "x-app-key": appKey
                },
                body: JSON.stringify({ query: foodItem })
            });

            if (!response.ok) throw new Error("Failed to fetch nutrition data.");

            const data = await response.json();

            if (data.foods && data.foods.length > 0) {
                const food = data.foods[0];
                nutritionResult.innerHTML = `
                    <p><strong>${food.food_name} Nutrition Info:</strong></p>
                    <p>Calories: ${food.nf_calories} kcal</p>
                    <p>Protein: ${food.nf_protein} g</p>
                    <p>Fat: ${food.nf_total_fat} g</p>
                    <p>Carbohydrates: ${food.nf_total_carbohydrate} g</p>
                `;
            } else {
                nutritionResult.innerHTML = "<p>No data available for the entered food item.</p>";
            }
        } catch (error) {
            nutritionResult.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});
