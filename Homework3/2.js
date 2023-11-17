const productslist = document.getElementById("products");

let keys = Object.keys(localStorage);

for (let key of keys) {
  let product = document.createElement("div");
  product.classList.add("product-class");
  product.textContent = `${key} Отзывы:`;

  const feedbackList = document.createElement("div");
  feedbackList.id = "feedbackList";

  const feedbacks = JSON.parse(localStorage.getItem(key));
  for (let index = 0; index < feedbacks.length; index++) {
    let feedback = document.createElement("div");
    const text = feedbacks[index];
    const feedbackId = `${key}-${index}`;
    feedback.id = feedbackId;
    feedback.textContent = text;
    feedbackList.appendChild(feedback);
    addButtonForFeedback(feedback, key, text, feedbackId, product);
  }

  product.appendChild(feedbackList);
  productslist.appendChild(product);

  addButtonForFeedbackList(product, feedbackList);
}

function addButtonForFeedbackList(parent, hiddenElement) {
  const button = document.createElement("button");
  button.classList.add("button-feedbackList-class");
  button.value = "show";
  button.textContent = "показать отзывы";
  button.id = "button-feedbackList";

  button.addEventListener("click", function handleClick() {
    if (button.value === "show") {
      button.textContent = "показать отзывы";
      button.value = "close";
      hiddenElement.classList.add("hidden");
    } else {
      button.textContent = "скрыть отзывы";
      button.value = "show";
      hiddenElement.classList.remove("hidden");
    }
  });

  parent.appendChild(button);
}

function addButtonForFeedback(parent, productName, feedback, id, product) {
  const button = document.createElement("button");
  button.classList.add("button-feedback-class");
  button.textContent = "удалить";
  button.id = "button-feedback";
  parent.appendChild(button);

  button.addEventListener("click", function handleClick() {
    const feedbacks = JSON.parse(localStorage.getItem(productName));
    const newFeedbacks = feedbacks.filter((text) => text !== feedback);

    if (newFeedbacks.length === 0) {
      delete localStorage[productName];
      product.remove();
    } else {
      localStorage.setItem(productName, JSON.stringify(newFeedbacks));
      const element = document.getElementById(id);
      element.remove();
    }
  });
}
