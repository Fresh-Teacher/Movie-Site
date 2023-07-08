// Fetching JSON file
fetch('movies.json')
    .then((response) => {
        return response.json();

    })
    .then((data) => {
       // List a Movies
        let div1 = document.getElementById("film")
        for (let i = 0; i < data.length; i++) {
         
            let div2 = document.createElement("img");
            div2.id = `imag + ${i}`;
            div2.src = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data[i].poster_path}`;
            div2.width = 200;
            div2.height = 250;
            let div4 = document.createElement("div");
            div4.id = "display"; 
          
            let re = document.createElement("p")
            let x = data[i].release_date;
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
           
            let title = document.createElement("h4")
            title.innerHTML = data[i].title;
            let date = document.createElement("p")
            date.innerHTML = `release date:${data[i].release_date}`;
            
            //Calculate time duration of movie
            let num = data[i].runtime;
            let hours = (num / 60);
            let rhours = Math.floor(hours);
            let minutes = (hours - rhours) * 60;
            let rminutes = Math.round(minutes);
            let time = document.createElement("p")
            time.innerHTML = `Duration- ${rhours} hr ${rminutes} min`;

            info.appendChild(title);
            info.appendChild(date)
            info.appendChild(time)

            
            div4.appendChild(info);
           // Detailed Information of block
            div4.addEventListener('click', onPopUp = (e) => {
                let popup = document.createElement("dialog");
                popup.id = "pop";
                let div3 = document.createElement("div");
                let imga = document.createElement('img');
                let description = document.createElement("p");
                let title = document.createElement("h3")
                let imd = document.createElement("div")
                imd.id = "imd";
                imd.textContent =  `${data[i].vote_average} / 10`;
                imga.id = "popupimg";
                imga.src = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data[i].poster_path}`;
                imga.height = 150;
                imga.width = 100;
                description.style.color = "white";
                description.innerHTML = `overview:- ${data[i].overview}`;
                title.style.color = "white"
                title.innerHTML = data[i].title;
                let butto = document.createElement("div")
                butto.id = "button"
                let d = data[i].genres
                let c = data[i].genres.length
                let t = Array.isArray(d);
                

               // Ok button at information block
                butto.textContent = "ok"
                butto.addEventListener("click", onremove = (e) => {
                    popup.remove();
                })
                div3.appendChild(imga);
                popup.appendChild(div3)
                popup.appendChild(title)
                popup.appendChild(description)
                let divition = document.createElement("p");
               // for cast and geners at information block
                let w = document.createElement("div");
                w.id = "w"
                let o = document.createElement("h4");
                o.innerHTML = "cast";
                w.appendChild(o)
                let k = data[i].cast
                let m = k.length
                for (let i = 0; i < m; i++) {
                   
                    let wiriter = document.createElement("div")
                    let p = k[i].name
                    wiriter.textContent = p
                   
                    wiriter.id = "cast"
                    wiriter.style.background = "blue";
                    w.appendChild(wiriter);

                }
                let type = document.createElement("p")
                let name = document.createElement("h3")
                name.innerHTML = "Gener"
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
        const maxitem = 50;
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
            pages.innerHTML =index + "/" + pagination;
        }

        showitem();
        check();
    })
    .catch((err) => {
        console.log(`error: ${err}`);
    });


// Filters
 let myFunction = () => {
    let input = document.getElementById('year').value
    let newinput = parseInt(input);
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
 let myGenre = ()  => {
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


 let horror  = () => {
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

