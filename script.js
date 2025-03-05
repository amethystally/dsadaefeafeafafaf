document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("email-form")
  const emailInput = document.getElementById("email-input")
  const submitButton = document.getElementById("submit-button")
  const loading = document.getElementById("loading")
  const errorMessage = document.getElementById("error-message")
  const resultContainer = document.getElementById("result-container")
  const resultContent = document.getElementById("result-content")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()

    if (!email || !email.includes("@")) {
      showError("Please enter a valid email address")
      return
    }

    // Show loading state
    submitButton.style.display = "none"
    loading.classList.remove("hidden")
    errorMessage.classList.add("hidden")
    resultContainer.classList.add("hidden")

    try {
      // Call the worker endpoint
      const response = await fetch(`/api/process?email=${encodeURIComponent(email)}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.text()

      // Display the result
      resultContent.textContent = data
      resultContainer.classList.remove("hidden")
    } catch (error) {
      showError(error.message || "An error occurred while processing your request")
    } finally {
      // Hide loading state
      submitButton.style.display = "block"
      loading.classList.add("hidden")
    }
  })

  function showError(message) {
    errorMessage.textContent = message
    errorMessage.classList.remove("hidden")
  }
})

