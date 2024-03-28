var texts = ['W', 'e', 'l', 'c', 'o', 'm', 'e'];
var number_of_particle = 12;

for (var i = 0; i < texts.length; i++) {
  var span = document.createElement("span");
  span.textContent = texts[i];
  span.classList.add("background" + i); // Add class for background styling
  span.classList.add("criterion"); // Add class for criterion styling
  document.body.appendChild(span);
}
