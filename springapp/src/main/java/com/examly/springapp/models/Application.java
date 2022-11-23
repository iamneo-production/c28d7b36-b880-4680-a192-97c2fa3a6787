package com.examly.springapp.models;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String firstName;

    @NotBlank
    @Size(max = 20)
    private String lastName;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
  

    @NotBlank
    private String gender;

    @NotBlank
    @Size(max = 20)
    private String fatherName;

    @NotBlank
    @Size(max = 10)
    private String phoneNumber1;

    @NotBlank
    @Size(max = 10)
    private String phoneNumber2;

    @NotBlank
    //@Size(max = 10)
    private String aadharNumber;

    @NotBlank
    private String status;
    
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getPhoneNumber1() {
        return phoneNumber1;
    }

    public void setPhoneNumber1(String phoneNumber1) {
        this.phoneNumber1 = phoneNumber1;
    }

    public String getPhoneNumber2() {
        return phoneNumber2;
    }

    public void setPhoneNumber2(String phoneNumber2) {
        this.phoneNumber2 = phoneNumber2;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Application() {
    }

   public String getStatus() {
    return status;
    }

    public void setStatus(String status) {
    this.status = status;
    }

    public Application(Long id, @NotBlank @Size(max = 20) String firstName, @NotBlank @Size(max = 20) String lastName,
        @NotBlank @Size(max = 50) @Email String email, @NotBlank String gender,
        @NotBlank @Size(max = 20) String fatherName, @NotBlank @Size(max = 10) String phoneNumber1,
        @NotBlank @Size(max = 10) String phoneNumber2, @NotBlank String aadharNumber, @NotBlank String status,
        User user) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.fatherName = fatherName;
    this.phoneNumber1 = phoneNumber1;
    this.phoneNumber2 = phoneNumber2;
    this.aadharNumber = aadharNumber;
    this.status = status;
    this.user = user;
    }


    
}
