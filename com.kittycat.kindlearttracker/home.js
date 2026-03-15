

var htmlStyles = window.getComputedStyle(document.querySelector("html"));
var rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));
var numRows = 0;

document.addEventListener("DOMContentLoaded", function () {
	loadCards();
});

function loadCards() {
	var url = "https://notion-kindle-api-wrapper.lilia.rocks/get-data";
	fetch(url, { method: "GET" })
		.then(function (response) {
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			return response.json();
		})
		.then(function (result) {
            var debug = document.createElement("div");
            debug.style.border = "2px solid black";
            debug.style.padding = "10px";
            debug.innerHTML = "API result: " + JSON.stringify(result);
            document.body.prepend(debug);

			console.log(result);

			var wrapper = document.querySelector(".wrapper");

			result.data.results.forEach((result) => {
				console.log(result);

				var card = document.createElement("div");
				card.classList.add("card");

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

				wrapper.addEventListener("click", handleCardClick);

				numRows += 1;
				document.documentElement.style.setProperty("--rowNum", numRows);
			});
		})
		.catch(function (error) {
			console.error(error.message);
		});
}

function handleCardClick(event) {
	var clickedCard = event.target.closest(".card");
	if (clickedCard) {
		var artwork_name = clickedCard.dataset.artwork_name;
		var who_is_it_for = clickedCard.dataset.who_is_it_for;
		var status = clickedCard.dataset.status;
		var deadline = clickedCard.dataset.deadline;

		// localStorage.setItem(
		// 	"selectedCard",
		// 	JSON.stringify({
		// 		artwork_name: artwork_name,
		// 		who_is_it_for: who_is_it_for,
		// 		status: status,
		// 		deadline: deadline,
		// 	}),
		// );

		setCookie(
			"selectedCard",
			JSON.stringify({
				artwork_name: artwork_name,
				who_is_it_for: who_is_it_for,
				status: status,
				deadline: deadline,
			}),
		);

		window.location.href = "edit.html";
	}
}
