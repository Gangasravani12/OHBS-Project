package com.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.feign.CustomerClient;
import com.admin.feign.ManagerClient;
import com.admin.model.Admin;
import com.admin.model.Booking;
import com.admin.model.Customer;
import com.admin.model.Hotel;
import com.admin.model.Manager;
import com.admin.model.Room;
import com.admin.model.Transcation;
import com.admin.repo.AdminRepo;

@Service
public class AdminserviceImp implements AdminService {

	@Autowired
	private AdminRepo adminRepo;


    @Autowired
    private CustomerClient customerClient;

    @Autowired
    private ManagerClient managerClient;

    @Override
	public Admin addAdmin(Admin admin) {
	    return adminRepo.save(admin); // ✅ Stores in DB now
	}

	@Override
	public boolean login(String email, String password) {
	    Admin admin = adminRepo.findByEmailAndPassword(email, password);
	    return admin != null;
	}

	@Override
	public void deleteAdminById(int id) {
	    adminRepo.deleteById((long) id);
	}

	@Override
	public Admin updateAdmin(int id, String email, String password) {
	    Optional<Admin> optionalAdmin = adminRepo.findById((long) id);
	    if (optionalAdmin.isPresent()) {
	        Admin admin = optionalAdmin.get();
	        admin.setEmail(email);
	        admin.setPassword(password);
	        return adminRepo.save(admin);
	    }
	    return null;
	}

	@Override
	public List<Admin> getAllAdmins() {
	    return adminRepo.findAll();
	}

    // Customer Delegation
    @Override
    public List<Customer> getAllCustomers() {
        return customerClient.getAllCustomers();
    }

    @Override
    public void deleteCustomerByEmail(String customerEmail) {
        customerClient.deleteCustomer(customerEmail);
    }

    // Manager Delegation
    @Override
    public List<Manager> getAllManagers() {
        return managerClient.getAllManagers();
    }

    @Override
    public void deleteManagerByEmail(String managerEmail) {
        managerClient.deleteManager(managerEmail);
    }

    @Override
    public List<Hotel> getAllHotels() {
        return managerClient.getAllHotels();
    }

    @Override
    public List<Room> getAllRooms() {
        return managerClient.getAllRooms();
    }

    @Override
    public List<Transcation> getAllTransactions() {
        return customerClient.getAllTransactions();
    }

    @Override
    public List<Booking> getAllBookings() {
        return customerClient.getAllBookings();
    }
}
