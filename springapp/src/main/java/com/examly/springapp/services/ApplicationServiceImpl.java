package com.examly.springapp.services;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import com.examly.springapp.models.Application;
import com.examly.springapp.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService{


    @Autowired
    private ApplicationRepository appRepo;

    @Override
    public Application saveApplication(Application application) {
        //System.out.println("yes");
        Application newApp = appRepo.save(application);
        //System.out.println(newApp.getId());
        return newApp;
    }

    @Override
    public List<Application> fetchApplicationList() {
        
        return (List<Application>)appRepo.findAll();
    }

    @Override
    public List<Application> findByUser_Id(Long userId) {
        // TODO Auto-generated method stub
        return (List<Application>)appRepo.findByUser_Id(userId);
    }

    @Override
    public Application updateApplication(Application application, Long appId) {
        Application appDB = appRepo.findById(appId).get();

        if (Objects.nonNull(application.getFirstName())
            && !"".equalsIgnoreCase(
                application.getFirstName())) {
            appDB.setFirstName(
                application.getFirstName());
        }
        if (Objects.nonNull(application.getLastName())
            && !"".equalsIgnoreCase(
                application.getLastName())) {
            appDB.setLastName(
                application.getLastName());
        }
        if (Objects.nonNull(application.getEmail())
            && !"".equalsIgnoreCase(
                application.getEmail())) {
            appDB.setEmail(
                application.getEmail());
        }
        if (Objects.nonNull(application.getGender())
            && !"".equalsIgnoreCase(
                application.getGender())) {
            appDB.setGender(
                application.getGender());
        }
        if (Objects.nonNull(application.getFatherName())
            && !"".equalsIgnoreCase(
                application.getFatherName())) {
            appDB.setFatherName(
                application.getFatherName());
        }
        if (Objects.nonNull(application.getPhoneNumber1())
            && !"".equalsIgnoreCase(
                application.getPhoneNumber1())) {
            appDB.setPhoneNumber1(
                application.getPhoneNumber1());
        }
        if (Objects.nonNull(application.getPhoneNumber2())
            && !"".equalsIgnoreCase(
                application.getPhoneNumber2())) {
            appDB.setPhoneNumber2(
                application.getPhoneNumber2());
        }
        if (Objects.nonNull(application.getAadharNumber())
            && !"".equalsIgnoreCase(
                application.getAadharNumber())) {
            appDB.setAadharNumber(
                application.getAadharNumber());
        }
        if (Objects.nonNull(application.getStatus())
            && !"".equalsIgnoreCase(
                application.getStatus())) {
            appDB.setStatus(
                application.getStatus());
        }

        return appRepo.save(appDB);
    }

    @Override
    public Application updateApplicationStatus(String status, Long appId) {
        Application appDB = appRepo.findById(appId).get();
        //System.out.println(appDB.getStatus());
        String s1 = "APPROVED";
        if (Objects.nonNull(status) && !"".equalsIgnoreCase(status) && !s1.equals(appDB.getStatus())) {
            appDB.setStatus(status);
        }


        return appRepo.save(appDB);
    }

    @Override
    public Optional<Application> fetchApplicationById(Long appId){
        return appRepo.findById(appId);
    }
    
}
