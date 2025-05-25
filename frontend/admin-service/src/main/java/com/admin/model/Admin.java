package com.admin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Admin {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long adminId;

	    @Column(nullable = false,unique=true)
    private String email;
	    @Column(nullable=false)
    private String password;

   

	// Constructors, getters, setters
    public Admin() {}

    
    public Admin(Long adminId, String email, String password) {
		super();
		this.adminId = adminId;
		this.email = email;
		this.password = password;
	}

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", email=" + email + ", password=" + password + "]";
	}
    
}