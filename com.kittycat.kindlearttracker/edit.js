function displayDetails() {
    const editWrapper = document.querySelector('.editWrapper');

    const selectedCardString = localStorage.getItem('selectedCard');

    if (selectedCardString) {
        const selectedCard = JSON.parse(selectedCardString);
        editWrapper.innerHTML = `
        <h1>${selectedCard.artwork_name}</h1>
        <h2>who is it for? ${selectedCard.who_is_it_for}</h2>
        <h2>Status: ${selectedCard.status}</h2>
        <h2>Deadline: ${selectedCard.deadline}</h2>
        <button class="back">go back</button>

        <button class="edit">edit</button>
        `

        // <button class="artwork-name">edit artwork name</button>
        // <button class="who-is-it-for">edit who it is for</button>
        // <button class="status">edit status</button>
        // <button class="edit-deadline">edit deadline</button>
        const back = document.querySelector('.back');
        back.addEventListener("click", handleBack);

        const edit = document.querySelector('.edit');
        edit.addEventListener("click", editInfo);
    } else {
        editWrapper.innerHTML = `
        <h1>Data must be lost...</h1>
        `
    }
}

async function editInfo() {
    const editWrapper = document.querySelector('.editWrapper');
    const password = localStorage.getItem('password')
    const selectedCardString = localStorage.getItem('selectedCard');
    const selectedCard = JSON.parse(selectedCardString);

    const url = "http://localhost:8787/verify-password";
        try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password
            })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        if (result.success == true) {
            if (document.contains(document.querySelector('.message'))) {
                document.querySelector('.message').remove();
            }

            const form = document.createElement('form');
            form.classList.add("editForm")

            const artworkNameLabel = document.createElement("label");
            artworkNameLabel.textContent = "Artwork Name: ";
            const artworkNameInput = document.createElement("input");
            artworkNameInput.type = "text";
            artworkNameInput.name = "artwork_name";
            artworkNameInput.id = "artwork_name";
            artworkNameInput.required = true;
            artworkNameInput.value = selectedCard.artwork_name;

            const whoIsItForLabel = document.createElement("label");
            whoIsItForLabel.textContent = "Who is it for? ";
            const whoIsItForInput = document.createElement("input");
            whoIsItForInput.type = "text";
            whoIsItForInput.name = "who_is_it_for";
            whoIsItForInput.id = "who_is_it_for";
            whoIsItForInput.required = true;
            whoIsItForInput.value = selectedCard.who_is_it_for;

            const completed = document.createElement("input");
            completed.type = "radio";
            completed.name = "status";
            completed.id = "completed";
            completed.value = "Completed";
            completed.checked = true;
            const completedLabel = document.createElement("label");
            completedLabel.textContent = "Completed";

            const inProgress = document.createElement("input");
            inProgress.type = "radio";
            inProgress.name = "status";
            inProgress.id = "inProgress";
            inProgress.value = "In-Progress";
            const inProgressLabel = document.createElement("label");
            inProgressLabel.textContent = "In-Progress";

            const inQueue = document.createElement("input");
            inQueue.type = "radio";
            inQueue.name = "status";
            inQueue.id = "inQueue";
            inQueue.value = "In-Queue";
            const inQueueLabel = document.createElement("label");
            inQueueLabel.textContent = "In-Queue";

            const notStarted = document.createElement("input");
            notStarted.type = "radio";
            notStarted.name = "status";
            notStarted.id = "notStarted";
            notStarted.value = "Not-Started";
            const notStartedLabel = document.createElement("label");
            notStartedLabel.textContent = "Not-Started";

            const waitlist = document.createElement("input");
            waitlist.type = "radio";
            waitlist.name = "status";
            waitlist.id = "waitlist";
            waitlist.value = "Waitlist";
            const waitlistLabel = document.createElement("label");
            waitlistLabel.textContent = "Waitlist"

            const deadlineLabel = document.createElement("label");
            deadlineLabel.textContent = "Deadline: ";
            const deadlineInput = document.createElement("input");
            deadlineInput.type = "date";
            deadlineInput.name = "deadline";
            deadlineInput.id = "deadline";
            deadlineInput.required = true;
            deadlineInput.value = selectedCard.deadline;

            const submit = document.createElement("button");
            submit.type = "submit";
            submit.textContent = "Submit";
            


            form.appendChild(artworkNameLabel);
            form.appendChild(artworkNameInput);
            form.appendChild(whoIsItForLabel);
            form.appendChild(whoIsItForInput);
            form.appendChild(completed);
            form.appendChild(completedLabel)
            form.appendChild(inProgress)
            form.appendChild(inProgressLabel)
            form.appendChild(inQueue)
            form.appendChild(inQueueLabel)
            form.appendChild(notStarted)
            form.appendChild(notStartedLabel)
            form.appendChild(waitlist)
            form.appendChild(waitlistLabel)
            form.appendChild(deadlineLabel)
            form.appendChild(deadlineInput)
            form.appendChild(submit)

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                // updateInfo(event);

                const artworkNameField = form.elements['artwork_name'];
                const artworkNameValue = artworkNameField.value;
                console.log(artworkNameValue);

                if (selectedCard.artwork_name != artworkNameValue) {
                    console.log("artwork name was changed")
                }

                const whoIsItForField = form.elements['who_is_it_for'];
                const whoIsItForValue = whoIsItForField.value;
                console.log(whoIsItForValue);

                if (selectedCard.who_is_it_for != whoIsItForValue) {
                    console.log("who is it for was changed")
                }

                const statusField = form.elements['status'];
                const statusValue = statusField.value;
                console.log(statusValue);

                if (selectedCard.status != statusValue) {
                    console.log("status was changed")
                }

                const deadlineField = form.elements['deadline'];
                const deadlineValue = deadlineField.value;
                console.log(deadlineValue)

                if (selectedCard.deadline != deadlineValue) {
                    console.log("deadline was changed")
                }
            });
            
            editWrapper.appendChild(form);
            
            console.log("You have access")
        } else {
            if (document.contains(document.querySelector('.editForm'))) {
                document.querySelector('.editForm').remove();
            }

            const message = document.createElement('h1');
            message.textContent = "You do not have edit access"
            message.classList.add("message")

            editWrapper.appendChild(message)
            console.log("You do not have access")
        }


    } catch (error) {
        console.error(error.message);
    }
}

function handleBack() {
    window.location.href = "home.html"
}

function updateInfo(event) {

    const data = new FormData(event.target);

    console.log(data)
}

document.addEventListener('DOMContentLoaded', function() {
    displayDetails();
})