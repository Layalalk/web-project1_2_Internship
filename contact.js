document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  if (!form) return;

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const gender = document.getElementById("gender");
  const mobile = document.getElementById("mobile");
  const dob = document.getElementById("dob");
  const email = document.getElementById("email");
  const language = document.getElementById("language");
  const category = document.getElementById("category");
  const message = document.getElementById("message");

  function showError(input, messageText) {
    clearError(input);

    const error = document.createElement("small");
    error.className = "error-message";
    error.textContent = messageText;
    error.style.color = "#ef4444";
    error.style.display = "block";
    error.style.marginTop = "0.35rem";
    error.style.fontWeight = "700";

    input.style.borderColor = "#ef4444";
    input.parentElement.appendChild(error);
  }

  function clearError(input) {
    input.style.borderColor = "";
    const oldError = input.parentElement.querySelector(".error-message");
    if (oldError) {
      oldError.remove();
    }
  }

  function showSuccessMessage(messageText) {
    const oldSuccess = document.querySelector(".success-message");
    if (oldSuccess) oldSuccess.remove();

    const success = document.createElement("div");
    success.className = "success-message";
    success.textContent = messageText;
    success.style.backgroundColor = "#d1fae5";
    success.style.color = "#065f46";
    success.style.padding = "0.9rem 1rem";
    success.style.borderRadius = "10px";
    success.style.marginTop = "1rem";
    success.style.fontWeight = "800";
    success.style.textAlign = "center";

    form.appendChild(success);
  }

  function clearSuccessMessage() {
    const oldSuccess = document.querySelector(".success-message");
    if (oldSuccess) oldSuccess.remove();
  }

  function validateName(input, fieldName) {
    const value = input.value.trim();
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;

    clearError(input);

    if (value === "") {
      showError(input, `${fieldName} مطلوب`);
      return false;
    }

    if (value.length < 2) {
      showError(input, `${fieldName} يجب أن يكون حرفين على الأقل`);
      return false;
    }

    if (!nameRegex.test(value)) {
      showError(input, `${fieldName} يجب أن يحتوي على حروف فقط`);
      return false;
    }

    return true;
  }

  function validateGender() {
    clearError(gender);

    if (!gender.value) {
      showError(gender, "يرجى اختيار الجنس");
      return false;
    }

    return true;
  }

  function validateMobile() {
    const value = mobile.value.trim();
    const mobileRegex = /^05[0-9]{8}$/;

    clearError(mobile);

    if (value === "") {
      showError(mobile, "رقم الجوال مطلوب");
      return false;
    }

    if (!mobileRegex.test(value)) {
      showError(mobile, "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام");
      return false;
    }

    return true;
  }

  function validateDOB() {
    clearError(dob);

    if (!dob.value) {
      showError(dob, "تاريخ الميلاد مطلوب");
      return false;
    }

    const birthDate = new Date(dob.value);
    const today = new Date();

    if (birthDate > today) {
      showError(dob, "تاريخ الميلاد لا يمكن أن يكون في المستقبل");
      return false;
    }

    return true;
  }

  function validateEmail() {
    const value = email.value.trim();
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    clearError(email);

    if (value === "") {
      showError(email, "البريد الإلكتروني مطلوب");
      return false;
    }

    if (!emailRegex.test(value)) {
      showError(email, "أدخل بريدًا إلكترونيًا صحيحًا");
      return false;
    }

    return true;
  }

  function validateLanguage() {
    clearError(language);

    if (!language.value) {
      showError(language, "يرجى اختيار لغة التواصل");
      return false;
    }

    return true;
  }

  function validateCategory() {
    clearError(category);

    if (!category.value) {
      showError(category, "يرجى اختيار موضوع الرسالة");
      return false;
    }

    return true;
  }

  function validateMessage() {
    const value = message.value.trim();

    clearError(message);

    if (value === "") {
      showError(message, "نص الرسالة مطلوب");
      return false;
    }

    if (value.length < 10) {
      showError(message, "نص الرسالة يجب أن يكون 10 أحرف على الأقل");
      return false;
    }

    return true;
  }

  firstName.addEventListener("blur", function () {
    validateName(firstName, "الاسم الأول");
  });

  lastName.addEventListener("blur", function () {
    validateName(lastName, "اسم العائلة");
  });

  gender.addEventListener("change", validateGender);
  mobile.addEventListener("blur", validateMobile);
  dob.addEventListener("change", validateDOB);
  email.addEventListener("blur", validateEmail);
  language.addEventListener("change", validateLanguage);
  category.addEventListener("change", validateCategory);
  message.addEventListener("blur", validateMessage);

  form.addEventListener("submit", function (event) {
    clearSuccessMessage();

    const isFirstNameValid = validateName(firstName, "الاسم الأول");
    const isLastNameValid = validateName(lastName, "اسم العائلة");
    const isGenderValid = validateGender();
    const isMobileValid = validateMobile();
    const isDOBValid = validateDOB();
    const isEmailValid = validateEmail();
    const isLanguageValid = validateLanguage();
    const isCategoryValid = validateCategory();
    const isMessageValid = validateMessage();

    const isFormValid =
      isFirstNameValid &&
      isLastNameValid &&
      isGenderValid &&
      isMobileValid &&
      isDOBValid &&
      isEmailValid &&
      isLanguageValid &&
      isCategoryValid &&
      isMessageValid;

    if (!isFormValid) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    showSuccessMessage("تم إرسال رسالتك بنجاح");
    form.reset();
  });

  form.addEventListener("reset", function () {
    clearSuccessMessage();

    const inputs = [firstName, lastName, gender, mobile, dob, email, language, category, message];
    inputs.forEach(clearError);
  });
});