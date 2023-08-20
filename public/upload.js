function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById('status').innerText = 'File uploaded successfully!';
    } else {
      document.getElementById('status').innerText = 'Failed to upload file.';
    }
  };

  xhr.send(formData);
}

