// Fitur 1: Urutan Nama Grup
function generateNames() {
  const input = document.getElementById("inputText").value;
  const output = document.getElementById("outputText");

  const regex = /^(.*?)§?(\d+)-(\d+)§?(.*?)$/;
  const match = input.match(regex);

  if (!match) {
    alert("Format tidak sesuai. Gunakan format: teks angka-teks atau angka-teks-angka.");
    return;
  }

  const prefix = match[1].trim().replace(/§/g, " ");
  const start = parseInt(match[2], 10);
  const end = parseInt(match[3], 10);
  const suffix = match[4].trim().replace(/§/g, " ");
  let result = "";

  for (let i = start; i <= end; i++) {
    result += `${prefix}${i}${suffix}\n`;
  }

  output.value = result.trim();
}

// Fitur 2: Masukkan File
function processFile() {
  const fileInput = document.getElementById("fileInput");
  const fileOutput = document.getElementById("fileOutput");

  if (fileInput.files.length === 0) {
    alert("Harap pilih file terlebih dahulu.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    fileOutput.value = reader.result;
  };

  reader.onerror = function () {
    alert("Gagal membaca file.");
  };

  reader.readAsText(file);
}

// Fitur 3: Foto Profil Grup
function processImage() {
  const imageInput = document.getElementById("imageInput");
  const imageOutput = document.getElementById("imageOutput");

  if (imageInput.files.length === 0) {
    alert("Harap pilih gambar terlebih dahulu.");
    return;
  }

  const file = imageInput.files[0];
  Tesseract.recognize(file, "eng").then(({ data: { text } }) => {
    const lines = text.trim().split("\n").filter((line) => line !== "");
    const result = lines.map((line) => {
      const match = line.match(/^(.*?)\s*[:|-]\s*(\d+)/);
      return match ? `${match[1]} : ${match[2]}` : line;
    });

    imageOutput.value += result.join("\n") + "\n";
  }).catch((err) => {
    alert("Gagal memproses gambar.");
    console.error(err);
  });
}

function continueImage() {
  alert("Lanjutkan menambahkan hasil berikutnya.");
}

function resetText(elementId) {
  document.getElementById(elementId).value = "";
}

// Salin ke Clipboard
function copyText(elementId) {
  const textarea = document.getElementById(elementId);
  textarea.select();
  document.execCommand("copy");
  alert("Teks berhasil disalin.");
}
