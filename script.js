// Fitur 1: Format Teks
document.getElementById("processText").addEventListener("click", () => {
  const input = document.getElementById("textInput").value;
  const result = input.replace(/(\d+)-(\d+)/g, (_, start, end) => {
    let output = "";
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      output += input.replace(`${start}-${end}`, i) + "\n";
    }
    return output.trim();
  });
  document.getElementById("textOutput").value = result;
});

document.getElementById("addColon").addEventListener("click", () => {
  const output = document.getElementById("textOutput").value;
  const result = output
    .split("\n")
    .map(line => line + " :")
    .join("\n");
  document.getElementById("textOutput").value = result;
});

// Fitur 2: Upload File
document.getElementById("uploadFile").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Silakan pilih file terlebih dahulu.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    document.getElementById("fileOutput").value = content;
  };
  reader.readAsText(file);
});

// Fitur 3: OCR
document.getElementById("processImage").addEventListener("click", async () => {
  const imageInput = document.getElementById("imageInput");
  if (imageInput.files.length === 0) {
    alert("Silakan pilih gambar terlebih dahulu.");
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.onload = async (e) => {
    const imageData = e.target.result;
    const worker = Tesseract.createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data: { text } } = await worker.recognize(imageData);
    const groupNameMatch = text.match(/(Importante\s\w+)/i);
    const memberCountMatch = text.match(/(\d+)\sanggota/i);

    if (groupNameMatch && memberCountMatch) {
      document.getElementById("ocrOutput").value = `${groupNameMatch[1]} : ${memberCountMatch[1]}`;
    } else {
      document.getElementById("ocrOutput").value = "Nama grup : ";
    }

    await worker.terminate();
  };
  reader.readAsDataURL(file);
});

// Tombol Salin
document.getElementById("copyText").addEventListener("click", () => {
  const output = document.getElementById("ocrOutput").value;
  navigator.clipboard.writeText(output).then(() => {
    alert("Teks berhasil disalin!");
  });
});

// Tombol Reset
document.getElementById("resetAll").addEventListener("click", () => {
  document.getElementById("textInput").value = "";
  document.getElementById("textOutput").value = "";
  document.getElementById("fileOutput").value = "";
  document.getElementById("ocrOutput").value = "";
  document.getElementById("imagePreview").innerHTML = "";
  document.getElementById("imageInput").value = "";
  document.getElementById("fileInput").value = "";
});
