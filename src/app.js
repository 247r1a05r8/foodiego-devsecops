// FoodieGo demo logic - rebuilt 2026-10-24 from the report's Appendix A.2 / A.4
// excerpts. Fictional data only; no backend, accounts, or payments.
"use strict";

const RESTAURANTS = [
  { id: 1, name: "Campus Biryani House", cuisine: "biryani", category: "biryani", location: "north", price: "\u20B9180" },
  { id: 2, name: "Midnight Slice", cuisine: "pizza", category: "pizza", location: "south", price: "\u20B9249" },
  { id: 3, name: "Lavender Sweets", cuisine: "desserts", category: "dessert", location: "north", price: "\u20B9120" },
  { id: 4, name: "Hostel Handi", cuisine: "biryani", category: "biryani", location: "south", price: "\u20B9150" },
  { id: 5, name: "Golden Crust Pizzeria", cuisine: "pizza", category: "pizza", location: "north", price: "\u20B9299" },
  { id: 6, name: "Champagne Cakes", cuisine: "desserts", category: "dessert", location: "south", price: "\u20B999" }
];

const state = { filter: "all", query: "", location: "all", cart: [] };

const grid = document.getElementById("restaurantGrid");
const toast = document.getElementById("toast");

function renderRestaurants() {
  const list = RESTAURANTS.filter((r) => {
    const matchesFilter = state.filter === "all" || r.category === state.filter;
    const matchesQuery = !state.query ||
      r.name.toLowerCase().includes(state.query) ||
      r.cuisine.toLowerCase().includes(state.query);
    const matchesLocation = state.location === "all" || r.location === state.location;
    return matchesFilter && matchesQuery && matchesLocation;
  });
  grid.innerHTML = "";
  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No restaurants match your search (demo data).";
    grid.appendChild(empty);
    return;
  }
  for (const r of list) {
    const card = document.createElement("article");
    card.className = "r-card";
    const title = document.createElement("h3");
    title.textContent = r.name;
    const cuisine = document.createElement("p");
    cuisine.textContent = "Cuisine: " + r.cuisine;
    const price = document.createElement("p");
    price.textContent = "Avg price: " + r.price + " (fictional)";
    const btn = document.createElement("button");
    btn.className = "order-btn";
    btn.type = "button";
    btn.dataset.id = String(r.id);
    btn.textContent = "Add to cart";
    card.append(title, cuisine, price, btn);
    grid.appendChild(card);
  }
}

function renderCart() {
  document.getElementById("cartCount").textContent = String(state.cart.length);
  const ul = document.getElementById("cartItems");
  ul.innerHTML = "";
  for (const r of state.cart) {
    const li = document.createElement("li");
    li.textContent = r.name + " - " + r.price;
    ul.appendChild(li);
  }
}

function openCart() { document.getElementById("cartDrawer").hidden = false; }

let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2500);
}

document.getElementById("searchPanel").addEventListener("submit", (e) => {
  e.preventDefault();
  state.query = document.getElementById("searchInput").value.trim().toLowerCase();
  state.location = document.getElementById("locationSelect").value;
  renderRestaurants();
});

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  state.filter = btn.dataset.filter;
  renderRestaurants();
});

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

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cartDrawer").hidden = true;
});

renderRestaurants();
