/**
 * Filereader Old and New way
 * Source; https://www.youtube.com/watch?v=te3Zm4bHBVs&t=113s
 */

// OLD WAY
function onFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const buffer = reader.result;
  };

  reader.onerror = function(e) {
    //...
  };

  // READ AS BUFFER
  reader.readAsArrayBuffer(file.result);
}

function onFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const text = reader.result; // data
  };
  reader.onerror = function(error) {
    console.log("error: ", error);
  };

  // READ AS TEXT
  reader.readAsText(file, "UTF-8"); // told reader what to read and read as what
}

// NEW WAY - using ASYNC AWAIT
async function onFileUpload(event) {
  try {
    const blob = event.target.file[0];
    const buffer = await new Response(blob).arrayBuffer();
    //...
  } catch (error) {
    throw error;
  }
}
