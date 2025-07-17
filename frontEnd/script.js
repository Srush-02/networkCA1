//const API_BASE_URL = 'http://localhost:3000/patient'; 
//const GETAPI_BASE_URL = `http://3.249.95.125:8082/api/v1/patients`;
const API_BASE_URL = `http://34.242.106.146:8082/api/v1/patients`;

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
      <td>${patient.status || ''}</td> 
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
  const selectedStatus = document.querySelector('input[name="status"]:checked');
  const statusValue = selectedStatus ? selectedStatus.value : null;
  const mobile = document.getElementById('mobileNumber').value;
  const email = document.getElementById('email').value.toLowerCase();
  const testName = document.getElementById('testName')

  const filtered = allData.filter(item => {

   const itemDate = new Date(item.date);
    const matchName = !name ||(item.first_name && item.first_name.toLowerCase().includes(name));

   const matchDateFrom = !dateFrom || new Date(dateFrom) <= itemDate;
    const matchDateTo = !dateTo || itemDate <= new Date(dateTo);
    const matchStatus = !statusValue || item.status === statusValue;
    const matchMobile = !mobile || item.phone_number.includes(mobile);
    const matchEmail = !email || item.patient_email.toLowerCase().includes(email);
    const matchTestName = !testName || item.test_name.toLowerCase().includes(testName);

    return matchName && matchDateFrom && matchDateTo && matchStatus && matchMobile && matchEmail && matchTestName;
  });

  renderTable(filtered);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  applyFilters();
});

const clearFilterForm = document.getElementById("clearBtn")

clearFilterForm.addEventListener('click', () => {
    const name = document.getElementById('first_name').value.toLowerCase();
    const fromDateId = document.getElementById('dateFrom').value;
  const toDateID = document.getElementById('dateTo').value;
  const mobileId = document.getElementById('mobileNumber').value;
  const emailId = document.getElementById('email').value.toLowerCase();
  const testNameID = document.getElementById('testName')
  name.value = '';
  fromDateId.value = '';
  toDateID.value = '';
  statusValue.value = '',
  mobileId.value = '';
  emailId.value = '';
  testNameID.value = '';
  const statusRadios = document.querySelectorAll('input[name="status"]');
  statusRadios.forEach(radio => radio.checked = false);
  applyFilters()
});

  window.addEventListener('DOMContentLoaded', () => {
    fetch(API_BASE_URL)
    
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

