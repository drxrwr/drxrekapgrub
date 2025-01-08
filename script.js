// Fitur Pertama
function generateSequence() {
  const input = document.getElementById("groupInput").value;
  const output = document.getElementById("groupOutput");
  output.value = ""; // Clear output

  const match = input.match(/^(.*?)(\d+)-(\d+)(.*?)$/);
  if (match) {
    const prefix = match[1];
    const start = parseInt(match[2]);
    const end = parseInt(match[3]);
    const suffix = match[4];

    for (let i = start; i <= end; i++) {
      output.value += `${prefix}${i}${suffix}\n`;
    }
  } else {
    output.value = "Format input tidak sesuai. Contoh: teks 1-5 teks.";
  }
}

// Fitur Kedua
function processFile() {
  const fileInput = document.getElementById("fileInput");
  const output = document.getElementById("fileOutput");
  output.value = ""; // Clear output

  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    output.value = fileName.replace(/\.\w+$/, "");
  }
}

// Fitur Ketiga
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
          const match = text.match(/^(.*)\sGrup\s(\d+)\sanggota$/i);
          if (match) {
            imageOutput.value += `${match[1]} : ${match[2]}\n`;
          } else {
            imageOutput.value += "nama grup : \n";
          }
        })
        .catch((error) => {
          console.error("Error OCR:", error);
          imageOutput.value += "nama grup : \n";
        });
    };

    reader.readAsDataURL(file);
  } else {
    alert("Pilih gambar terlebih dahulu!");
  }
}

function continueImage() {
  document.getElementById("previewImage").style.display = "none";
  document.getElementById("imageInput").value = "";
}

function resetText(elementId) {
  document.getElementById(elementId).value = "";
}

function copyText(elementId) {
  const text = document.getElementById(elementId);
  text.select();
  document.execCommand("copy");
  alert("Teks berhasil disalin!");
}
