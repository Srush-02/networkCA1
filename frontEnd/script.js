const API_BASE_URL = 'http://localhost:3000/patient'; 

let allData = [];

const tableBody = document.getElementById('dataTable').querySelector('tbody');
const form = document.getElementById('filterForm');

function renderTable(dataToRender) {
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
      <td>
        <button onclick="editPatient(${patient.phone_number})">Edit</button>
        <button onclick="deletePatient(${patient.phone_number})">Delete</button>
      </td>
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



window.editPatient = function(phone_number) {
  const patient = allData.find(p => p.phone_number === phone_number);
  console.log("check edit--", patient)
  if (!patient) return;

  const newFirstName = prompt('Enter first name:', patient.first_name);
const newLastName = prompt('Enter last name:', patient.last_name);
const newGender = prompt('Enter gender:', patient.gender);
const newDob = prompt('Enter date of birth (YYYY-MM-DD):', patient.date_of_birth);
const newEmail = prompt('Enter email:', patient.patient_email);

  // const newName = prompt('Enter new name:', patient.name);
  // const newDate = prompt('Enter new date (YYYY-MM-DD):', patient.date);
  // const newStatus = prompt('Enter status (Complete/Pending):', patient.status);
  // const newMobile = prompt('Enter mobile:', patient.mobile);

  const updatedPatient = {
    ...patient,
  first_name: newFirstName,
  last_name: newLastName,
  gender: newGender,
  date_of_birth: newDob,
    
    // name: newName,
    // date: newDate,
    // status: newStatus,
    // mobile: newMobile,
    // email: newEmail
  };

  fetch(`${API_BASE_URL}/updatePatient`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedPatient)
  })
  .then(response => {
    if (!response.ok) throw new Error('Update failed');
    return response.json();
  })
  .then(() => {
    const index = allData.findIndex(p => p.phone_number === phone_number);
    allData[index] = updatedPatient;
    applyFilters();
  })
  .catch(err => alert('Error updating patient: ' + err.message));
};


window.deletePatient = function(id) {
  if (!confirm('Are you sure you want to delete this patient?')) return;

  fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error('Delete failed');
    allData = allData.filter(p => p.id !== id);
    applyFilters();
  })
  .catch(err => alert('Error deleting patient: ' + err.message));
};

const addPatientBtn = document.getElementById('addPatientBtn');
const patientModal = document.getElementById('patientModal');
const addPatientForm = document.getElementById('addPatientForm');
const cancelBtn = document.getElementById('cancelBtn');

addPatientBtn.addEventListener('click', () => {
  patientModal.style.display = 'block';
  addPatientBtn.style.display = 'none'
});

cancelBtn.addEventListener('click', () => {
  patientModal.style.display = 'none';
  addPatientBtn.style.display = 'block'
  addPatientForm.reset();
});

addPatientForm.addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('chirag')

    const firstName = document.getElementById('newFirstName').value.trim();
    const lastName = document.getElementById('newLastName').value.trim();
    const gender = document.getElementById('newGender').value.trim();
    const dob = document.getElementById('newDob').value;
    const phoneNumber = document.getElementById('newPhoneNumber').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const testName = document.getElementById('newTestName').value.trim();
    const appointmentDate = document.getElementById('newAppointmentDate').value;
    const status = document.getElementById('newStatus').value;

    document.querySelectorAll('.form-group input').forEach(input => {
      input.style.borderColor = '';
    });

    let hasError = false;

    if(!firstName || !lastName || !gender || !dob || !phoneNumber || !email || !testName || !appointmentDate || !status){
      hasError = true
    }

    if (hasError) {
      alert('Please fill in all required fields');
      return;
    }

    const payload = {
      firstName,
      lastName,
      gender,
      dob,
      phoneNumber,
      email,
      testName,
      appointmentDate,
      status,
    };

    console.log('Submitting data:', payload);

    // Example API request
    fetch('https://your-api-url.com/add-patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        console.log('API Success:', data);
        alert('Patient added successfully!');
        addPatientForm.reset();
      })
      .catch(err => {
        console.error('API Error:', err);
        alert('Failed to add patient.');
      });
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

