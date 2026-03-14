async function displayDetails() {
	var editWrapper = document.querySelector(".editWrapper");

    // var selectedCard = await getItemAsync('selectedCard');

	// const selectedCardString = localStorage.getItem("selectedCard");
    const selectedCardString = getCookie("selectedCard");
	// if (selectedCard) {
	if (selectedCardString) {
		const selectedCard = JSON.parse(selectedCardString);
		editWrapper.innerHTML = `
        <h1>${selectedCard.artwork_name}</h1>
        <h2>who is it for? ${selectedCard.who_is_it_for}</h2>
        <h2>Status: ${selectedCard.status}</h2>
        <h2>Deadline: ${selectedCard.deadline}</h2>
        <button class="back">go back</button>

        <button class="edit">edit</button>
        `;
		var back = document.querySelector(".back");
		back.addEventListener("click", handleBack);

		var edit = document.querySelector(".edit");
		edit.addEventListener("click", editInfo);
	} else {
		editWrapper.innerHTML = `
        <h1>Data must be lost...</h1>
        `;
	}
}

async function editInfo() {
	var edit = document.querySelector(".edit");
	edit.disabled = true;
	var editWrapper = document.querySelector(".editWrapper");
	var password = localStorage.getItem("password");
	var selectedCardString = localStorage.getItem("selectedCard");
	var selectedCard = JSON.parse(selectedCardString);

	var url = "https://notion-kindle-api-wrapper.lilia.rocks/verify-password";
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: password,
			}),
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		var result = await response.json();
		console.log(result);

		if (result.success == true) {
			if (document.contains(document.querySelector(".message"))) {
				document.querySelector(".message").remove();
			}

			var form = document.createElement("form");
			form.classList.add("editForm");

			var artworkName = document.createElement("div");
			artworkName.classList.add("group");

			var artworkNameLabel = document.createElement("label");
			artworkNameLabel.textContent = "Artwork Name: ";
			artworkNameLabel.htmlFor = "artwork_name";
			var artworkNameInput = document.createElement("input");
			artworkNameInput.type = "text";
			artworkNameInput.name = "artwork_name";
			artworkNameInput.id = "artwork_name";
			artworkNameInput.required = true;
			artworkNameInput.value = selectedCard.artwork_name;

			artworkName.appendChild(artworkNameLabel);
			artworkName.appendChild(artworkNameInput);

			var whoIsItFor = document.createElement("div");
			whoIsItFor.classList.add("group");

			var whoIsItForLabel = document.createElement("label");
			whoIsItForLabel.textContent = "Who is it for? ";
			whoIsItForLabel.htmlFor = "who_is_it_for";
			var whoIsItForInput = document.createElement("input");
			whoIsItForInput.type = "text";
			whoIsItForInput.name = "who_is_it_for";
			whoIsItForInput.id = "who_is_it_for";
			whoIsItForInput.required = true;
			whoIsItForInput.value = selectedCard.who_is_it_for;

			whoIsItFor.appendChild(whoIsItForLabel);
			whoIsItFor.appendChild(whoIsItForInput);

			var completed = document.createElement("div");
			completed.classList.add("radio");

			var completedInput = document.createElement("input");
			completedInput.type = "radio";
			completedInput.name = "status";
			completedInput.id = "completed";
			completedInput.value = "Completed";
			// completedInput.checked = true;
			var completedLabel = document.createElement("label");
			completedLabel.textContent = "Completed";
			completedLabel.htmlFor = "completed";

			completed.appendChild(completedInput);
			completed.appendChild(completedLabel);

			var inProgress = document.createElement("div");
			inProgress.classList.add("radio");

			var inProgressInput = document.createElement("input");
			inProgressInput.type = "radio";
			inProgressInput.name = "status";
			inProgressInput.id = "inProgress";
			inProgressInput.value = "In-Progress";
			var inProgressLabel = document.createElement("label");
			inProgressLabel.textContent = "In-Progress";
			inProgressLabel.htmlFor = "inProgress";

			inProgress.appendChild(inProgressInput);
			inProgress.appendChild(inProgressLabel);

			var inQueue = document.createElement("div");
			inQueue.classList.add("radio");

			var inQueueInput = document.createElement("input");
			inQueueInput.type = "radio";
			inQueueInput.name = "status";
			inQueueInput.id = "inQueue";
			inQueueInput.value = "In-Queue";
			var inQueueLabel = document.createElement("label");
			inQueueLabel.textContent = "In-Queue";
			inQueueLabel.htmlFor = "inQueue";

			inQueue.appendChild(inQueueInput);
			inQueue.appendChild(inQueueLabel);

			var notStarted = document.createElement("div");
			notStarted.classList.add("radio");

			var notStartedInput = document.createElement("input");
			notStartedInput.type = "radio";
			notStartedInput.name = "status";
			notStartedInput.id = "notStarted";
			notStartedInput.value = "Not-Started";
			var notStartedLabel = document.createElement("label");
			notStartedLabel.textContent = "Not-Started";
			notStartedLabel.htmlFor = "notStarted";

			notStarted.appendChild(notStartedInput);
			notStarted.appendChild(notStartedLabel);

			var waitlist = document.createElement("div");
			waitlist.classList.add("radio");

			var waitlistInput = document.createElement("input");
			waitlistInput.type = "radio";
			waitlistInput.name = "status";
			waitlistInput.id = "waitlist";
			waitlistInput.value = "Waitlist";
			var waitlistLabel = document.createElement("label");
			waitlistLabel.textContent = "Waitlist";
			waitlistLabel.htmlFor = "waitlist";

			waitlist.appendChild(waitlistInput);
			waitlist.appendChild(waitlistLabel);

			if (selectedCard.status == "Completed") {
				completedInput.checked = true;
				inProgressInput.checked = false;
				inQueueInput.checked = false;
				notStartedInput.checked = false;
				waitlistInput.checked = false;
			} else if (selectedCard.status == "In-Progress") {
				completedInput.checked = false;
				inProgressInput.checked = true;
				inQueueInput.checked = false;
				notStartedInput.checked = false;
				waitlistInput.checked = false;
			} else if (selectedCard.status == "In-Queue") {
				completedInput.checked = false;
				inProgressInput.checked = false;
				inQueueInput.checked = true;
				notStartedInput.checked = false;
				waitlistInput.checked = false;
			} else if (selectedCard.status == "Not-Started") {
				completedInput.checked = false;
				inProgressInput.checked = false;
				inQueueInput.checked = false;
				notStartedInput.checked = true;
				waitlistInput.checked = false;
			} else if (selectedCard.status == "Waitlist") {
				completedInput.checked = false;
				inProgressInput.checked = false;
				inQueueInput.checked = false;
				notStartedInput.checked = false;
				waitlistInput.checked = true;
			}

			var deadline = document.createElement("div");
			deadline.classList.add("group");

			var deadlineLabel = document.createElement("label");
			deadlineLabel.textContent = "Deadline: ";
			deadlineLabel.htmlFor = "deadline";
			var deadlineInput = document.createElement("input");
			deadlineInput.type = "date";
			deadlineInput.name = "deadline";
			deadlineInput.id = "deadline";
			deadlineInput.required = true;
			deadlineInput.value = selectedCard.deadline;

			deadline.appendChild(deadlineLabel);
			deadline.appendChild(deadlineInput);

			var submit = document.createElement("button");
			submit.type = "submit";
			submit.textContent = "Submit";

			// form.appendChild(artworkNameLabel);
			// form.appendChild(artworkNameInput);
			form.appendChild(artworkName);
			// form.appendChild(whoIsItForLabel);
			// form.appendChild(whoIsItForInput);
			form.appendChild(whoIsItFor);
			// form.appendChild(completed);
			// form.appendChild(completedLabel)
			form.appendChild(completed);
			// form.appendChild(inProgress)
			// form.appendChild(inProgressLabel)
			form.appendChild(inProgress);
			// form.appendChild(inQueue)
			// form.appendChild(inQueueLabel)
			form.appendChild(inQueue);
			// form.appendChild(notStarted)
			// form.appendChild(notStartedLabel)
			form.appendChild(notStarted);
			// form.appendChild(waitlist)
			// form.appendChild(waitlistLabel)
			form.appendChild(waitlist);
			// form.appendChild(deadlineLabel)
			// form.appendChild(deadlineInput)
			form.appendChild(deadline);
			form.appendChild(submit);

			form.addEventListener("submit", async function (event) {
				event.preventDefault();
				// updateInfo(event);
				edit.disabled = false;
				if (document.contains(document.querySelector(".editForm"))) {
					document.querySelector(".editForm").remove();
				}

				var change = false;

				var artworkNameField = form.elements["artwork_name"];
				var artworkNameValue = artworkNameField.value;
				console.log(artworkNameValue);

				var whoIsItForField = form.elements["who_is_it_for"];
				var whoIsItForValue = whoIsItForField.value;
				console.log(whoIsItForValue);

				var statusField = form.elements["status"];
				var statusValue = statusField.value;
				console.log(statusValue);

				var deadlineField = form.elements["deadline"];
				var deadlineValue = deadlineField.value;
				console.log(deadlineValue);

				// await localStorage.setItem(
				// 	'selectedCard',
				// 	JSON.stringify({
				// 		artwork_name: artworkNameValue,
				// 		who_is_it_for: whoIsItForValue,
				// 		status: statusValue,
				// 		deadline: deadlineValue,
				// 	}),
				// );
				var label = false;

				// const completedLabel = document.createElement("label");
				// completedLabel.textContent = "Completed";
				// editWrapper.appendChild(message);

				if (selectedCard.artwork_name != artworkNameValue) {
					if (!label) {
						var waitLabel = document.createElement("h1");
						waitLabel.textContent = "Please wait...";
						editWrapper.appendChild(waitLabel);
						label = true;
					}
					// localStorage.setItem(
					// 	"selectedCard",
					// 	JSON.stringify({
					// 		artwork_name: artworkNameValue,
					// 		who_is_it_for: selectedCard.who_is_it_for,
					// 		status: selectedCard.status,
					// 		deadline: selectedCard.deadline,
					// 	}),
					// );
					console.log("artwork name was changed");
					await editName(password, selectedCard, artworkNameValue);
					var artworkLabel = document.createElement("h3");
					artworkLabel.textContent = "artwork_name updated";
					editWrapper.appendChild(artworkLabel);
					change = true;
					setCookie(
						"selectedCard",
						JSON.stringify({
							artwork_name: artworkNameValue,
							who_is_it_for: selectedCard.who_is_it_for,
							status: selectedCard.status,
							deadline: selectedCard.deadline,
						}),
					);
					selectedCardString = getCookie("selectedCard");
					selectedCard = JSON.parse(selectedCardString);
					console.log("localStorage artwork_name updated");
				}
				// delay(1500)

				if (selectedCard.who_is_it_for != whoIsItForValue) {
					if (!label) {
						var waitLabel = document.createElement("h1");
						waitLabel.textContent = "Please wait...";
						editWrapper.appendChild(waitLabel);
						label = true;
					}
					// localStorage.setItem(
					// 	"selectedCard",
					// 	JSON.stringify({
					// 		artwork_name: selectedCard.artwork_name,
					// 		who_is_it_for: whoIsItForValue,
					// 		status: selectedCard.status,
					// 		deadline: selectedCard.deadline,
					// 	}),
					// );
					console.log("who is it for was changed");
					await editFor(password, selectedCard, whoIsItForValue);
					var forLabel = document.createElement("h3");
					forLabel.textContent = "who_is_it_for updated";
					editWrapper.appendChild(forLabel);
					change = true;
					setCookie(
						"selectedCard",
						JSON.stringify({
							artwork_name: selectedCard.artwork_name,
							who_is_it_for: whoIsItForValue,
							status: selectedCard.status,
							deadline: selectedCard.deadline,
						}),
					);
					selectedCardString = getCookie("selectedCard");
					selectedCard = JSON.parse(selectedCardString);
					console.log("localStorage who_is_it_for updated");
				}

				if (selectedCard.status != statusValue) {
					if (!label) {
						var waitLabel = document.createElement("h1");
						waitLabel.textContent = "Please wait...";
						editWrapper.appendChild(waitLabel);
						label = true;
					}
					console.log("status was changed");
					await editStatus(password, selectedCard, statusValue);
					var statusLabel = document.createElement("h3");
					statusLabel.textContent = "status updated";
					editWrapper.appendChild(statusLabel);
					change = true;
					setCookie(
						"selectedCard",
						JSON.stringify({
							artwork_name: selectedCard.artwork_name,
							who_is_it_for: selectedCard.who_is_it_for,
							status: statusValue,
							deadline: selectedCard.deadline,
						}),
					);
					selectedCardString = getCookie("selectedCard");
					selectedCard = JSON.parse(selectedCardString);
					console.log("localStorage status updated");
				}

				if (selectedCard.deadline != deadlineValue) {
					if (!label) {
						const waitLabel = document.createElement("h1");
						waitLabel.textContent = "Please wait...";
						editWrapper.appendChild(waitLabel);
						label = true;
					}
					console.log("deadline was changed");
					await editDeadline(password, selectedCard, deadlineValue);
					var deadlineLabel = document.createElement("h3");
					deadlineLabel.textContent = "deadline updated";
					editWrapper.appendChild(deadlineLabel);
					change = true;
					setCookie(
						"selectedCard",
						JSON.stringify({
							artwork_name: selectedCard.artwork_name,
							who_is_it_for: selectedCard.who_is_it_for,
							status: selectedCard.status,
							deadline: deadlineValue,
						}),
					);
					selectedCardString = getCookie("selectedCard");
					selectedCard = JSON.parse(selectedCardString);
					console.log("localStorage deadline updated");
				}

				// if (!(selectedCard.artwork_name != artworkNameValue) && !(selectedCard.who_is_it_for != whoIsItForValue) && !(selectedCard.status != statusValue) && !(selectedCard.deadline != deadlineValue)) {
				//     change = false
				// }

				if (change) {
					setCookie(
						"selectedCard",
						JSON.stringify({
							artwork_name: artworkNameValue,
							who_is_it_for: whoIsItForValue,
							status: statusValue,
							deadline: deadlineValue,
						}),
					);
					console.log("localStorage updated");
					window.location.reload();
				}
			});

			editWrapper.appendChild(form);

			console.log("You have access");
		} else {
			if (document.contains(document.querySelector(".editForm"))) {
				document.querySelector(".editForm").remove();
			}

			var message = document.createElement("h1");
			message.textContent = "You do not have edit access";
			message.classList.add("message");

			editWrapper.appendChild(message);
			console.log("You do not have access");
		}
	} catch (error) {
		console.error(error.message);
	}
}

