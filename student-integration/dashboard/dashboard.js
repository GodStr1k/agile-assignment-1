function load() {
  fetch("http://localhost:3000/dashboard/" + id.value)
    .then(res => res.json())
    .then(data => {
      out.innerText =
        "Attendance: " + data.attendance + "%\n" +
        "CGPA: " + data.cgpa;
    });
}
