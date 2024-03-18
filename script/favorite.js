function fetchData(api) {
    return fetch(api)
        .then((response) => response.json())
        .catch((error) => console.error("У тебя ошибка", error));
}

function renderSneakers(data) {
    let wrapper = document.querySelector(".sneakers-wrapper");
    wrapper.innerHTML = data
        .map((item) => {
            return `
        <div class="sneakers-card">
            <button class="sneakers__card-like">
              <img src="./images/like-1.svg" alt=""  class="card-like" data-sneaker-id="${item.id}" data-fava-id="-1"/>
            </button>
            <img src="./images/${item.imageUrl}" alt="" class="sneakers__card-img" />
            <h4 class="sneakers__card-title">
              ${item.title}
            </h4>
            <div class="sneakers__card-actions">
                <div class="sneakers__action-price">
                    <b>Цена</b>
                    <b>${item.price}$</b>
                </div>
                <button class="sneakers__action-cart">
                    <img src="./images/plus.svg" alt="">
                </button>
            </div>
          </div>`;
        })
        .join("");
}



let nameInput = document.getElementById("name");
let btn = document.getElementById("submit");

btn.addEventListener("click", function () {
    let nameValue = nameInput.value;
    return fetch("https://e2f858bd63da2370.mokky.dev/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameValue
            }),
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
});

let cardLike = document.querySelector("sneakers__card-like");

function addLike(sneakerId) {
    return fetch("https://e2f858bd63da2370.mokky.dev/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                like: sneakerId
            }),
        })
        .then((response) => response.json())
        .catch((error) => console.log("error:", error));
}

function removeLike(likeId) {
    return fetch(`https://e2f858bd63da2370.mokky.dev/favorites/${likeId}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .catch((err) => console.log(err));
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("card-like")) {
        if (event.target.src === "http://127.0.0.1:5500/images/like-1.svg") {
            event.target.src = "../images/like-2.svg";
            const sneakerId = event.target.dataset.sneakerId;
            addLike(sneakerId).then((json) => (event.target.dataset.favId = json.id));
        } else {
            event.target.src = "../images/like-1.svg";
            const likeId = event.target.dataset.favId;
            removeLike(likeId);
        }
    }
});

function renderLikedSneakers(likedSneakers) {
    let favImg = document.querySelectorAll(".card-like")

    favImg.forEach((favImg) => {
        let sneakerId = favImg.dataset.sneakerId;
        if (likedSneakers.some((sneaker) => sneaker.sneakerId === sneakerId)) {
            favImg.src = '../images/like-2.svg '
        }
    })
}

fetchData('https://5c782080f150df17.mokky.dev/items').then((data) => {
    renderSneakers(data)
    fetch('https://e2f858bd63da2370.mokky.dev/favorites')
        .then((response) => response.json())
        .then((data) => {
            likedSneakers(data);
        });
});





