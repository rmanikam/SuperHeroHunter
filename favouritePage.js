// created a ordered list variable and get value from id showFavouriteSuperHeros
const ol = document.getElementById("showFavouriteSuperHeros");
// call a function called showFavourites
showFavourites();
function showFavourites() {
    // get superhero value stored in local storage
    let superHero = localStorage.getItem("favorites");
    // initialize a variable called SuperheroParsed with empty object
    let superHeroParsed = {};
    // checked if superhero exists in local storage then save it in SuperheroParsed
    // variable using JSON.parse. if not then print message
    // No superhero data in localStorage.
    if (superHero) {
        superHeroParsed = JSON.parse(superHero);
    } else {
        console.log("Superhero data is not in localStorage.");
    }
    // traverse the superHeroParsed array using map method
    superHeroParsed.map((item, index) => {
        // created a variable liElement and assign it li tag which is created
        // via document.createElement
        const liElement = document.createElement("li");
        // create a img variable and assign it img tag which is created
        // via document.createElement
        let img = document.createElement("img");
        // in src property of image add image to it
        img.src = item?.thumbnail?.path + "." + item?.thumbnail?.extension;
        // in alt property assigned value item.name;
        img.alt = item.name;
        // assigned value of height to img variable of 200 px;
        img.height = "200";
        // assigned value of width to img variable of 200 px;
        img.width = "200";
        // assigned value of marginLeft to img variable of 30 px;
        img.style.marginLeft = "30px";
        // assigned value of marginRight to img variable of 30 px;
        img.style.marginRight = "5px";
        // append to liElement image tag
        liElement.appendChild(img);
        // create h2 tag from document.createElement("h2"); and assign it to h2
        const h2 = document.createElement("h2");
        // assign to innerText property of h2 value of item.name;
        h2.innerText = item.name;
        // append to liElement via appendChild method the value in h2 variable
        liElement.appendChild(h2);
        // create button tag from document.createElement("button"); and assign it to button variable
        let button = document.createElement("button");
        // assign to innerHTML property of button value of <i class="fa-solid fa-trash"></i>;
        button.innerHTML = '<i class="fa-solid fa-trash"></i>';
        // here we are doing button.addEventListener. On click of click event to button
        // we call removeSuperHero function
        button.addEventListener("click", function () {
            // create a output_arr array and assign it value of superHeroParsed
            let output_arr = superHeroParsed;
            // remove the element at particular index and delete 1 element using splice method
            output_arr.splice(index, 1);
            // set output_arr value to local storage
            localStorage.setItem("favorites", JSON.stringify(output_arr));
            // clear everything shown in innerHTML using ol.innerHTML;
            ol.innerHTML="";
            // call showFavourites button again
            showFavourites();
        });

        // append to liElement via appendChild method the value in button variable
        liElement.appendChild(button);
        // append to ol via appendChild method the value in liElement variable
        ol.appendChild(liElement);
    });

}





