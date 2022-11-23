package com.examly.springapp.services;
import java.util.List;

import com.examly.springapp.models.Address;

import org.springframework.stereotype.Service;

@Service
public interface AddressService {
    
    Address saveAddress(Address address);
    Address findByApplication_Id(Long appId);
    List<Address> fetchAddressList();
}