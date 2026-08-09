const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const productContainer = document.getElementById("productContainer");
const categoryTitle = document.getElementById("categoryTitle");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");
const navbarMenu = document.getElementById("navbarMenu");

let allProducts = [];

/* -------------------------
   Category Title
------------------------- */

const categoryNames = {
    catering: "Catering & Cooking Utensils",
    event: "Event Equipments",
    stage: "Stage Decoration"
};

if (categoryTitle) {
    categoryTitle.textContent =
        categoryNames[category] || "All Products";
}


/* -------------------------
   Mobile Navbar
------------------------- */

if (navbarMenu) {

    const navLinks = navbarMenu.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            // Only close on mobile
            if (window.innerWidth < 992) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbarMenu);

                if (bsCollapse) {
                    bsCollapse.hide();
                }

            }

        });

    });

}


/* -------------------------
   Fetch Products
------------------------- */

fetch("./products.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Products file not found");
        }

        return response.json();

    })
    .then(data => {

        allProducts = category
            ? data.products.filter(
                product => product.category === category
            )
            : data.products;

        displayProducts(allProducts);

    })
    .catch(error => {

        console.error(error);

        if (productContainer) {
            productContainer.innerHTML = `
                <div class="col-12 text-center">
                    <h4 class="text-danger">
                        Unable to load products
                    </h4>

                    <p class="text-muted">
                        Please try again later.
                    </p>
                </div>
            `;
        }

    });


/* -------------------------
   Display Products
------------------------- */

function displayProducts(products) {

    if (!productContainer) return;

    if (!products.length) {

        productContainer.innerHTML = "";

        if (noProducts) {
            noProducts.classList.remove("d-none");
        }

        return;
    }

    if (noProducts) {
        noProducts.classList.add("d-none");
    }

    productContainer.innerHTML = products.map(product => {

        const title =
            product.category !== "stage"
                ? `<h5 class="fw-bold">${product.name}</h5>`
                : "";

        const imageClass =
            product.category === "stage"
                ? "stage-image"
                : "normal-image";

        return `
            <div class="col-12 col-sm-6 col-lg-4 mb-4">

                <div class="card product-card h-100 shadow-sm">

                    <img
                        src="${product.image}"
                        class="card-img-top product-image ${imageClass}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    <div class="card-body d-flex flex-column">

                        ${title}

                        <a
                            href="index.html#contact"
                            class="btn mt-auto">
                            Enquire Now
                        </a>

                    </div>

                </div>

            </div>
        `;

    }).join("");

}


/* -------------------------
   Search
------------------------- */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();

        const filteredProducts = allProducts.filter(product =>
            product.name &&
            product.name.toLowerCase().includes(searchText)
        );

        displayProducts(filteredProducts);

    });

}