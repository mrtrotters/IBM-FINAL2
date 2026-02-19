const JSTest = document.getElementById("jsTest");
const searchHolidayBTN = document.getElementById("searchHoliday");
const clearButton = document.getElementById("clearSearchBox");

function clgJsonData() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  //   alert("YOU CLICKED?");
  fetch("./travel_recommendation_api.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        console.log("object");
      } else {
        resultDiv.innerHTML = "condition not found";
      }
    })
    .catch((err) => console.error(err));
}

function searchHoliday() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const searchResDiv = document.getElementById("searchResult");
  searchResDiv.innerHTML = "";

  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const searchCountries = data.countries.find(
        (item) => item.name.toLowerCase() === input,
      );

      const searchTemples = data.temples.find(
        (item) => item.name.toLowerCase() === input,
      );

      const searchBeaches = data.beaches.find(
        (item) => item.name.toLowerCase() === input,
      );

      if (data) {
        if (input == "country" || input == "countries") {
          for (const country of data.countries) {
            console.log(country.name);
            searchResDiv.innerHTML += `<h2>${country ? country.name : "search not found"}</h2>`;
            for (let [key, value] of Object.entries(country.cities)) {
              const img = `${key ? value.imageUrl : " image not found"}`;

              searchResDiv.innerHTML += `<h2>${key ? value.name : "Search not found"}</h2>`;
              searchResDiv.innerHTML += `<img src=${key ? value.imageUrl : "image not found"} />`;
              searchResDiv.innerHTML += `<h2>${key ? value.description : "Search not found"}</h2>`;
            }
          }
        } else {
          if (input == "temple" || input == "temples") {
            for (const temple of data.temples) {
              console.log(temple.name);
              searchResDiv.innerHTML += `<h2>${temple ? temple.name : "search not found"}</h2>`;
              searchResDiv.innerHTML += `<h2>${temple ? temple.description : "search not found"}</h2>`;
              searchResDiv.innerHTML += `<img src=${temple ? temple.imageUrl : "image not found"} />`;
            }
          } else {
            if (input == "beach" || input == "beaches") {
              for (const beach of data.beaches) {
                console.log(beach.name);
                searchResDiv.innerHTML += `<h2>${beach ? beach.name : "search not found"}</h2>`;
                searchResDiv.innerHTML += `<h2>${beach ? beach.description : "search not found"}</h2>`;
                searchResDiv.innerHTML += `<img src=${beach ? beach.imageUrl : "image not found"} />`;
              }
            }
          }
        }
        if (searchCountries) {
          const countriesString = JSON.stringify(searchCountries);
          if (countriesString) {
            searchResDiv.innerHTML += `<h2>${searchCountries ? searchCountries.name : "search not found"}</h2>`;

            for (let [key, value] of Object.entries(searchCountries.cities)) {
              const img = `${key ? value.imageUrl : " image not found"}`;

              searchResDiv.innerHTML += `<h2>${key ? value.name : "Search not found"}</h2>`;
              searchResDiv.innerHTML += `<img src=${key ? value.imageUrl : "image not found"} />`;
              searchResDiv.innerHTML += `<h2>${key ? value.description : "Search not found"}</h2>`;
            }
          } else {
            searchResDiv.innerHTML += `<h2>${searchCountries ? " " : "search not found"}</h2>`;
            console.log("no object found");
          }
        } else if (searchTemples) {
          const templeString = JSON.stringify(searchTemples);
          if (templeString) {
            searchResDiv.innerHTML += `<h2>${searchTemples ? searchTemples.name : "search not found"}</h2>`;
            searchResDiv.innerHTML += `<h2>${searchTemples ? searchTemples.description : "search not found"}</h2>`;
            searchResDiv.innerHTML += `<img src=${searchTemples ? searchTemples.imageUrl : "image not found"} />`;
          } else {
            console.log("temple not found");
          }
        } else if (searchBeaches) {
          const beachString = JSON.stringify(searchBeaches);
          if (beachString) {
            searchResDiv.innerHTML += `<h2>${searchBeaches ? searchBeaches.name : "search not found"}</h2>`;
            searchResDiv.innerHTML += `<h2>${searchBeaches ? searchBeaches.description : "search not found"}</h2>`;
            searchResDiv.innerHTML += `<img src=${searchBeaches ? searchBeaches.imageUrl : "image not found"} />`;
          } else {
            console.log("beach not found");
          }
        } else {
          searchResDiv.innerHTML += `<h2>${searchCountries ? " " : ""}</h2>`;
        }
      }
    })
    .catch((error) => {
      console.log("error:", error);
      searchResDiv.innerHTML = "Country not found";
    });
}
function clearSearchInput(event) {    
    document.getElementById("searchInput").value = "";  
};

clearButton.addEventListener("click", clearSearchInput);
searchHolidayBTN.addEventListener("click", searchHoliday);
JSTest.addEventListener("click", clgJsonData);
