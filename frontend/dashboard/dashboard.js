const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const closeBtn = document.getElementById("close-modal");
const submitForm = document.getElementById("submit-form");
const saveBookBtn = document.getElementById("add-book");

const API_BASE = "http://localhost:3000/api";

// Submit books
async function handleBookSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name").value;
  const descInput = document.getElementById("description").value;
  const authorInput = document.getElementById("author").value;
  const priceInput = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  if (!nameInput || !descInput || !authorInput || !priceInput) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        description: descInput,
        author: authorInput,
        price: priceInput,
        imageSrc: image,
      }),
    });

    if (!response.ok) {
      console.log("something went wrong");
    }

    const data = response.json();
    modal.style.display = "none";
    submitForm.reset();
    alert('data saved successfull')
  } catch (error) {
    console.log(error);
  }
}

// Display modal
addBookBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  submitForm.reset();
});

// Handle form submission
saveBookBtn.addEventListener("click", handleBookSubmit);
