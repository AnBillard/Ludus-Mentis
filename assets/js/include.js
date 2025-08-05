
document.addEventListener("DOMContentLoaded", () => {
  fetch("components/header.html")
    .then(r => r.text())
    .then(d => document.getElementById("header").innerHTML = d);

  fetch("components/footer.html")
    .then(r => r.text())
    .then(d => document.getElementById("footer").innerHTML = d);
});