function handleBack() {
	window.location.href = "home.html";
}

function updateInfo(event) {
	var data = new FormData(event.target);

	console.log(data);
}

async function editName(password, selectedCard, artworkNameValue) {
	var url = "https://notion-kindle-api-wrapper.lilia.rocks/edit-name";
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: password,
				artwork_name: selectedCard.artwork_name,
				new_name: artworkNameValue,
			}),
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
	} catch (error) {
		console.error(error.message);
	}

	// localStorage.setItem(
	// 	"selectedCard",
	// 	JSON.stringify({
	// 		artwork_name: artworkNameValue, // artworkNameValue becomes the new selectedCard.artwork_name
	// 		who_is_it_for: selectedCard.who_is_it_for,
	// 		status: selectedCard.status,
	// 		deadline: selectedCard.deadline,
	// 	}),
	// );
}

async function editFor(password, selectedCard, whoIsItForValue) {
	var url = "https://notion-kindle-api-wrapper.lilia.rocks/edit-for";
	// console.log(selectedCard.artwork_name)
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: password,
				artwork_name: selectedCard.artwork_name,
				// artwork_name: "Orpheus and Heidi",
				new_for: whoIsItForValue,
			}),
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
	} catch (error) {
		console.error(error.message);
	}
}

async function editStatus(password, selectedCard, statusValue) {
	var url = "https://notion-kindle-api-wrapper.lilia.rocks/edit-status";
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: password,
				artwork_name: selectedCard.artwork_name,
				new_status: statusValue,
			}),
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
	} catch (error) {
		console.error(error.message);
	}
}

async function editDeadline(password, selectedCard, deadlineValue) {
	var url = "https://notion-kindle-api-wrapper.lilia.rocks/edit-deadline";
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: password,
				artwork_name: selectedCard.artwork_name,
				new_deadline: deadlineValue,
			}),
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
	} catch (error) {
		console.error(error.message);
	}
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function () {
	displayDetails();
});
