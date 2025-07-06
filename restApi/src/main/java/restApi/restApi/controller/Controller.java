package restApi.restApi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class Controller {
	
	@GetMapping("/")
	public String getData() {
		return "Testing AWS EC2 file";
	}
}
