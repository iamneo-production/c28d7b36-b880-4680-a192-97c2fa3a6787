package com.examly.springapp.repository;
import java.util.List;
import com.examly.springapp.models.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.models.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long>{

    //List<Application> findByUserId(Object userI);
    List<Application> findByUser_Id(Long userId);
    List<Application> findByGender(String gender);
}
