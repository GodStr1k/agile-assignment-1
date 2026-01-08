function saveCGPA() {
  fetch("http://localhost:3000/cgpa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: sid.value,
      cgpa: cgpa.value
    })
  });

  alert("CGPA Saved");
}
