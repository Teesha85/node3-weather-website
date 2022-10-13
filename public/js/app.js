//document.querySelector will grab what is in the argument that it runs into in app.js
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//When submit occurs it will run the callback function
weatherForm.addEventListener("submit", (e) => {
  //this prevents the browser from refreshing and causing the server to render a new page.
  e.preventDefault();

  // search.value is the input from the user
  const location = search.value;

  //paragraphs in index.hbs
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //fetch (api) is client side js.
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        //Show error in paragraph 1
        messageOne.textContent = data.error;
      } else {
        // show location in paragraph 1 & forcast info in 2nd paragraph
        messageOne.textContent = data.location;
        messageTwo.textContent = `Current Temp: ${data.forcast.currentTemp}. Feels Like Temp: ${data.forcast.feelslikeTemp}. Weather Description: ${data.forcast.weatherDescription}`;
      }
    });
  });
});

//Goal render content to paragraphs
// select the second message p from Js
// just before fetch, render loading  message first paragraph and 2nd para empty
// if error, 1st para render error, 2nd blank
// if no error render 1st para location and 2nd forcast
