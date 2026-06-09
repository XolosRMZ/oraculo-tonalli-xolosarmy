const form = document.querySelector("#tonalli-form");
const dateInput = document.querySelector("#birth-date");
const resultPanel = document.querySelector("#result");
const tonalName = document.querySelector("#tonal-name");
const trecenaName = document.querySelector("#trecena-name");
const readingPreview = document.querySelector("#reading-preview");
const unlockButton = document.querySelector("#unlock-button");
const paymentPanel = document.querySelector("#payment-panel");
const paymentAddress = "ecash:qq7qn90ev23ecastqmn8as00u8mcp4tzsspvt5dtlk";
const copyAddressButton = document.querySelector("#copy-address-button");
const copyAddressStatus = document.querySelector("#copy-address-status");
const paymentTxidInput = document.querySelector("#payment-txid");
const paymentConfirmButton = document.querySelector("#payment-confirm-button");
const fullReadingBlock = document.querySelector("#full-reading-block");
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

function hideFullReading() {
  paymentPanel.hidden = true;
  copyAddressStatus.textContent = "";
  paymentTxidInput.value = "";
  fullReadingBlock.hidden = true;
  unlockButton.hidden = false;
}

async function copyPaymentAddress() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(paymentAddress);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = paymentAddress;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  copyAddressStatus.textContent = "Dirección copiada.";
}

unlockButton.addEventListener("click", () => {
  paymentPanel.hidden = false;
  unlockButton.hidden = true;
});

copyAddressButton.addEventListener("click", () => {
  copyPaymentAddress().catch(() => {
    copyAddressStatus.textContent = "No se pudo copiar la dirección.";
  });
});

paymentConfirmButton.addEventListener("click", () => {
  const txid = paymentTxidInput.value.trim();

  setStatus(txid ? "Pago reportado. TXID recibido." : "Pago reportado para revisión manual.");
  fullReadingBlock.hidden = false;
  paymentPanel.hidden = true;
});

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
    hideFullReading();
    resultPanel.hidden = false;
    setStatus("");
  } catch (error) {
    resultPanel.hidden = true;
    setStatus(error instanceof Error ? error.message : "Ocurrio un error inesperado.", true);
  } finally {
    submitButton.disabled = false;
  }
});
