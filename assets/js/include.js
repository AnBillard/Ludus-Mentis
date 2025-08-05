
document.addEventListener("DOMContentLoaded", () => {
  // Charger le header
  fetch("components/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    });

  // Charger le footer
  fetch("components/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});
