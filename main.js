
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
            div2.id = `imag + ${i}`;
            div2.src = data[i].thumbnail; // Use the thumbnail directly
            div2.width = 200;
            div2.height = 250;
            let div4 = document.createElement("div");
            div4.id = "display";

            let re = document.createElement("p")
            let x = data[i].year;
            let y = parseInt(x)
            const d = data[i].genres
            const c = data[i].genres.length
            const t = Array.isArray(d);
            re.innerHTML = y;
            // for only 1 genres
            if (t == false) {
                m = d;
                let Ge = document.createElement("p")
                Ge.id = "geners";
                Ge.innerHTML = m;

                Ge.style.display = "none";

                div4.appendChild(Ge)
            }
            //More than 1 genres
            else {
                for (let j = 0; j < c; j++) {
                    let m = d[j];
                    let Ge = document.createElement("div")
                    Ge.id = "geners";
                    Ge.innerHTML = m;

                    Ge.style.display = "none";
                    div4.appendChild(Ge)

                }
            }

            re.style.display = "none";
            div4.appendChild(re)
            div4.appendChild(div2)

            div1.appendChild(div4)
// Information of each block
let info = document.createElement("div");
info.id = "inf";
info.style.width = 200;

let title = document.createElement("h4");
title.innerHTML = data[i].title;
let date = document.createElement("p");
date.innerHTML = `Release Date: ${data[i].year}`;

// Check if "runtime" is available
if (data[i].runtime !== undefined) {
  // Calculate time duration of the movie
  let num = data[i].runtime;
  let hours = Math.floor(num / 60);
  let minutes = num % 60;
  let time = document.createElement("p");
  time.innerHTML = `Duration: ${hours} hr ${minutes} min`;
  info.appendChild(time);
}

