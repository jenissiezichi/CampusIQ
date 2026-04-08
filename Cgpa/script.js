let data = loadData();
let popUpTimerId = null;

function loadData() {
 const raw = localStorage.getItem("storage");
 if (!raw) {
  return { semesters: [], activeSemesterId: null };
 }

 try {
  const parsed = JSON.parse(raw);

  if (parsed && Array.isArray(parsed.semesters)) {
   return {
    semesters: parsed.semesters,
    activeSemesterId: parsed.activeSemesterId ?? null
   };
  }



  if (parsed && Array.isArray(parsed.semester)) {
   return {
    semesters: parsed.semester.map(s => ({
     id: s.id,
     name: s.name,
     courses: Array.isArray(s.course) ? s.course : []
    })),
    activeSemesterId: parsed.activeId ?? null
   };
  }
 } catch (e) {
  // ignore and fall back to default
 }

 return { semesters: [], activeSemesterId: null };
}

function save() {
 localStorage.setItem("storage", JSON.stringify(data));
}

function ensureDefaultSemester() {
 if (!Array.isArray(data.semesters)) data.semesters = [];
 // If no semesters exist, create a default one
 if (data.semesters.length === 0) {
  data.semesters.push({ id: Date.now(), name: "Semester 1", courses: [] });
 }
 // If activeSemesterId is missing/invalid, point it to the first semester
 if (!data.activeSemesterId || !data.semesters.some(s => s.id === data.activeSemesterId)) {
  data.activeSemesterId = data.semesters[0].id;
 }
}

function active() {
 return data.semesters.find(s => s.id === data.activeSemesterId) || data.semesters[0];
}

function calcTotals(courses) {
 let qp = 0;
 let totalUnits = 0;
 for (let i = 0; i < courses.length; i++) {
  qp += courses[i].unit * courses[i].grade;
  totalUnits += courses[i].unit;
 }
 return { qp, totalUnits };
}

function calcGpaFromTotals(totals) {
 if (!totals || totals.totalUnits <= 0) return null;
 return totals.qp / totals.totalUnits;
}

function calcOverallTotals() {
 let qp = 0;
 let totalUnits = 0;
 for (const sem of data.semesters) {
  const courses = Array.isArray(sem.courses) ? sem.courses : [];
  const totals = calcTotals(courses);
  qp += totals.qp;
  totalUnits += totals.totalUnits;
 }
 return { qp, totalUnits };
}

function render() {
 renderSemTabs();
 renderActiveSemester();
 renderSummary();
}

function selectSemester(id) {
 data.activeSemesterId = id;
 save();
 render();
}

function addSemester(name) {
 if (!name) {
  name = prompt("Enter Semester name", "");
 }
 name = (name || "").trim();
 if (!name) {
  name = `Semester ${data.semesters.length + 1}`;
 }

 const sem = { id: Date.now(), name, courses: [] };
 data.semesters.push(sem);
 data.activeSemesterId = sem.id;
 save();
 render();
 popUp(`${name} created ✔️`);
}

function renameActiveSemester() {
 const sem = active();
 if (!sem) return;
 let name = prompt("Rename Semester", sem.name);
 if (name == null) return;
 name = name.trim();
 if (!name) return;
 sem.name = name;
 save();
 render();
 popUp("Renamed ✔️");
}

function deleteActiveSemester() {
 if (data.semesters.length <= 1) {
  popUp("You must have at least 1 semester");
  return;
 }
 const sem = active();
 if (!sem) return;
 if (!confirm(`Delete ${sem.name}?`)) return;

 const idx = data.semesters.findIndex(s => s.id === sem.id);
 if (idx >= 0) data.semesters.splice(idx, 1);

 // choose next active
 const next = data.semesters[Math.max(0, idx - 1)] || data.semesters[0];
 data.activeSemesterId = next ? next.id : null;
 ensureDefaultSemester();
 save();
 render();
 popUp("Semester deleted ✔️");
}

function renderSemTabs() {
 const host = document.getElementById('semTabs');
 if (!host) return;
 host.innerHTML = '';

 const activeId = data.activeSemesterId;
 for (const sem of data.semesters) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = sem.name;
  btn.className = (sem.id === activeId)
   ? 'bg-green-700 text-white text-xs font-semibold px-3 py-2 rounded-lg'
   : 'bg-white text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg border hover:bg-gray-50';
  btn.addEventListener('click', () => selectSemester(sem.id));
  host.appendChild(btn);
 }
}

