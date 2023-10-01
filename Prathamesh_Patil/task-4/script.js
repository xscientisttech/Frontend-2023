document.addEventListener("DOMContentLoaded", () => {
  const charlength = document.querySelector("#charlength");
  const passwordInput = document.querySelector("#password");

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    if (password.length < 8 && password.length > 0) {
      charlength.style.color = "black";
      charlength.style.backgroundColor = "red";
    } else {
      charlength.style.backgroundColor = "";
    }
  });
});
