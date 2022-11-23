package com.examly.springapp.repository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.examly.springapp.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{
    Address findByApplication_Id(Long appId);
}
