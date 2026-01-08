function saveAttendance() {
  const percentage = (attended.value / total.value) * 100;

  fetch("http://localhost:3000/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: sid.value,
      subject: subject.value,
      percentage
    })
  }).then(() => {
    result.innerText =
      `Subject: ${subject.value}\nAttendance: ${percentage.toFixed(2)}%`;
  });
}
