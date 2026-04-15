document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("cvFile");
  const fileNameText = document.getElementById("fileName");
  const removeBtn = document.getElementById("removeFile");
  const uploadTitle = document.querySelector(".upload-title");
  const analyzeBtn = document.querySelector(".actions-center .btn.btn-primary");

  const isArabic = document.documentElement.lang === "ar";
  let selectedFile = null;

  if (!fileInput || !fileNameText || !removeBtn || !uploadTitle || !analyzeBtn) {
    return;
  }

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];

    if (!file) {
      return;
    }

    const fileSizeMB = file.size / 1024 / 1024;
    const fileName = file.name.toLowerCase();
    const validExtension =
      fileName.endsWith(".pdf") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx");

    if (!validExtension) {
      alert(isArabic ? "نوع الملف غير مدعوم" : "Invalid file type");
      fileInput.value = "";
      selectedFile = null;
      fileNameText.textContent = "";
      removeBtn.classList.add("hidden");
      uploadTitle.textContent = isArabic ? "اختر ملف السيرة الذاتية" : "Choose your CV file";
      return;
    }

    if (fileSizeMB > 5) {
      alert(isArabic ? "حجم الملف كبير (أكثر من 5MB)" : "File is too large (more than 5MB)");
      fileInput.value = "";
      selectedFile = null;
      fileNameText.textContent = "";
      removeBtn.classList.add("hidden");
      uploadTitle.textContent = isArabic ? "اختر ملف السيرة الذاتية" : "Choose your CV file";
      return;
    }

    selectedFile = file;
    fileNameText.textContent = file.name;
    uploadTitle.textContent = isArabic ? "تم اختيار الملف" : "File selected";
    removeBtn.classList.remove("hidden");
  });

  removeBtn.addEventListener("click", function () {
    fileInput.value = "";
    selectedFile = null;
    fileNameText.textContent = "";
    uploadTitle.textContent = isArabic ? "اختر ملف السيرة الذاتية" : "Choose your CV file";
    removeBtn.classList.add("hidden");

    alert(isArabic ? "تم حذف الملف" : "File removed");
  });

  analyzeBtn.addEventListener("click", function () {
    if (!selectedFile) {
      alert(isArabic ? "يرجى اختيار ملف أولاً" : "Please select a file first");
      return;
    }

    alert(isArabic ? "تم تحليل السيرة الذاتية بنجاح" : "CV analyzed successfully");
  });
});