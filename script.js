const form = document.getElementById("user-form");
const peopleList = document.getElementById("people-list");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = parseInt(document.getElementById("age").value.trim());
  const hobby = document.getElementById("hobby").value.trim();

  if (!validateField("Full Name", fullName) ||
      !validateField("Email", email) ||
      !validateField("Age", age) ||
      !validateField("Hobby", hobby)) {
    return;
  }

  if (!validateEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  if (isNaN(age) || age <= 0) {
    showError("Please enter a valid age greater than 0.");
    return;
  }

  if (age <= 18) {
    showError("You must be over 18 to submit.");
    return;
  }

  addPersonToList({ fullName, email, age, hobby });
  form.reset();
  showError(""); // Clear error
});

function validateField(name, value) {
  if (!value) {
    showError(`${name} is required.`);
    return false;
  }
  return true;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showError(message) {
  errorMessage.textContent = message;
}

function addPersonToList(person) {
  const li = document.createElement("li");
  li.textContent = `Full Name: ${person.fullName}, Email: ${person.email}, Age: ${person.age}, Hobby: ${person.hobby}`;
  peopleList.appendChild(li);
}
