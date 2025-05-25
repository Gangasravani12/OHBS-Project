package com.admin.service;

import java.util.List;

import com.admin.model.Admin;
import com.admin.model.Booking;
import com.admin.model.Customer;
import com.admin.model.Hotel;
import com.admin.model.Manager;
import com.admin.model.Room;
import com.admin.model.Transcation;

public interface AdminService {
	boolean login(String email, String password);
    Admin addAdmin(Admin admin);
    void deleteAdminById(int id);
    Admin updateAdmin(int id, String email, String password);
    List<Admin> getAllAdmins();
    
    //customer service
    
    List<Customer> getAllCustomers();
    void deleteCustomerByEmail(String customerEmail);

    List<Manager> getAllManagers();
    void deleteManagerByEmail(String managerEmail);

    List<Hotel> getAllHotels();
    List<Room> getAllRooms();
    List<Transcation> getAllTransactions();
    List<Booking> getAllBookings();
}
