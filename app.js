function fetchData(api) {
    return fetch(api)
        .then((response) => response.json())
        .catch((error) => console.log.error("У тебя ошибка, исправь ", error));
}

function renderSneakers(data) {
    let wrapper = document.querySelector(".sneakers-wrapper");
    wrapper.innerHTML = data.map((item) => {
        return `<div class="sneakers-card">
        <button class="sneakers__card-like">
          <img src="./images/like-1.svg" alt="" />
        </button>
        <img
          src="./images/${item.imageUrl}"
          alt=""
          class="sneakers__card-img"
        />
        <h4 class="sneakers__card-title">
       ${item.title}
        </h4>
        <div class="sneakers__card-actions">
          <div class="sneakers__action-price">
            <p>цена</p>
            <b>${item.price}$</b>
          </div>
          <button class="sneakers__actions-cart"><img src="./images/plus.svg" alt=""></button>
        </div>
      </div>`;
    }).join('');
}


fetchData("https://5c782080f150df17.mokky.dev/items").then((data) =>
    renderSneakers(data)
);
