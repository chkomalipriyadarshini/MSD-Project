const fileInput = document.getElementById('fileInput');
const extractBtn = document.getElementById('extractBtn');
const assignmentText = document.getElementById('assignmentText');
const plagiarismBtn = document.getElementById('plagiarismBtn');
const qualityBtn = document.getElementById('qualityBtn');
const plagiarismResult = document.getElementById('plagiarismResult');
const qualityResult = document.getElementById('qualityResult');

// Extract text from file
extractBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file first.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    assignmentText.value = e.target.result;
  };

  reader.onerror = function(err) {
    console.error('File reading error:', err);
    alert('Failed to read file.');
  };

  reader.readAsText(file);
});

// Simulate Plagiarism Check
plagiarismBtn.addEventListener('click', () => {
  const text = assignmentText.value.trim();
  if (!text) {
    alert('Please extract the assignment text first.');
    return;
  }

  // Simulated result (in real case, send to backend)
  const fakePlagiarismScore = (Math.random() * 100).toFixed(2);
  plagiarismResult.innerText = `Plagiarism Score: ${fakePlagiarismScore}%`;
});

// Simulate Quality Check
qualityBtn.addEventListener('click', () => {
  const text = assignmentText.value.trim();
  if (!text) {
    alert('Please extract the assignment text first.');
    return;
  }

  // Simulated result (in real case, send to backend)
  const fakeQualityScore = (Math.random() * 10).toFixed(1);
  qualityResult.innerText = `Quality Score (out of 10): ${fakeQualityScore}`;
});
