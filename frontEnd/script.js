const API_BASE_URL = 'http://localhost:3000/patient'; 
const GETAPI_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8082/api/v1/patients`;
let allData = [];

const tableBody = document.getElementById('dataTable').querySelector('tbody');
const form = document.getElementById('filterForm');

function renderTable(dataToRender) {
      console.log("data-----------"+dataToRender)

  tableBody.innerHTML = '';

  if (dataToRender.length === 0) {
    console.log("data-----------"+dataToRender)
    tableBody.innerHTML = '<tr><td colspan="6">No records found</td></tr>';
    return;
  }

  dataToRender.forEach(patient => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${patient.first_name}</td>
     <td>${patient.date_of_birth || ''}</td>
      <td>${patient.gender || ''}</td>
      <td>${patient.phone_number}</td>
      <td>${patient.patient_email }</td>
      <td>${patient.test_name || ''}</td>
      <td>${patient.appointment_date || ''}</td>
    `;
    tableBody.appendChild(row);
  });
}

function applyFilters() {
  console.log("check applyfilter");
  const name = document.getElementById('first_name').value.toLowerCase();
    console.log("check applyfilter2");

  const dateFrom = document.getElementById('dateFrom').value;
  const dateTo = document.getElementById('dateTo').value;
  const statusComplete = document.getElementById('statusComplete').checked;
  const statusPending = document.getElementById('statusPending').checked;
  const mobile = document.getElementById('mobileNumber').value;
  const email = document.getElementById('email').value.toLowerCase();

  const filtered = allData.filter(item => {

   const itemDate = new Date(item.date);
   // const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();

    const matchName = !name ||(item.first_name && item.first_name.toLowerCase().includes(name));

   const matchDateFrom = !dateFrom || new Date(dateFrom) <= itemDate;
    const matchDateTo = !dateTo || itemDate <= new Date(dateTo);
    const matchStatus = (!statusComplete && !statusPending) ||
      (statusComplete && item.status === 'Complete') ||
      (statusPending && item.status === 'Pending');
    const matchMobile = !mobile || item.phone_number.includes(mobile);
    const matchEmail = !email || item.patient_email.toLowerCase().includes(email);

    return matchName && matchDateFrom && matchDateTo && matchStatus && matchMobile && matchEmail;
  });

  renderTable(filtered);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  applyFilters();
});


  window.addEventListener('DOMContentLoaded', () => {
    fetch(GETAPI_BASE_URL)
      .then(res => res.json())
      .then(data => {
        allData = data;
        renderTable(allData);
      })
      .catch(err => {
        console.error('Fetch failed:', err);
        tableBody.innerHTML = '<tr><td colspan="6">Failed to load data</td></tr>';
      });
  });

