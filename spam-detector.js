const API_URL = "https://email-spam-classifier-ejm4.onrender.com/predict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("spam-detector-form");
  const emailInput = document.getElementById("email-input");
  const submitButton = document.getElementById("submit-button");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value;

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Analyzing...';
    resultDiv.innerHTML = "";
    errorDiv.innerHTML = "";

    try {
      const response = await axios.post(API_URL, { message: email });
      console.log(response.data);
      const result = response.data.prediction;
      const isSpam = result.toLowerCase().includes("spam");

      resultDiv.innerHTML = `
        <div class="flex items-center justify-center ${
          isSpam ? "text-red-600" : "text-green-600"
        } text-xl font-bold mt-4 p-3 rounded-full ${
        isSpam ? "bg-red-100" : "bg-green-100"
      } animate-fade-in-up">
          ${
            isSpam
              ? '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
              : '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
          }
          ${result}
        </div>
      `;
    } catch (err) {
      errorDiv.innerHTML = `
        <div class="text-red-600 mt-4 text-center bg-red-100 p-3 rounded-lg animate-fade-in-up">
          An error occurred while checking the email. Please try again.
        </div>
      `;
      console.error("API call error:", err);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = "Check for Spam";
    }
  });
});
