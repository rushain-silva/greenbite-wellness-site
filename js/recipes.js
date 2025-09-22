document.addEventListener("DOMContentLoaded", () => {
    const recipeGrid = document.getElementById("recipeGrid");
    const recipeCount = document.getElementById("recipeCount");
    const recipeModal = document.getElementById("recipeModal");
    const modalDetails = document.getElementById("modalDetails");
    const closeModalBtn = document.getElementById("closeModal");

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const cuisineFilter = document.getElementById("cuisineFilter");

    let allRecipes = []; // This will store the recipes once fetched

    // --- Fetch Recipe Data from JSON file ---
    async function loadRecipes() {
        try {
            const response = await fetch('./recipe.json'); // Adjust path if you saved the JSON elsewhere
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            allRecipes = await response.json();
            renderRecipes(); // Initial render after data is loaded
        } catch (error) {
            console.error("Could not fetch recipes:", error);
            recipeGrid.innerHTML = "<p>Could not load recipes. Please try again later.</p>";
        }
    }

    function renderRecipes() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedCuisine = cuisineFilter.value;

        const filteredRecipes = allRecipes.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
            const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
            const matchesCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
            return matchesSearch && matchesCategory && matchesCuisine;
        });

        recipeGrid.innerHTML = ""; // Clear existing recipes
        filteredRecipes.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "recipe-card";
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="recipe-info">
                    <span class="badge ${recipe.category.toLowerCase()}">${recipe.category}</span>
                    <h3>${recipe.title}</h3>
                    <p>${recipe.tags.join(" • ")}</p>
                    <div class="recipe-meta">
                        <span>⏱ ${recipe.time}</span>
                        <span>🍽 ${recipe.servings} servings</span>
                    </div>
                    <button class="view-btn">View Recipe</button>
                </div>
            `;
            card.querySelector(".view-btn").addEventListener("click", () => openModal(recipe));
            recipeGrid.appendChild(card);
        });

        recipeCount.textContent = `Showing ${filteredRecipes.length} of ${allRecipes.length} recipes`;
    }

    function openModal(recipe) {
        modalDetails.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="modal-img">
            <div class="modal-body">
                <h2>${recipe.title}</h2>
                <p class="modal-tags">${recipe.tags.join(" • ")}</p>
                <div class="modal-meta">
                    <div><strong>⏱</strong><br>${recipe.time}</div>
                    <div><strong>🍽</strong><br>${recipe.servings} servings</div>
                    <div><strong>🌎</strong><br>${recipe.cuisine}</div>
                </div>
                <h3>Ingredients</h3>
                <ul class="ingredient-list">${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
                <h3>Instructions</h3>
                <ol class="instruction-list">${recipe.instructions.map(step => `<li>${step}</li>`).join("")}</ol>
                <h3>Nutrition Information</h3>
                <table class="nutrition-table">
                    <tr><th>Calories</th><td>${recipe.nutrition.calories}</td></tr>
                    <tr><th>Protein</th><td>${recipe.nutrition.protein}</td></tr>
                    <tr><th>Carbohydrates</th><td>${recipe.nutrition.carbs}</td></tr>
                    <tr><th>Fat</th><td>${recipe.nutrition.fat}</td></tr>
                </table>
            </div>
        `;
        recipeModal.classList.remove("hidden");
    }

    function closeModal() {
        recipeModal.classList.add("hidden");
    }

    // --- Event Listeners ---
    closeModalBtn.addEventListener("click", closeModal);
    recipeModal.addEventListener("click", (e) => {
        if (e.target === recipeModal) closeModal();
    });

    searchInput.addEventListener("input", renderRecipes);
    categoryFilter.addEventListener("change", renderRecipes);
    cuisineFilter.addEventListener("change", renderRecipes);

    // --- Initial Load ---
    loadRecipes();
});