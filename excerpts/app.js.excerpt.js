// EXCERPTS from the project report (Appendix A.2 and A.4), not the full file

// A.2 - search and filter
function renderRestaurants() {
  const list = RESTAURANTS.filter((r) => {
    const matchesFilter = state.filter === "all" || r.category === state.filter;
    const matchesQuery = !state.query ||
      r.name.toLowerCase().includes(state.query) ||
      r.cuisine.toLowerCase().includes(state.query);
    return matchesFilter && matchesQuery;
  });
  // ...render each restaurant as a card
}

// A.4 - cart logic
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".order-btn");
  if (!btn) return;
  const restaurant = RESTAURANTS.find(
    (r) => r.id === Number(btn.dataset.id)
  );
  state.cart.push(restaurant);
  renderCart();
  openCart();
  showToast(`Added an item from ${restaurant.name} (demo only)`);
});
