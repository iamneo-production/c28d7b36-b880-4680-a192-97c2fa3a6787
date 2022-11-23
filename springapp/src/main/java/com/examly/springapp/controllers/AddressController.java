package com.examly.springapp.controllers;

import javax.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.models.Address;
import com.examly.springapp.services.AddressService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/address")
public class AddressController {
    
    @Autowired private AddressService addService;

    @PostMapping(value = "/apply", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Address> saveAddress(@Valid @RequestBody Address app){
        //System.out.println("yes");
        return new ResponseEntity<>(addService.saveAddress(app), HttpStatus.OK);
    }

    @GetMapping(value= "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Address>> fetchAddressList(){
        List<Address> address = addService.fetchAddressList();
        if(address.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(addService.fetchAddressList(), HttpStatus.OK);
    }

    @GetMapping(value= "/list/app/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Address> getAddressByApplications(@PathVariable("id") Long appId) {
        Address address = addService.findByApplication_Id(appId);
		return new ResponseEntity<>(address, HttpStatus.OK);
	}
}
