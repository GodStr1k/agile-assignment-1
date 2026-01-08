function saveCGPA() {
  fetch("http://localhost:3000/cgpa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: sid.value,
      credits: credits.value,
      gpa: gpa.value
    })
  })
  .then(res => res.json())
  .then(data => {
    out.innerText =
      `Total Credits: ${data.totalCredits}\nCGPA: ${data.cgpa.toFixed(2)}`;
  });
}
