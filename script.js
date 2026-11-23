

function calculateResult() {

    let name = document.getElementById("studentName").value.trim();
    let roll = document.getElementById("rollNumber").value.trim();

    let subjects = {
        English: document.getElementById("english").value,
        Math: document.getElementById("math").value,
        Computer: document.getElementById("computer").value,
        Physics: document.getElementById("physics").value,
        Chemistry: document.getElementById("chemistry").value
    };

    if (name === "" || roll === "") {
        alert("Please enter Student Name and Roll Number!");
        return;
    }

    let marks = {};

    for (let subject in subjects) {

        let value = subjects[subject];

        if (value === "" || Number(value) < 0 ||
            Number(value) > 100) {
            alert("Please enter valid marks between 0 and 100 in all subjects!");
            return;
        }

        marks[subject] = Number(value);
    }

    let total = 500;
    let obtained = 0;
    let highest = 0;
    let lowest = 100;
    let allPass = true;

    for (let subject in marks) {

        obtained += marks[subject];

        if (marks[subject] > highest) {
            highest = marks[subject];
        }

        if (marks[subject] < lowest) {
            lowest = marks[subject];
        }

        if (marks[subject] < 40) {
            allPass = false;
        }
    }

    let percentage = (obtained / total) * 100;

    let grade;

    if (!allPass) {
        grade = "Fail";
    }
    else if (percentage >= 80) {
        grade = "A";
    }
    else if (percentage >= 70) {
        grade = "B";
    }
    else if (percentage >= 60) {
        grade = "C";
    }
    else {
        grade = "Fail";
    }

    let status = grade === "Fail" ? "Fail" : "Pass";

    let result = `
        <h2>Student Result</h2>

        <h3>Student Information</h3>

        <div class="detail">
            <b>Student Name:</b> ${escapeHTML(name)}
        </div>

        <div class="detail">
            <b>Roll Number:</b> ${escapeHTML(roll)}
        </div>

        <h3>Subject Wise Marks</h3>
    `;

    for (let subject in marks) {
        result += `
            <div class="detail">
                <b>${subject}:</b> ${marks[subject]} / 100
            </div>
        `;
    }

    result += `
        <h3>Result Details</h3>

        <div class="detail">
            <b>Total Marks:</b> ${total}
        </div>

        <div class="detail">
            <b>Obtained Marks:</b> ${obtained}
        </div>

        <div class="detail">
            <b>Percentage:</b> ${percentage.toFixed(2)}%
        </div>

        <div class="detail">
            <b>Highest Marks:</b> ${highest}
        </div>

        <div class="detail">
            <b>Lowest Marks:</b> ${lowest}
        </div>

        <div class="detail">
            <b>Grade:</b> ${grade}
        </div>

        <div class="status ${status === 'Pass' ? 'pass' : 'fail'}">
            Status: ${status}
        </div>

        <h3 class="${status === 'Pass' ? 'pass' : 'fail'}"
            style="text-align:center; margin-top:15px;">
            ${status === 'Pass' ?
            'Congratulations! You Passed' :
            'Sorry! You Failed'}
        </h3>
    `;

    let resultBox = document.getElementById("result");

    resultBox.innerHTML = result;
    resultBox.style.display = "block";
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}
