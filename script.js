const orders = document.getElementById("orders");
const addOrder = document.getElementById("addOrder");
const orderContainers = document.getElementById("orderContainers");
const payAmount = document.getElementById("payAmount");
const calculateChange = document.getElementById("calculateChange");
const change = document.getElementById("change");

let totalAmount = 0;

orders.addEventListener("change", () => {
  calculateTotal();
});

addOrder.addEventListener("click", () => {
  const orderContainer = document.createElement("div");
  orderContainer.classList.add("orderContainer");
  orderContainer.innerHTML = `
    <select name="orders" class="orderSelect">
      <option value="60">Burger</option>
      <option value="50">Fries</option>
      <option value="20">Fishball</option>
      <option value="25">Kikiam</option>
    </select>
    <button class="removeOrder">Remove Order</button>
  `;
  orderContainers.appendChild(orderContainer);

  const orderSelects = document.querySelectorAll(".orderSelect");
  orderSelects.forEach((select) => {
    select.addEventListener("change", () => {
      calculateTotal();
    });
  });

  const removeOrderButtons = document.querySelectorAll(".removeOrder");
  removeOrderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.remove();
      calculateTotal();
    });
  });
});

calculateChange.addEventListener("click", () => {
  const payment = parseFloat(payAmount.value);
  if (payment < totalAmount) {
    change.innerText = "Insufficient payment.";
  } else {
    change.innerText = `Change: $${(payment - totalAmount).toFixed(2)}`;
  }
});

function calculateTotal() {
  let total = 0;
  const orderSelects = document.querySelectorAll(".orderSelect");
  orderSelects.forEach((select) => {
    if (select.value != 0) total += parseFloat(select.value);
  });
  totalAmount = total;
  change.innerText = `Total: $${totalAmount.toFixed(2)}`;
}

calculateChange.disabled = true;
payAmount.addEventListener("input", () => {
  if (payAmount.value != "") {
    calculateChange.disabled = false;
  } else {
    calculateChange.disabled = true;
  }
});