function renderActiveSemester() {
 const sem = active();
 const title = document.getElementById('semTitle');
 if (title) title.textContent = sem ? sem.name : 'Semester';

 const semGpaEl = document.getElementById('semGpa');
 if (semGpaEl) {
  if (!sem) {
   semGpaEl.textContent = '—';
  } else {
   const totals = calcTotals(sem.courses || []);
   const gpa = calcGpaFromTotals(totals);
   semGpaEl.textContent = gpa == null ? '—' : `GPA ${gpa.toFixed(2)}`;
  }
 }

 renderCourses();
}

function renderCourses() {
 const tbody = document.getElementById("courseList");

 const sem = active();
 const courses = sem && Array.isArray(sem.courses) ? sem.courses : [];

 if (courses.length === 0) {
  tbody.innerHTML = '<tr><td colspan="5" class="text-gray-600">No courses yet</td></tr>';
  return;
 }

 let rows = '';
 for (let i = 0; i < courses.length; i++) {
  let c = courses[i];
  rows += '<tr>'
      +   '<td class="text-gray-700 ">' + c.name + '</td>'
      +   '<td class="text-gray-700">' + c.unit + '</td>'
      +   '<td class="text-gray-700 ">' + c.grade + '</td>'
      +   '<td class="text-gray-700">' + (c.unit * c.grade) + '</td>'
      +   '<td  class="text-red-700 font-bold"><button class="cursor-pointer" onclick="deleteCourse(' + i + ')">x</button></td>'
      + '</tr>';
 }

 tbody.innerHTML = rows;

}
function deleteCourse(index){
 const sem = active();
 if (!sem || !Array.isArray(sem.courses)) return;
 sem.courses.splice(index, 1);
 save();
 renderCourses();
 renderSummary();
 popUp('Course Removed✔️');
}
function addCourse() {
 const n = document.getElementById("name");
 const u = document.getElementById("unit");
 const g = document.getElementById("grade");

 const cName = n.value.trim().toUpperCase();
 const unit  = Number(u.value);
 const grade = Number(g.value);

 if (!cName) {
  popUp('Enter a Course Please');
  return;
 }

 if (!Number.isFinite(unit) || !Number.isInteger(unit) || unit < 1) {
  popUp('Enter a Unit Please');
  return;
 }

 if (unit > 6) {
  popUp('The Maximum Unit per Course is 6');
  return;
 }

 if (!Number.isFinite(grade) || !Number.isInteger(grade) || grade < 0 || grade > 5) {
  popUp('Select a valid Grade');
  return;
 }

 const sem = active();
 if (!sem) {
  popUp('No semester selected');
  return;
 }
 if (!Array.isArray(sem.courses)) sem.courses = [];
 sem.courses.push({ name: cName, unit, grade });
 n.value = '';
 u.value = '';
 // reset grade to default (A)
 g.value = '5';

 save();

 renderCourses();
 renderSummary();
 popUp(cName + ' Added ✔️');
}

function popUp(msg) {
 const pop = document.getElementById('popUp');
 pop.textContent = msg;
 pop.classList.remove('opacity-0');
 pop.classList.add('opacity-100');

 if (popUpTimerId) clearTimeout(popUpTimerId);
 popUpTimerId = setTimeout(() => {
  pop.classList.remove('opacity-100');
  pop.classList.add('opacity-0');
 }, 2000);
}
function clearAll() {
 if (!confirm('Delete ALL data?')) return;
 // Wipe everything (all semesters + courses)
 data.semesters = [];
 data.activeSemesterId = null;
 ensureDefaultSemester();
 save();
 render();

 popUp('Cleared!');
}

function renderSummary() {
 const totals = calcOverallTotals();
 const cgpa = calcGpaFromTotals(totals);

 document.getElementById('cgpa').textContent = cgpa == null ? '—' : cgpa.toFixed(2);
 document.getElementById('totalUnits').textContent = totals.totalUnits;
 document.getElementById('position').textContent = classDegree(cgpa == null ? NaN : cgpa);
}

function classDegree(cgpa){
 if (!Number.isFinite(cgpa)) return '-';
 if(cgpa>= 4.5 )
  return 'First Class';
 if(cgpa>=4.0 )
  return 'Second Class Upper';
 if(cgpa>=3.5)
  return 'Second Class Lower';
 if(cgpa>=2.5)
  return 'Third Class';
 if(cgpa<2.5)
  return'Pass';
 return '-'
}

// Wire up semester buttons (if present)
document.getElementById('addSemBtn')?.addEventListener('click', () => addSemester());
document.getElementById('renameSemBtn')?.addEventListener('click', () => renameActiveSemester());
document.getElementById('deleteSemBtn')?.addEventListener('click', () => deleteActiveSemester());

ensureDefaultSemester();
save();
render();

