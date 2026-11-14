
// MOBILE NAVIGATION

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});


// PRODUCT FILTERING

const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("productSearch");

let activeCategory = "all";

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  productCards.forEach(card => {
    const category = card.dataset.category;
    const name = card.dataset.name;

    const categoryMatch =
      activeCategory === "all" ||
      category === activeCategory;

    const searchMatch =
      name.includes(searchTerm);

    card.hidden = !(categoryMatch && searchMatch);
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    activeCategory = button.dataset.filter;

    filterProducts();
  });
});

searchInput.addEventListener("input", filterProducts);


// PRODUCT ENQUIRY BUTTONS

document.querySelectorAll(".inquire").forEach(button => {

  button.addEventListener("click", () => {

    const productName = button.dataset.product;
    const messageBox = document.querySelector(
      'textarea[name="message"]'
    );

    messageBox.value =
      `I would like more information about ${productName}.`;

    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });

  });

});


// CONTACT FORM

document.getElementById("contactForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const interest = formData.get("interest");
    const message = formData.get("message");

    // REPLACE WITH THE COMPANY'S VERIFIED EMAIL
    const companyEmail = "REPLACE-WITH-COMPANY-EMAIL@example.com";

    const subject = encodeURIComponent(
      `Product Enquiry - ${interest}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Interest: ${interest}\n\n` +
      `Message:\n${message}`
    );

    window.location.href =
      `mailto:${companyEmail}?subject=${subject}&body=${body}`;

  });


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// SCROLL REVEAL ANIMATIONS

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});
