// Fetching JSON file
fetch('movies.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {

// List Movies
let div1 = document.getElementById("film");
for (let i = 0; i < data.length; i++) {
  let div2 = document.createElement("img");
  div2.id = `imag${i}`;
  div2.src = data[i].thumbnail;
  div2.width = 200;
  div2.height = 250;
  let div4 = document.createElement("div");
  div4.classList.add("display", "col-md-4");

  let re = document.createElement("p");
  let d = data[i].genres;
  re.innerHTML = d.join(", "); // Display genres instead of release date

  div4.appendChild(re);
  div4.appendChild(div2);
  div1.appendChild(div4);

 // Information of each block
let info = document.createElement("div");
info.classList.add("inf");
info.style.width = "200px";

let title = document.createElement("h4");
title.classList.add("movie-title");
title.innerHTML = data[i].title;

info.appendChild(title);

div4.appendChild(info);


  // Detailed Information of block
  div4.addEventListener("click", () => {
    let popup = document.createElement("dialog");
    popup.id = "pop";
    let div3 = document.createElement("div");
    let imga = document.createElement("img");
    let description = document.createElement("p");
    let title = document.createElement("h3");
    let imd = document.createElement("div");
    imga.id = "popupimg";
    imga.src = data[i].thumbnail;
    imga.height = 150;
    imga.width = 100;
    description.style.color = "white";
    description.innerHTML = `${data[i].extract}`;
    title.style.color = "white";
    title.innerHTML = data[i].title;
  
    let titleDiv = document.createElement("div");
    titleDiv.appendChild(title);
  
    let cast = document.createElement("p");
    cast.classList.add("movie-cast");
    cast.innerHTML = `Cast: ${data[i].cast.join(", ")}`;
  
    let genreDiv = document.createElement("div");
    let genres = document.createElement("p");
    genres.classList.add("movie-genre");
    genres.innerHTML = `Genres: ${data[i].genres.join(", ")}`;
    genreDiv.appendChild(genres);
  
    let overviewDiv = document.createElement("div");
    overviewDiv.appendChild(description);
  
    div3.appendChild(titleDiv);
    div3.appendChild(overviewDiv);
    div3.appendChild(genreDiv);
    div3.appendChild(cast);
  
    let buttonsContainer = document.createElement("div");
    buttonsContainer.style.marginTop = "10px"; // Add top margin for spacing
  
    let video = document.createElement("video");
    video.src = data[i].href;
    video.controls = true;
    video.style.width = "100%";
    video.style.display = "none";
    div3.appendChild(video);
  
    if (!data[i].href || !data[i].href.endsWith(".mp4")) {
      let untranslatedText = document.createElement("p");
      untranslatedText.textContent =
        "The translated version of this movie is not yet available but it will be available soon. At the moment, you may watch the untranslated movie.";
      untranslatedText.style.fontFamily = "Arial, sans-serif";
      untranslatedText.style.fontSize = "18px";
      untranslatedText.style.fontWeight = "bold";
      untranslatedText.style.fontStyle = "italic";
      untranslatedText.style.marginBottom = "10px";
      untranslatedText.style.color = "red";
      div3.appendChild(untranslatedText);
  
      let watchUntranslatedButton = document.createElement("button");
      watchUntranslatedButton.textContent = "Watch Untranslated Movie";
      watchUntranslatedButton.classList.add("btn", "btn-secondary");
      watchUntranslatedButton.addEventListener("click", () => {
        window.location.href = "https://www.soaps.vercel.app";
      });
      buttonsContainer.appendChild(watchUntranslatedButton);
    } else {
      let watchButton = document.createElement("button");
      watchButton.textContent = "Watch Movie";
      watchButton.classList.add("btn", "btn-success");
      watchButton.style.marginRight = "10px"; // Add right margin for spacing
      watchButton.addEventListener("click", () => {
        video.style.display = "block";
      });
      buttonsContainer.appendChild(watchButton);
  
      let downloadButton = document.createElement("button");
      downloadButton.textContent = "Download Movie";
      downloadButton.classList.add("btn", "btn-primary");
      downloadButton.addEventListener("click", () => {
        window.location.href = data[i].href;
      });
      buttonsContainer.appendChild(downloadButton);
    }
  
    div3.appendChild(buttonsContainer);
  
    let closeButton = document.createElement("button");
    closeButton.classList.add("btn", "btn-danger");
    closeButton.textContent = "Close";
    closeButton.style.marginTop = "10px";
    closeButton.addEventListener("click", () => {
      popup.close();
    });
  
    div3.appendChild(closeButton);
  
    popup.appendChild(imga);
    popup.appendChild(div3);
  
    document.getElementsByTagName("body")[0].appendChild(popup);
  
    popup.showModal();
  });
  
  
  
      div4.addEventListener('mouseover', () => {
        div2.style.opacity = "0.5";
      });

      div4.addEventListener('mouseout', () => {
        div2.style.opacity = "1";
      });
    }

    // Pagination
    const fil = document.querySelector("#film").children;

    const prev = document.querySelector(".prev");
    const pages = document.querySelector(".page");
    const next = document.querySelector(".next");
    const maxitem = 21;
    let index = 1;
    const pagination = Math.ceil(fil.length / maxitem);

    prev.addEventListener("click", function () {
      index--;
      check();
      showitem();
    });

    next.addEventListener("click", function () {
      index++;
      check();
      showitem();
    });

    let check = () => {
      if (index == pagination) {
        next.classList.add("disabled");
      } else {
        next.classList.remove("disabled");
      }

      if (index == 1) {
        prev.classList.add("disabled");
      } else {
        prev.classList.remove("disabled");
      }
    };

    let showitem = () => {
      for (let p = 0; p < fil.length; p++) {
        fil[p].classList.remove("show");
        fil[p].classList.add("hide");

        if (p >= (index * maxitem) - maxitem && p < index * maxitem) {
          fil[p].classList.remove("hide");
          fil[p].classList.add("show");
        }
      }

      pages.innerHTML = index + "/" + pagination;
    };

    showitem();
    check();
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });

