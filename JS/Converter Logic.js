const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let countryDrop = document.querySelectorAll(".dropdown select")

for (let select of countryDrop) {
    for (let currencyCode in countryList) {

        // Creating option tags for dropdown of currency codes

        let newOption = document.createElement("option")
        newOption.value = currencyCode              // <option value="USD"><option>
        newOption.innerText = currencyCode          // content inside option 
        select.append(newOption)

        // Selecting a default value for (from and to) dropdowns

        if (select.name == "from_dropdown" && currencyCode == "USD") {
            newOption.selected = "selected"
        }
        else if (select.name == "to_dropdown" && currencyCode == "INR") {
            newOption.selected = "selected"
        }
    }

    // Updating the country flags 

    select.addEventListener('change', (evt) => {
        updateFlag(evt.target)
    })
    updateFlag = (element) => {
        let currCode = element.value                //to get the key(currency code - USD)
        countryName = countryList[currCode];        //to get the key:value(country name -"IN")
        let flag = element.parentElement.querySelector('img')
        newFlag = `https://flagsapi.com/${countryName}/flat/64.png`;
        flag.src = newFlag
    }
}

let btn = document.querySelector('form button')
btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.getElementById("input_amount")
    let amtVal = amount.value
    if (amtVal < 1 || amtVal === "") {
        amtVal = 1
        amount.value = 1
    }

    let fromCurr = document.getElementById("from_dropdown")
    let toCurr = document.getElementById("to_dropdown")
    let fromValue = fromCurr.value.toLowerCase();
    let toValue = toCurr.value.toLowerCase();

    let URL = `${BaseURL}/${fromValue}.json`   //creates API URL

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromValue][toValue]

    let ExRate = amtVal * rate;                //Calculating Exchange rate for user inputs
    ExRate = ExRate.toFixed(3);                //Returns as a string
    let outputMsg = document.querySelector(".result_msg")
    outputMsg.style.color = "goldenrod"
    outputMsg.innerText = `${amtVal} ${fromCurr.value} = ${ExRate} ${toCurr.value}`

})

// Notes:
// change event is fired for elements when the user modifies values of dropdowns.
// preventDefault() is used to prevent the default behavior of a specific event from occurring.
// parentElement is used to change the selector from its current element to its parent element.

