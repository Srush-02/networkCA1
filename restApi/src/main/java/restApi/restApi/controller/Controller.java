package restApi.restApi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
public class Controller {
	
	@GetMapping("/")
	public String getData() {
		return "Testing AWS EC2 file";
	}
	



public class PatientController {

    @GetMapping("/patients")
    public ResponseEntity<Response> getAllPatients() {
        List<Patient> patientList = Arrays.asList(
            new Patient("John Doe", "2025-07-01", "Complete", "1234567890", "john@example.com", "Blood Test", "2025-07-10"),
            new Patient("Jack Smith", "2025-06-26", "Pending", "7876543210", "jack@example.com", "X-Ray Test", "2025-07-08")
        );

        return new ResponseEntity<>(new Response("success", patientList, null), HttpStatus.OK);
    }
}

}
