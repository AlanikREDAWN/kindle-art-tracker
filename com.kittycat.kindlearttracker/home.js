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
    const url = "https://notion-kindle-api-wrapper.lilia.rocks/get-data";
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
            
            const card = document.createElement('div');
            card.classList.add('card');

            card.dataset.artwork_name = result.artwork_name;
            card.dataset.who_is_it_for = result.who_is_it_for;
            card.dataset.status = result.status;
            card.dataset.deadline = result.deadline;

            card.innerHTML += `
                <h2>${result.artwork_name}</h2>
                <h3>who is it for?</h3>
                <h4>${result.who_is_it_for}</h4>
                <h3>Status: ${result.status}</h3>
                <h3>Deadline: ${result.deadline}</h3>
            `;
            wrapper.appendChild(card);

            wrapper.addEventListener('click', handleCardClick);

            numRows += 1
            document.documentElement.style.setProperty("--rowNum", numRows)

            // wrapper.innerHTML += `
            //     <div class="card">
            //     <h2>${result.artwork_name}</h2>
            //     <h3>who is it for?</h3>
            //     <h4>${result.who_is_it_for}</h4>
            //     <h3>Status: ${result.status}</h3>
            //     <h3>Deadline: ${result.deadline}</h3>
            // </div>`

        })

        // console.log(results.data.results)
    } catch (error) {
        console.error(error.message);
    }


}

// card.dataset.artwork_name = result.artwork_name;
// card.dataset.who_is_it_for = result.who_is_it_for;
// card.dataset.status = result.status;
// card.dataset.deadline = result.deadline;

function handleCardClick(event) {
    const clickedCard = event.target.closest('.card');
    if (clickedCard) {
        const artwork_name = clickedCard.dataset.artwork_name;
        const who_is_it_for = clickedCard.dataset.who_is_it_for;
        const status = clickedCard.dataset.status;
        const deadline = clickedCard.dataset.deadline;

        localStorage.setItem('selectedCard', JSON.stringify({
            artwork_name: artwork_name,
            who_is_it_for: who_is_it_for,
            status: status,
            deadline: deadline
        }));
        
        window.location.href = 'edit.html';
    }
}