let myFunction = () => {
  const yearInput = document.getElementById('year').value.toLowerCase();
  const castInput = document.getElementById('cast').value.toLowerCase();
  const titleInput = document.getElementById('title').value.toLowerCase();
  const genreInput = document.getElementById('genre').value.toLowerCase();

  const fil = document.querySelector("#film").children;

  for (let j = 0; j < fil.length; j++) {
    fil[j].classList.remove("show");
    fil[j].classList.add("hide");

    const movieYear = parseInt(fil[j].querySelector(".movie-year").textContent);
    const movieCast = fil[j].querySelector(".movie-cast").textContent.toLowerCase();
    const movieTitle = fil[j].querySelector(".movie-title").textContent.toLowerCase();
    const movieGenres = fil[j].querySelectorAll(".movie-genre");
    const movieGenreArray = Array.from(movieGenres).map(genre => genre.textContent.toLowerCase());

    if (
      (isNaN(yearInput) || movieYear === parseInt(yearInput)) &&
      (castInput === "" || movieCast.includes(castInput)) &&
      (titleInput === "" || movieTitle.includes(titleInput)) &&
      (genreInput === "" || movieGenreArray.includes(genreInput))
    ) {
      fil[j].classList.remove("hide");
      fil[j].classList.add("show");
    }
  }
};

let myGenre = (genre) => {
  const fil = document.querySelector("#film").children;

  for (let j = 0; j < fil.length; j++) {
    fil[j].classList.remove("show");
    fil[j].classList.add("hide");

    if (fil[j].querySelectorAll(".movie-genre").length > 0) {
      const movieGenres = Array.from(fil[j].querySelectorAll(".movie-genre")).map(genreElem => genreElem.textContent.toLowerCase());
      if (movieGenres.includes(genre.toLowerCase())) {
        fil[j].classList.remove("hide");
        fil[j].classList.add("show");
      }
    }
  }
};
