'use strict';

// Autocomplete JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-bar input");
    const recentPosts = [
        "How to Enjoy the Journey and Reach Your Goals",
        "The Best Ways To Build Muscle While At Home",
        "Diet Plans: What You Need to Know",
        "The Most Influential Trainers of the Decade",
        "Top 10 Foods for Better Performance",
        "Simple Habits for Long-Term Wellness",
        "How to Stay Fit on a Busy Schedule",
    ];

    const autocompleteList = document.createElement("ul");
    autocompleteList.className = "autocomplete-list";
    searchInput.parentNode.appendChild(autocompleteList);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        autocompleteList.innerHTML = "";

        if (query) {
            const matches = recentPosts.filter((post) =>
                post.toLowerCase().includes(query)
            );

            matches.forEach((match) => {
                const listItem = document.createElement("li");
                listItem.textContent = match;
                listItem.addEventListener("click", () => {
                    searchInput.value = match;
                    autocompleteList.innerHTML = "";
                });
                autocompleteList.appendChild(listItem);
            });
        }
    });

    document.addEventListener("click", (e) => {
        if (!autocompleteList.contains(e.target) && e.target !== searchInput) {
            autocompleteList.innerHTML = "";
        }
    });
});
