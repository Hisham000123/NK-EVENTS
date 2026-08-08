const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const productContainer = document.getElementById("productContainer");
const categoryTitle = document.getElementById("categoryTitle");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");
const navLinks = document.querySelectorAll("#navbarMenu .nav-link");
const navbarMenu = document.getElementById("navbarMenu");

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        const bsCollapse = bootstrap.Collapse.getInstance(navbarMenu);

        if (bsCollapse) {
            bsCollapse.hide();
        }

    });
});

let allProducts = [];

// Category names
if (categoryTitle) {
    const categoryNames = {
        catering: "Catering & Cooking Utensils",
        event: "Event Equipments",
        stage: "Stage Decoration"
    };

    categoryTitle.textContent =
        categoryNames[category] || "All Products";
}

// Fetch products
fetch("./products.json")
    .then(res => res.json())
    .then(data => {

        allProducts = category
            ? data.products.filter(product => product.category === category)
            : data.products;

        displayProducts(allProducts);

    })
    .catch(() => {

        productContainer.innerHTML = `
            <h4 class="text-center text-danger">
                Unable to load products
            </h4>
        `;

    });


// Display products
function displayProducts(products) {

    if (!products.length) {

        productContainer.innerHTML = "";

        noProducts.classList.remove("d-none");

        return;
    }

    noProducts.classList.add("d-none");

    productContainer.innerHTML = products.map(product => {

        // Stage doesn't show title
        const title = product.category !== "stage"
            ? `<h5>${product.name}</h5>`
            : "";

        return `
            <div class="col-md-4 mb-4">

                <div class="card product-card h-100 shadow-sm">

                    <img
                        src="${product.image}"
                        class="card-img-top product-image ${
                            product.category === "stage"
                                ? "stage-image"
                                : "normal-image"
                        }"
                        alt="${product.name}"
                    >

                    <div class="card-body d-flex flex-column">

                        ${title}

                        <a
                            href="main.html#contact"
                            class="btn mt-auto">
                            Enquire Now
                        </a>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


// Search by name
if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = this.value.toLowerCase().trim();

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchText)
        );

        displayProducts(filteredProducts);

    });

}