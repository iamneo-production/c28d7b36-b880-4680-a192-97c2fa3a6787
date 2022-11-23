package com.examly.springapp.services;

import javax.transaction.Transactional;
import java.util.List;
import com.examly.springapp.models.Address;
import com.examly.springapp.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AddressServiceImpl implements AddressService{


    @Autowired
    private AddressRepository addRepo;

    @Override
    public Address saveAddress(Address address) {
        //System.out.println("yes");
        return addRepo.save(address);
    }

    @Override
    public List<Address> fetchAddressList() {
        
        return (List<Address>)addRepo.findAll();
    }

    @Override
    public Address findByApplication_Id(Long appId) {
        
        return (Address)addRepo.findByApplication_Id(appId);
    }
    
}