// Navigasi halaman
document.getElementById("proceedButton").addEventListener("click", function () {
  document.getElementById("welcomePage").classList.add("d-none");
  document.getElementById("formPage").classList.remove("d-none");
});

// Event listener untuk form
document
  .getElementById("randomizerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah submit default

    // Ambil jumlah pertanyaan dan opsi jawaban
    const numQuestions = parseInt(
      document.getElementById("numQuestions").value
    );
    const options = Array.from(
      document.querySelectorAll(".form-check-input:checked")
    ).map((input) => input.value);

    // Validasi jumlah pertanyaan
    if (isNaN(numQuestions) || numQuestions !== 15) {
      Swal.fire({
        icon: "error",
        title: "Jumlah Pertanyaan Salah",
        text: "Jumlah pertanyaan harus tepat 15!",
        confirmButtonColor: "#007BFF",
      });
      return;
    }

    // Validasi minimal 3 opsi jawaban
    if (options.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Minimal 3 Opsi",
        text: "Anda harus memilih minimal 3 opsi jawaban!",
        confirmButtonColor: "#007BFF",
      });
      return;
    }

    // Fungsi untuk menghasilkan jawaban acak
    function generateAnswers(num, choices) {
      const answers = [];
      for (let i = 1; i <= num; i++) {
        const randomIndex = Math.floor(Math.random() * choices.length);
        answers.push({
          question: `Pertanyaan ${i}`,
          answer: choices[randomIndex],
        });
      }
      return answers;
    }

    // Hasil random jawaban
    const results = generateAnswers(numQuestions, options);

    // Render hasil dalam tabel
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Kosongkan tabel sebelum diisi
    results.forEach((item, index) => {
      const row = `<tr>
          <td>${index + 1}</td>
          <td>${item.question}</td>
          <td>${item.answer}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });

    // Tampilkan tabel hasil
    document.getElementById("resultTable").classList.remove("d-none");

    // Ubah tombol menjadi "Generate Ulang"
    const generateButton = document.getElementById("generateButton");
    generateButton.textContent = "Generate Ulang";
  });

// Copy hasil jawaban ke clipboard
document.getElementById("copyButton").addEventListener("click", function () {
  const rows = Array.from(document.querySelectorAll("#tableBody tr"));
  const text = rows.map((row) => row.textContent.trim()).join("\n");

  navigator.clipboard
    .writeText(text)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Hasil Disalin",
        text: "Hasil jawaban telah disalin ke clipboard.",
        confirmButtonColor: "#007BFF",
      });
    })
    .catch((err) => {
      console.error("Gagal menyalin: ", err);
    });
});
