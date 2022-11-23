package com.examly.springapp.services;

import com.examly.springapp.models.EmailDetails;
 

public interface EmailService {
 
    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

}