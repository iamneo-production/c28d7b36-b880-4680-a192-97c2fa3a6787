package com.examly.springapp.controllers;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.examly.springapp.payload.response.MessageResponse;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.models.Application;
import com.examly.springapp.services.ApplicationService;
import com.examly.springapp.repository.ApplicationRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/app")
public class ApplicationController {
    
    @Autowired private ApplicationService applicationService;
    @Autowired private ApplicationRepository appRepo;
    @PostMapping(value = "/apply", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> saveApplication(@Valid @RequestBody Application app){
        //System.out.println("yes");
        Application newApp = applicationService.saveApplication(app);
        //System.out.println(newApp.getId());
        return new ResponseEntity<>(newApp.getId(), HttpStatus.OK);
    }

    @GetMapping(value= "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Application>> fetchApplicationList(){
        List<Application> application = applicationService.fetchApplicationList();
        if(application.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(application, HttpStatus.OK);
    }

    @GetMapping(value= "/list/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getApplicationByUsers(@PathVariable("id") Long userId) {
        List<Application> application = applicationService.findByUser_Id(userId);
        if(application.isEmpty()){
            //System.out.println("null");
            throw new ResourceNotFoundException("No Application for user with ID = " + userId);
            //return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }
        //   .orElseThrow(() -> new ResourceNotFoundException("No Application for user with ID = "));
		return new ResponseEntity<>(application, HttpStatus.OK);
	}

    // @GetMapping(value= "/list/gen/{gender}", produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<List<Application>> getApplicationByGender(@PathVariable String gender) {
	// 	return new ResponseEntity<>(appRepo.findByGender(gender), HttpStatus.OK);
	// }

    @PutMapping(value = "/edit/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Application> updateApplication(@RequestBody Application application, @PathVariable("id") Long appId ) {
        return new ResponseEntity<>(applicationService.updateApplication(application, appId), HttpStatus.OK);
    }

    @PutMapping(value = "/edit/status/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Application> updateApplicationStatus(@RequestBody String status, @PathVariable("id") Long appId ) {
        return new ResponseEntity<>(applicationService.updateApplicationStatus(status, appId), HttpStatus.OK);
    }

    @GetMapping(value= "/fetch/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Optional<Application>> fetchApplicationById(@PathVariable("id") Long appId){
        Optional<Application> application = applicationService.fetchApplicationById(appId);
//            .orElseThrow(() -> new ResourceNotFoundException("No Application with ID = " + appId));
		return new ResponseEntity<>(application, HttpStatus.OK);
    }

    @GetMapping(value= "/test", produces = MediaType.TEXT_PLAIN_VALUE)
    public String testing(){
        return("yes");
    }
}
