function load() {
  fetch("http://localhost:3000/dashboard/" + id.value)
    .then(res => res.json())
    .then(d => {
      let text = "ATTENDANCE:\n";
      d.attendance.forEach(a => {
        text += `${a.subject}: ${a.percentage}%\n`;
      });

      text += `\nCGPA: ${d.cgpa}\nTotal Credits: ${d.credits}`;
      data.innerText = text;
    });
}
