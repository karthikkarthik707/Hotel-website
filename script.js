let order = [];   // list of selected items: { name, price, qty }

function addItem(name, price) {
  const item = order.find(i => i.name === name);
  if (item) item.qty++;                       // already in order: increase quantity
  else order.push({ name, price, qty: 1 });   // new item: add it
  showOrder();
}

function changeQty(name, change) {
  const item = order.find(i => i.name === name);
  item.qty += change;
  if (item.qty <= 0) removeItem(name);
  else showOrder();
}

function removeItem(name) {
  order = order.filter(i => i.name !== name); // keep everything except this item
  showOrder();
}

function placeOrder() {
  const msg = document.getElementById("message");
  if (order.length === 0) {                   // nothing selected
    msg.textContent = "Please add at least one item before submitting.";
    msg.className = "error";
    return;
  }
  order = [];                                 // clear the order
  showOrder();                                // refresh the screen (this also hides old messages)
  msg.textContent = "Thank you for your order! Your order is placed.";
  msg.className = "success";                  // show the green message
}

function showOrder() {
  const list = document.getElementById("order-list");
  let total = 0;
  document.getElementById("message").className = "";   // hide any old message
  list.innerHTML = order.length ? "" : "<li>No items selected yet.</li>";

  order.forEach(item => {
    total += item.price * item.qty;
    list.innerHTML += `<li>
      <span>${item.name} - ₹${item.price} × ${item.qty}</span>
      <span>
        <button onclick="changeQty('${item.name}', -1)">−</button>
        <button onclick="changeQty('${item.name}', 1)">+</button>
        <button class="remove" onclick="removeItem('${item.name}')">Remove</button>
      </span>
    </li>`;
  });

  document.getElementById("total").textContent = total;
}

showOrder();   // run once on page load to show the empty state
