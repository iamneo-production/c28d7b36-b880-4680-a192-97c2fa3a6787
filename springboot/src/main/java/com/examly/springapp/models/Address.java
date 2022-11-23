package com.examly.springapp.models;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String type;

    @NotBlank
    private String houseNo;

    @NotBlank
    private String streetName;

    @NotBlank
    private String areaName;

    @NotBlank
    private String pincode;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "app_id")
    private Application application;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Address() {
    }

    public Address(Integer id, @NotBlank String type, @NotBlank String houseNo, @NotBlank String streetName,
            @NotBlank String areaName, @NotBlank String pincode, @NotBlank String city, @NotBlank String state,
            Application application) {
        this.id = id;
        this.type = type;
        this.houseNo = houseNo;
        this.streetName = streetName;
        this.areaName = areaName;
        this.pincode = pincode;
        this.city = city;
        this.state = state;
        this.application = application;
    }

    
}
