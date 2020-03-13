const API_KEY = "bb3007a33ef910f54c4848deee5d9b55";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w185";

const sendAPIRequest = (url, params = "") =>
  fetch(`${BASE_URL}/${url}?api_key=${API_KEY}${params}`).then(result =>
    result.json()
  );
//Створити об'єкт заголовку
createItemTitle = (title, container = "h1") => {
  let titleEl = document.createElement(container);
  titleEl.innerHTML = title;
  return titleEl;
};

//creates Item element for rendering
const createItem = item => {
  if (item.id && item.title) {
    let a = document.createElement("a");
    a.href = `?id=${item.id}`;
    a.appendChild(createItemTitle(item.title, "li"));
    return a;
  } else {
    console.error("Item is not valid", item);
  }
};

// Генератор списку фільмів
const renderListOfItems = (items, len = items.length) => {
  const listOfMoviesEl = document.getElementById("list-of-movies");
  for (let i = 0; i < items.length, i < len; i++) {
    listOfMoviesEl.prepend(createItem(items[i]));
  }
};

// Сторінка топових фільмі (домашня)
const renderHomePage = () =>
  sendAPIRequest("movie/popular").then(({ results }) =  >
    renderListOfItems(results)
  );

// Сторінка одного фільму
const renderSingleMoviePage =(id) =>
    sendAPIRequest(`movie/${id}`).then(data => {
        console.log(data);
        output.append(createItemTitle(data.title, "h1"));
        output.append(createItemOverview(data, "p"));
        output.append(createItemImg(data, 450, 300));
        renderRecomendation(id);
});

// Пошук по назві фільму
const renderSearchPage = (keyword) => {
    sendAPIRequest("search/movie", `&query=${keyword}`).then(({ results }) =>
        renderListOfItems(results)
    );
    };

//Створити об'єкт опису фільму
const createItemOverview = (item, container) => {
  if (item.overview) {
    let title = document.createElement(container);
    title.innerHTML = item.overview;
    return title;
  } else return "Тут могла бути ваша реклама";
};

// Повертає об'єкт зображення

const createItemImg = (item, height = 450, width = 300) => {
  if (item.poster_path) {
    let img = document.createElement("img");
    img.src = "".concat(IMG_URL, item.poster_path);
    img.height = height;
    img.width = width;
    return img;
  } else return "Зображення відсутнє";
};



// Отримання результатів ГЕТ запису
const get = () => {
  return window.location.search
    .replace("?", "")
    .split("&")
    .reduce(function(p, e) {
      let a = e.split("=");
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});
};

//Топові фільми

const renderRecomendation = (id) => {
    sendAPIRequest(`movie/${id}/recommendations`, "").then(({ results }) =>
        renderListOfItems(results,3)
    );
};



// Головний метод
const check = () => {
  let params = get();

  if (params["id"]) {
    console.log(params["id"]);
    renderSingleMoviePage(params["id"]);
  } else if (params["search"]) {
    console.log("INPUT", params["search"]);
      renderSearchPage(params["search"]);
  } else {
    renderHomePage();
  }
};

check();
