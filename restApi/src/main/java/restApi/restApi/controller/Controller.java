package restApi.restApi.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import restApi.restApi.entity.Patient;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class Controller {
	@GetMapping("/")
	public String getData() {
		return "Testing AWS EC2 file";
	}
	

    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
    	return Arrays.asList(
                new Patient("John Doe", "2025-07-01", "Complete", "1234567890", "john@example.com", "Blood Test", "2025-07-10"),
                new Patient("Jack", "2025-06-26", "Pending", "9251478200", "jack@example.com", "X-Ray Test", "2025-07-08")
            );
    }


}
