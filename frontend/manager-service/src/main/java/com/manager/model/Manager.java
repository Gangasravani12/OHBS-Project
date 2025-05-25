package com.manager.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Manager {
	    
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "manager_id")
	    private Long managerId;
    
    @Column(nullable = false, unique = true)
    @Email(message = "Email should be valid")
    private String managerEmail;

    @Column(nullable = false)
    @NotBlank(message = "Password is required")
    private String password;

    @Column(nullable = false)
    @NotBlank(message = "Name is required")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @Column(nullable = false)
    @NotBlank(message = "Working hotel name is required")
    private String workingHotelName;

    @Column(nullable = false)
    @Min(value = 24, message = "Age must be at least 24")
    private int age;

    @Column(nullable = false)
    @NotBlank(message = "Address is required")
    private String address;

    @Column(nullable = false)
    @NotBlank(message = "City is required")
    private String city;

    @Column(nullable = false)
    @NotBlank(message = "Country is required")
    private String country;

    @Column(nullable = false)
    @NotBlank(message = "Pincode is required")
    private String pincode;

    // Getters and Setters

    public String getManagerEmail() {
        return managerEmail;
    }

    public void setManagerEmail(String managerEmail) {
        this.managerEmail = managerEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getWorkingHotelName() {
        return workingHotelName;
    }

    public void setWorkingHotelName(String workingHotelName) {
        this.workingHotelName = workingHotelName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
    

	public Long getManagerId() {
		return managerId;
	}

	public void setManagerId(Long managerId) {
		this.managerId = managerId;
	}
	@Override
	public String toString() {
		return "Manager [managerId=" + managerId + ", managerEmail=" + managerEmail + ", password=" + password
				+ ", name=" + name + ", contactNumber=" + contactNumber + ", workingHotelName=" + workingHotelName
				+ ", age=" + age + ", address=" + address + ", city=" + city + ", country=" + country + ", pincode="
				+ pincode + "]";
	}
    
}
