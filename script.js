// Fitur 1: Urutan Nama Grup
function generateNames() {
  const input = document.getElementById("inputText").value.replace(/§/g, " ");
  const addColon = document.getElementById("addColon").checked;
  const output = document.getElementById("outputText");

  const regex = /(.*?)(\d+)(.*?)/; // Menangkap teks, angka, teks
  const match = input.match(regex);

  if (!match) {
    alert("Format tidak sesuai. Gunakan format: teks§angka§teks atau angka terlebih dahulu.");
    return;
  }

  const prefix = match[1].trim();
  const number = parseInt(match[2], 10);
  const suffix = match[3].trim();

  const result = `${prefix}${number}${suffix}${addColon ? " :" : ""}\n`;
  output.value = result;
}

function copyText(elementId) {
  const text = document.getElementById(elementId).value;
  navigator.clipboard.writeText(text).then(() => {
    alert("Teks berhasil disalin!");
  });
}

// Fitur 3: Proses Gambar dan OCR
function processImage() {
  const imageInput = document.getElementById("imageInput");
  const imageOutput = document.getElementById("imageOutput");

  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      Tesseract.recognize(e.target.result, "eng", {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          const lines = text.trim().split("\n");
          const groupLine = lines.find((line) => /\d+.*:.*\d+/.test(line)) || "";
          const result = groupLine.replace(/(\d+.*\d+):.*(\d+)/, "$1 : $2");

          imageOutput.value += `${result}\n`; // Menambahkan teks di bawahnya
        })
        .catch((error) => {
          console.error("Error OCR:", error);
          imageOutput.value += "Error membaca gambar. Silakan coba lagi.\n";
        });
    };

    reader.readAsDataURL(file);
  } else {
    alert("Pilih gambar terlebih dahulu!");
  }
}
