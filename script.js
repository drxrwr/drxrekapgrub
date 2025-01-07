// Fitur 1: Urutan Nama Grup
function generateNames() {
  const input = document.getElementById("inputText").value.trim();
  const addColon = document.getElementById("addColon").checked;
  const output = document.getElementById("outputText");

  try {
    // Ganti simbol § dengan spasi di seluruh teks
    const formattedInput = input.replace(/§/g, " ");

    // Regex untuk rentang angka
    const rangeRegex = /(\D*?)(\d+)\s*-\s*(\d+)(.*?)/;

    let result = "";

    // Cek apakah format sesuai dengan pola
    const match = formattedInput.match(rangeRegex);
    if (match) {
      const prefix = match[1] || ""; // Teks sebelum angka
      const start = parseInt(match[2], 10); // Angka awal
      const end = parseInt(match[3], 10); // Angka akhir
      const suffix = match[4] || ""; // Teks setelah angka

      // Loop untuk menghasilkan daftar angka dengan teks
      for (let i = start; i <= end; i++) {
        result += `${prefix}${i}${suffix}${addColon ? " :" : ""}\n`;
      }

      output.value = result; // Tampilkan hasil pada textarea
    } else {
      alert(
        "Format tidak dikenali. Gunakan format seperti:\n1-5\nikan§1-3§kecoak\nikan1-3kecoak."
      );
    }
  } catch (error) {
    console.error("Error saat memproses teks:", error);
    alert("Terjadi kesalahan. Pastikan format input sesuai.");
  }
}

function copyText(elementId) {
  const text = document.getElementById(elementId).value;
  navigator.clipboard.writeText(text).then(() => {
    alert("Teks berhasil disalin!");
  });
}

// Fitur 2: Masukkan File
function processFile() {
  const fileInput = document.getElementById("fileInput");
  const output = document.getElementById("fileOutput");

  if (fileInput.files.length === 0) {
    alert("Pilih file terlebih dahulu!");
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name.split(".")[0]; // Nama file tanpa ekstensi
  output.value = fileName;
}

// Fitur 3: Proses Gambar dan OCR
function processImage() {
  const imageInput = document.getElementById("imageInput");
  const previewImage = document.getElementById("previewImage");
  const imageOutput = document.getElementById("imageOutput");

  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";

      Tesseract.recognize(e.target.result, "eng", {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          const processedText = processOCRText(text.trim());
          imageOutput.value = processedText;
        })
        .catch((error) => {
          console.error("Error OCR:", error);
          imageOutput.value = "Error membaca gambar. Silakan coba lagi.";
        });
    };

    reader.readAsDataURL(file);
  } else {
    alert("Pilih gambar terlebih dahulu!");
  }
}

function processOCRText(text) {
  try {
    const lines = text.split("\n"); // Pisahkan per baris
    let groupName = "";
    let memberCount = "";

    lines.forEach((line) => {
      if (line.toLowerCase().includes("nama grup")) {
        groupName = line.split(":")[1]?.trim() || "Tidak Diketahui";
      } else if (line.toLowerCase().includes("jumlah anggota")) {
        memberCount = line.split(":")[1]?.trim() || "Tidak Diketahui";
      }
    });

    return `Nama Grup: ${groupName}\nJumlah Anggota: ${memberCount}`;
  } catch (error) {
    console.error("Error saat memproses teks OCR:", error);
    return "Error saat memproses teks.";
  }
}

function continueImage() {
  document.getElementById("previewImage").style.display = "none";
  document.getElementById("imageInput").value = "";
}

function resetText(elementId) {
  document.getElementById(elementId).value = "";
}