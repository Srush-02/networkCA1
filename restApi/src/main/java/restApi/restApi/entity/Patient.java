package restApi.restApi.entity;

public class Patient {
    private String first_name;
    private String date_of_birth;
    private String gender; 
	 private String status;
    private String phone_number;
    private String patient_email;
    private String test_name;
    private String appointment_date;

    public Patient(String first_name, String date_of_birth, String gender, String phone_number, 
                   String patient_email, String test_name, String appointment_date, String status) {
        this.first_name = first_name;
        this.date_of_birth = date_of_birth;
        this.gender = gender;
        this.phone_number = phone_number;
        this.patient_email = patient_email;
        this.test_name = test_name;
        this.appointment_date = appointment_date;
		this.status = status;
    }

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getDate_of_birth() {
		return date_of_birth;
	}

	public void setDate_of_birth(String date_of_birth) {
		this.date_of_birth = date_of_birth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getPatient_email() {
		return patient_email;
	}

	public void setPatient_email(String patient_email) {
		this.patient_email = patient_email;
	}

	public String getTest_name() {
		return test_name;
	}

	public void setTest_name(String test_name) {
		this.test_name = test_name;
	}

	public String getAppointment_date() {
		return appointment_date;
	}

	public void setAppointment_date(String appointment_date) {
		this.appointment_date = appointment_date;
	}
    

	public String getstatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    

}
