const form = document.querySelector("#tonalli-form");
const dateInput = document.querySelector("#birth-date");
const resultPanel = document.querySelector("#result");
const tonalName = document.querySelector("#tonal-name");
const trecenaName = document.querySelector("#trecena-name");
const readingPreview = document.querySelector("#reading-preview");
const fullReading = document.querySelector("#full-reading");
const status = document.querySelector("#status");
const submitButton = form.querySelector("button");

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function buildPreview(reading) {
  const paragraphs = reading.split(/\n{2,}/).filter(Boolean);
  const culturalParagraph =
    paragraphs.find((paragraph) => paragraph.startsWith("Lectura xolosArmy:")) ??
    paragraphs.find((paragraph) => paragraph.startsWith("Signo ")) ??
    paragraphs[0] ??
    "";

  return culturalParagraph.replace(/^Lectura xolosArmy:\s*/, "");
}

function renderReading(reading) {
  fullReading.replaceChildren(
    ...reading
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((paragraph) => {
        const element = document.createElement("p");
        element.textContent = paragraph;
        return element;
      })
  );
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const date = dateInput.value;
  if (!date) {
    setStatus("Elige una fecha de nacimiento.", true);
    return;
  }

  submitButton.disabled = true;
  setStatus("Consultando el Tonalli...");

  try {
    const response = await fetch(`/api/tonalli/${encodeURIComponent(date)}`);
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      throw new Error(payload.error ?? "No se pudo consultar el Tonalli.");
    }

    tonalName.textContent = payload.result.tonalName;
    trecenaName.textContent = payload.result.trecenaName;
    readingPreview.textContent = buildPreview(payload.reading);
    renderReading(payload.reading);
    resultPanel.hidden = false;
    setStatus("");
  } catch (error) {
    resultPanel.hidden = true;
    setStatus(error instanceof Error ? error.message : "Ocurrio un error inesperado.", true);
  } finally {
    submitButton.disabled = false;
  }
});
