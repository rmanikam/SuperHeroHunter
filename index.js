// intialize publicKey and privateKey variables with values from my developer account in marvel
const publicKey = "9db9c315a26fade5bedc352bdd950457";
const privateKey = "8ffa279a1049f61b77233a6d387c8038c06e83b0";
// generate value of hash by passing value of ts in it
function createHash(ts) {
    const res = ts + privateKey + publicKey;
    return CryptoJS.MD5(res).toString();
}
// call fetchHunterHeros function and used async before the function
async function fetchHunterHeros(search) {

    //  Generate a timestamp(ts)
    var ts = new Date().getTime().toString();
    // Generate value of hash by calling createHash func and passing ts value in it
    const hash = createHash(ts);

    // saved the value of url in url
    let url = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=100`;
    // if search is true then append to url the search variable which is assigned to 
    // nameStartsWith variable
    if (search) {
        url = `${url}&nameStartsWith=${search}`
    }

    //insert try block before calling fetch func with url in it
    try {
        // call fetch function and pass url in it and used await before fetch func
        // fetch returns a promise.
        const response = await fetch(url);
        // and get the response in json format and use await keyword before it and save 
        // value in data variable.
        const data = await response.json();
        // get value stored in id showResult inside div element in html and save it in result
        let result = document.getElementById("showResult");
        // clear the data stored in result via result.innerHTML such as images, html data etc
        result.innerHTML = "";
        // get the response back in array format and save it in output variable
        let output = data.data.results;
        // traverse over the output variable which contains value of array in using map method
        // of array
        output.map((item) => {
            // created a new div element called divElement using document.createElement
            const divElement = document.createElement("div");
            // created a new variable called buttonTag and assigned it value
            // using document.createElement("button") having button tag in it
            let buttonTag = document.createElement("button");
            // inserted inside buttonTag.innerHTML a favourite icon from font -awesome
            buttonTag.innerHTML = '<i class="fa-regular fa-heart"></i>';
            // added a addEventListener to button tag and on click of the buttonTag a
            // anonymous callback function is called
            buttonTag.addEventListener("click", function () {
                // Get the current list of favorite superheroes from local storage
                let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                // Add the current superhero to the list of favorites
                favorites.push(item);
                // Save the updated list of favorites to local storage
                localStorage.setItem("favorites", JSON.stringify(favorites));
            });
            // created a div variable called newDiv using document.createElement and
            // stored value of divElement in it
            const newDiv = document.createElement("div");
            // added a class called image_text_button contained inside div element
            // to newDiv using newDiv.classList.add
            newDiv.classList.add("image_text_button");

            // created a img variable called img using document.createElement for img tag
            const img = document.createElement("img");
            // in src attribute of img variable assigned value item?.thumbnail?.path + "." + item?.thumbnail?.extension;
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
            // on click of img variable of superhero it should take me to Superhero Details Page
            img.onclick = () => window.location.replace(`superhero_details.html?id=${item.id}`);
            // created a variable called a using document.createElement for anchor tag
            const a = document.createElement("a");
            // created a href property for anchor tag and set it a value "superhero_details.html?id=" + item.id
            a.href = "superhero_details.html?id=" + item.id;
            // appended to img variable(parent) the a variable(child) using appendChild
            img.appendChild(a);
            // appended to newDiv(parent variable) the child variable img
            newDiv.appendChild(img);
            // created a h2 variable using document.createElement('h2');
            const h2 = document.createElement("h2");
            // assigned to innerText property of h2 variable a value of item.name;
            h2.innerText = item.name;
            // added a class of name to h2 variable
            h2.classList.add("name");
            // appended to newDiv variable(parent), h2 variable(child) using appendChild property
            newDiv.appendChild(h2);
            // appended to newDiv variable(parent), buttonTag variable(child) using appendChild property
            newDiv.appendChild(buttonTag);
            // appended to divElement variable(parent), newDiv variable(child) using appendChild property
            divElement.appendChild(newDiv);
            // append the value of divElement to result variable
            result.appendChild(divElement);
        });
        // if there is error after getting response back from api then use .catch function 
        // for that and show which error it is by doing console.log("error", error);
    } catch (error) {
        console.log("error", error);
    }
}
//  get the id of input tag called searchResult via document.getElementById and get its value 
// and store it in inputValue
let inputValue = document.getElementById("searchResult");
// Call the function filterSuperHero to filter the values based on element entered 
// in the input field
async function filterSuperHero() {
    // get value of inputValue in lower case and save it in searchResult element
    let searchResult = inputValue.value

    fetchHunterHeros(searchResult);


}
// call the func fetchHunterHeros();
fetchHunterHeros();
// call inputValue.AddEventListener when an input is typed in input field
// then call filterSuperHero function
inputValue.addEventListener("input", filterSuperHero);
// Initial fetch when the page loads

