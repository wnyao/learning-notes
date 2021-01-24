export const generateZipBlob = async (data, filename) => {
  const JSZip = require("jszip");
  const zip = new JSZip();
  zip.file(filename, data);
  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
};

export const jsonToCSV = (data) => {
  const papa = require("papaparse");
  const csv = papa.unparse(data);
  return csv;
};

export const getBlobURL = (data, filename) => {
  let url = null;
  if (!navigator || !navigator.msSaveBlob) {
    url = window.URL.createObjectURL(data);
    return url;
  }

  url = navigator.msSaveBlob(data, filename);
  return url;
};

export const hyperlinkDownload = (url, filename) => {
  let hyperlink = document.createElement("a");
  hyperlink.href = url;
  hyperlink.setAttribute("download", filename || "");
  hyperlink.setAttribute("target", "_blank");
  hyperlink.onclick = (e) => e.stopPropagation();
  hyperlink.click();
};

const downloadCSV = async (data) => {
  const csvData = jsonToCSV(data);
  const date = moment().format("DD-MM-YYYY_HH-MM-SS");
  const filename = `thkmc_booking_and_queues_${date}`;
  const blob = await generateZipBlob(csvData, `${filename}.csv`);
  const url = getBlobURL(blob, filename);
  hyperlinkDownload(url);
};

downloadCSV([
  { a: 1, b: 1 },
  { a: 2, b: 2 },
  { a: 3, b: 3 },
  { a: 4, b: 4 },
]);
