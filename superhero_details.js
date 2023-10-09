
// intialize publicKey and privateKey variables with values from my developer
// account in marvel
const publicKey = "9db9c315a26fade5bedc352bdd950457";
const privateKey = "8ffa279a1049f61b77233a6d387c8038c06e83b0";
// generate value of hash by passing value of ts in it
function createHash(ts) {
    const res = ts + privateKey + publicKey;
    return CryptoJS.MD5(res).toString();
}
// get details of div with id = showSuperHeroDetails
const details = document.getElementById("showSuperHeroDetails");
// called getSuperHeroDetails function
async function getSuperHeroDetails() {
    //inserted try block to handle exception that may occur during execution of code
    try {
        // Get the URLSearchParams object from the URL
        let params = new URLSearchParams(document.location.search);
        // get id from the url using params.get("id");
        let id = params.get("id");
        //  Generate a timestamp(ts)
        let ts = new Date().getTime().toString();
        // Generate value of hash by calling createHash func and passing ts value in it
        var hash = createHash(ts);
        // saved the value of url and store it in url variable
        let url = `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=100`
        // got response from url and save it in response
        const response = await fetch(url);
        // get the response in json format and use await keyword before it and 
        // save value in data variable.
        const data = await response.json();
        // save the value of data?.data?.results in arr
        const arr = data?.data?.results;
        // traverse over the arr
        arr?.map((item) => {
            // created a variable divElement and assign it div tag which is created
            // via document.createElement
            const divElement = document.createElement("div");
            // created a variable h3TagOne and assign it h3 tag which is created
            // via document.createElement
            let h3TagOne = document.createElement("h3");
            // insert inside h3TagOne the title of Image
            h3TagOne.textContent = "Image";
            // append to divElement the variable h3TagOne
            divElement.appendChild(h3TagOne);
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
            //assigned value of marginTop to img variable of 30 px;
            img.style.marginTop = "10px";
            // assigned value of marginLeft to img variable of 30 px;
            img.style.marginLeft = "30px";
            // assigned value of marginRight to img variable of 30 px;
            img.style.marginRight = "5px";
            // append to divElement image tag
            divElement.appendChild(img);
            // create ul tag from document.createElement("ul") and assign it to ulOne
            let ulOne = document.createElement("ul");
            // created a variable h3TagTwo and assign it value of h3 tag which is created
            // via document.createElement
            let h3TagTwo = document.createElement("h3");
            // insert inside h3TagTwo the title of Name
            h3TagTwo.textContent = "Name";
            // append to divElement h3TagTwo tag
            divElement.appendChild(h3TagTwo);
            // assign to innerText property of ulOne value of item.name;
            ulOne.innerText = item.name;
            // append to divElement via appendChild method the value in ulOne variable
            divElement.appendChild(ulOne);
            // create ul tag from document.createElement("ul") and assign it to ulSecond
            ulSecond = document.createElement("ul");
            // created a variable h3TagThree and assign it value of h3 tag which is created
            // via document.createElement
            let h3TagThree = document.createElement("h3");
            // insert inside h3TagThree the title of Description
            h3TagThree.textContent = "Description";
            // append to divElement via appendChild method the value in h3TagThree variable
            divElement.appendChild(h3TagThree);
            // assign to innerText property of ulSecond value of item.description;
            ulSecond.innerText = item.description;
            // append to divElement via appendChild method the value in ulSecond variable
            divElement.appendChild(ulSecond);
            // create ol tag from document.createElement("ol") and assign it to ulThird
            const ulThird = document.createElement("ol");
            // created a variable h3TagFour and assign it value of h3 tag which is created
            // via document.createElement
            let h3TagFour = document.createElement("h3");
            // insert inside h3TagThree the title of Comics
            h3TagFour.textContent = "Comics";
            // append to divElement via appendChild method the value in h3TagFour variable
            divElement.appendChild(h3TagFour);
            // if item value exists and item.comics is not undefined
            if (item && item?.comics) {
                // assign value of item.comics.items into itemsInComics;
                const itemsInComics = item.comics.items;
                // traverse the array itemsInComics using forEach
                itemsInComics.forEach((item) => {
                    // create li tag from document.createElement("li") and assign it to liElement
                    const liElement = document.createElement("li");
                    // assign value to liElement.innerText value of item.name;
                    liElement.innerText = item.name;
                    // append to ulThird value of liElement
                    ulThird.appendChild(liElement)
                })
            }
            // append to divElement via appendChild method the value in ulThird variable
            divElement.appendChild(ulThird);
            // create ol tag from document.createElement("ol") and assign it to ulFourth
            const ulFourth = document.createElement("ol");
            // created a variable h3TagFive and assign it value of h3 tag which is created
            // via document.createElement
            let h3TagFive = document.createElement("h3");
            // insert inside h3TagFive the title of Events
            h3TagFive.textContent = "Events";
            // append to divElement via appendChild method the value in h3TagFive variable
            divElement.appendChild(h3TagFive);
            // if item value exists and item.events is not undefined
            if (item && item.events) {
                // assign value of item.events.items into itemsInEvents;
                const itemsInEvents = item.events.items;
                // traverse the array itemsInEvents using forEach
                itemsInEvents.forEach((item) => {
                    // create li tag from document.createElement("li") and assign it to liElement variable
                    const liElement = document.createElement("li");
                    // assign value to li.innerText value of item.name;
                    liElement.innerText = item.name;
                    // append to ulFourth value of li
                    ulFourth.appendChild(liElement);
                })
            }
            // append to divElement via appendChild method the value in ulFourth variable
            divElement.appendChild(ulFourth);
            // create ol tag from document.createElement("ol") and assign it to ulFifth
            const ulFifth = document.createElement("ol");
            // created a variable h3TagSixth and assign it value of h3 tag which is created
            // via document.createElement
            let h3TagSixth = document.createElement("h3");
            // insert inside h3TagSixth the title of Series
            h3TagSixth.textContent = "Series";
            // append to divElement via appendChild method the value in h3TagSixth variable
            divElement.appendChild(h3TagSixth);
            // if item value exists and item.series is not undefined
            if (item && item.series) {
                // assign value of item.series.items into itemsInSeries;
                const itemsInSeries = item.series.items;
                // traverse the array itemsInSeries using forEach
                itemsInSeries.forEach((item) => {
                    // create li tag from document.createElement("li") and assign it to 
                    // liElement variable
                    const liElement = document.createElement("li");
                    // assign value to liElement.innerText value of item.name;
                    liElement.innerText = item.name;
                    // append to ulFifth value of liElement
                    ulFifth.appendChild(liElement)
                })
            }
            // append to divElement via appendChild method the value in ulFifth variable
            divElement.appendChild(ulFifth);
            // create ol tag from document.createElement("ol") and assign it to ulSixth
            const ulSixth = document.createElement("ol");
            // created a variable h3TagSeventh and assign it value of h3 tag which is created
            // via document.createElement
            let h3TagSeventh = document.createElement("h3");
            // insert inside h3TagSeventh the title of Stories
            h3TagSeventh.textContent = "Stories";
            // append to divElement via appendChild method the value in h3TagSeventh variable
            divElement.appendChild(h3TagSeventh);
            // if item value exists and item.stories is not undefined
            if (item && item.stories) {
                // assign value of item.stories.items into itemsInSeries;
                const itemsInStories = item.stories.items;
                // traverse the array itemsInStories using forEach
                itemsInStories.forEach((item) => {
                    // create li tag from document.createElement("li") and assign it to
                    // liElement variable
                    const liElement = document.createElement("li");
                    // assign value to liElement.innerText value of item.name;
                    liElement.innerText = item.name;
                    // append to ulSixth value of liElement
                    ulSixth.appendChild(liElement);
                })
            }
            // append to divElement via appendChild method the value in ulSixth variable
            divElement.appendChild(ulSixth);
            // append to details via appendChild method the value in divElement variable
            details.appendChild(divElement);
        });
    }
    // if there is error after getting response back from api then use .catch function for that
    // and show which error it is by doing console.log("error", error);
    catch {
        console.log("error", error);
    }
}
// call the func getSuperHeroDetails();
getSuperHeroDetails();


