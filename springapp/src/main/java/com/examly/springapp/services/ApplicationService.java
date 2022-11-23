package com.examly.springapp.services;
import java.util.List;

import com.examly.springapp.models.Application;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public interface ApplicationService {
    
    Application saveApplication(Application application);
    List<Application> findByUser_Id(Long userId);
    List<Application> fetchApplicationList();
    Optional <Application> fetchApplicationById(Long appId);
    Application updateApplication(Application application, Long appId);
    Application updateApplicationStatus(String status, Long appId);
}
