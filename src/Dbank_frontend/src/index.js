import { Dbank_backend } from "../../declarations/Dbank_backend"

window.addEventListener("load", async function() {
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await Dbank_backend.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await Dbank_backend.withdraw(outputAmount);
  }

  await Dbank_backend.compound();

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
});

async function update() {
  const currentValue = await Dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentValue * 100) / 100;
}