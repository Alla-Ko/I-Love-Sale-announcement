// Smooth scroll for header navigation
document.querySelectorAll('.header-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerHeight =
      document.querySelector(".site-header")?.offsetHeight ?? 0;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    history.replaceState(null, "", targetId);
  });
});

// Form submission
const form = document.getElementById("contact-form");
const successModal = document.getElementById("successModal");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();

      successModal.classList.add("active");
    }
  } catch (error) {
    alert("Помилка відправки. Спробуйте пізніше.");
  }
});

// Close modal
function closeModal() {
  document.getElementById("successModal").classList.remove("active");
}

// Close on overlay click
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