info.appendChild(title);
info.appendChild(date);


  
  // Hide the "Duration" section if "runtime" is undefined
  let duration = info.querySelector("p:first-of-type");
  if (!duration) {
    info.style.display = "none";
  }
  
  
  div4.appendChild(info);
  
  // Detailed Information of block
  div4.addEventListener('click', onPopUp = (e) => {
      let popup = document.createElement("dialog");
      popup.id = "pop";
      let div3 = document.createElement("div");
      let imga = document.createElement('img');
      let description = document.createElement("p");
      let title = document.createElement("h3");
      let imd = document.createElement("div");
      imga.id = "popupimg";
      imga.src = data[i].thumbnail; // Use the original image URL directly
      imga.height = 150;
      imga.width = 100;
      description.style.color = "white";
      description.innerHTML = `${data[i].overview}`;
      title.style.color = "white";
      title.innerHTML = data[i].title;
      let butto = document.createElement("div");
      butto.id = "button";
      let d = data[i].genres;
      let c = data[i].genres.length;
      let t = Array.isArray(d);

    // Create the video element but hide it initially
    let video = document.createElement("video");
    video.src = data[i].href;
    video.controls = true; // Show the player controls
    video.style.width = "100%"; // Adjust the video width as needed
    video.style.display = "none";
    div3.appendChild(video);

        // Watch Movie button
        let watchButton = document.createElement("button");
        watchButton.textContent = "Watch Movie";
        watchButton.addEventListener("click", () => {
          video.style.display = "block"; // Show the video when the button is clicked
        });
        div3.appendChild(watchButton);

// Cast names in detailed information block
let castDiv = document.createElement("div");
const cast = data[i].cast;

if (Array.isArray(cast) && cast.length > 0 && typeof cast[0] === "string") {
  // For array of strings format (hide this cast)
  castDiv.style.display = "none";
} else if (Array.isArray(cast) && cast.length > 0 && typeof cast[0] === "object") {
  // For array of objects format (show this cast)
  castDiv.innerHTML = "Cast: " + cast.map(member => member.name).join(", ");
} else {
  // If cast is not available
  castDiv.innerHTML = "Cast: N/A";
}

div3.appendChild(castDiv);



                // Ok button at information block
                butto.textContent = "Exit"
                butto.addEventListener("click", onremove = (e) => {
                    popup.remove();
                })
                div3.appendChild(imga);
                popup.appendChild(div3)
                popup.appendChild(title)
                popup.appendChild(description)
                let divition = document.createElement("p");
                
// for CAST and genres at information block
let w = document.createElement("div");
w.id = "w";

// Cast section
let castTitle = document.createElement("h4");
castTitle.innerHTML = "CAST";
w.appendChild(castTitle);

let castArray = data[i].cast;
if (Array.isArray(castArray) && castArray.length > 0 && typeof castArray[0] === "string") {
  // If cast is available as an array of strings, show the cast section
  for (let j = 0; j < castArray.length; j++) {
    let castMember = document.createElement("div");
    castMember.id = "cast";
    castMember.textContent = castArray[j];
    castMember.style.background = "blue";
    w.appendChild(castMember);
  }
} else {
  // If cast is not available or not in the expected format, hide the cast section
  w.style.display = "none";
}

    // Genres section
    let genreTitle = document.createElement("h4");
    genreTitle.innerHTML = "GENRES";
    w.appendChild(genreTitle);

    let genres = data[i].genres;
    if (Array.isArray(genres) && genres.length > 0) {
      for (let j = 0; j < genres.length; j++) {
        let genre = document.createElement("div");
        genre.id = "geners";
        genre.textContent = genres[j];
        genre.style.color = "white";
        genre.style.background = "orange";
        w.appendChild(genre);
      }
    }


    // Download Movie button
    let downloadButton = document.createElement("button");
    downloadButton.textContent = "Download Movie";
    downloadButton.addEventListener("click", () => {
      window.location.href = data[i].href;
    });
    div3.appendChild(downloadButton);

                let type = document.createElement("p")
                let name = document.createElement("h3")
                
                type.appendChild(name)

                popup.appendChild(w)
                if (t == false) {
                    m = d;
                    let Genre = document.createElement("div")
                    Genre.id = "geners"
                    Genre.textContent = m;
                    Genre.style.color = "white";
                    Genre.style.background = "orange";

                    type.appendChild(Genre)
                }

                else {
                    for (let j = 0; j < c; j++) {
                        let m = d[j];
                        let Genre = document.createElement("div")
                        Genre.id = "geners"
                        Genre.textContent = m;
                        Genre.style.color = "white";
                        Genre.style.background = "orange";

                        type.appendChild(Genre)
                    }
                }

                popup.appendChild(type)
                popup.appendChild(imd);
                divition.appendChild(butto)
                popup.appendChild(divition)
                document.getElementsByTagName("body")[0].appendChild(popup);

                popup.showModal();

            })
            // Hover process in block
            div4.addEventListener('mouseover', onHover = (e) => {
                document.getElementById(`imag ${i}`).style.opacity = "0.5";

            })
            div4.addEventListener('mouseout', onhoverof = (e) => {
                document.getElementById('imag ${i}').style.opacity = "1";

            })


        }



        //Pagination
        const fil = document.querySelector("#film").children;

        const prev = document.querySelector(".prev")
        const pages = document.querySelector(".page")
        const next = document.querySelector(".next")
        const maxitem = 21;
        let index = 1;
        const g = true;
        const pagination = Math.ceil(fil.length / maxitem);

        prev.addEventListener("click", function () {
            index--;
            check();
            showitem();
        })
        next.addEventListener("click", function () {
            index++;
            check();
            showitem();
        })
        let check = () => {
            if (index == pagination) {
                next.classList.add("disabled");
            }
            else {
                next.classList.remove("disabled");
            }

            if (index == 1) {
                prev.classList.add("disabled");
            }
            else {
                prev.classList.remove("disabled");
            }
        }

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
        }

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
      }
      
let myGenre = () => {
    let input = "Fantasy";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}


let science = () => {
    let input = "Science Fiction";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}

let historical = () => {
    let input = "History";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}


let horror = () => {
    let input = "Horror";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}



let romance = () => {
    let input = "Romance";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}



let thriller = () => {
    let input = "Thriller";
    let newinput = input;
    const fil = document.querySelector("#film").children;

    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}


let comedy = () => {
    let input = "Comedy";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}


let crime = () => {
    let input = "Crime";
    let newinput = input;
    const fil = document.querySelector("#film").children;

    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}


let family = () => {
    let input = "Family";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}


let animation = () => {
    let input = "Animation";
    let newinput = input;
    const fil = document.querySelector("#film").children;


    for (j = 0; j < fil.length; j++) {
        fil[j].classList.remove("show");
        fil[j].classList.add("hide");

        if (!fil[j].innerHTML.includes(newinput)) {
            fil[j].classList.remove("show");
            fil[j].classList.add("hide");
        }

        else {
            fil[j].classList.remove("hide");
            fil[j].classList.add("show");
        }

    }
}
