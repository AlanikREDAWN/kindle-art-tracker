// let selected = document.querySelector(".group .selected");
// let selectList = document.querySelector(".group .select-list");

// selected.addEventListener("click", function () {
//     // console.log(this);
//     this.classList.toggle("active");
// })

let htmlStyles = window.getComputedStyle(document.querySelector("html"));
let rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));
let numRows = 0

document.addEventListener("DOMContentLoaded", function() {
    loadCards()
});

async function loadCards() {
    const url = "http://localhost:8787/get-data";
    try {
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        let wrapper = document.querySelector('.wrapper');

        result.data.results.forEach(result => {
            console.log(result)
            wrapper.innerHTML += `
                <div class="card">
                <h2>${result.artwork_name}</h2>
                <h3>who is it for?</h3>
                <h4>${result.who_is_it_for}</h4>
                <h3>Status: ${result.status}</h3>
                <h3>Deadline: ${result.deadline}</h3>
            </div>`
            numRows += 1
            document.documentElement.style.setProperty("--rowNum", numRows)
        })

        // console.log(results.data.results)
    } catch (error) {
        console.error(error.message);
    }


}