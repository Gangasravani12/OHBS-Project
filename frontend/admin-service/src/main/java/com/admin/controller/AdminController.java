package com.admin.controller;

import com.admin.model.*;
import com.admin.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        if (adminService.login(email, password)) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }
    }

    @PostMapping("/add")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }

    @PutMapping("/update/{id}")
    public Admin updateAdmin(@PathVariable int id, @RequestParam String email, @RequestParam String password) {
        return adminService.updateAdmin(id, email, password);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdmin(@PathVariable int id) {
        adminService.deleteAdminById(id);
    }

    @GetMapping("/admins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Customer APIs
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return adminService.getAllCustomers();
    }

    @DeleteMapping("/customers/{customerEmail}")
    public void deleteCustomer(@PathVariable String customerEmail) {
        adminService.deleteCustomerByEmail(customerEmail);
    }

    // Manager APIs
    @GetMapping("/manager/all")
    public List<Manager> getAllManagers() {
        return adminService.getAllManagers();
    }

    @DeleteMapping("/manager/{managerEmail}")
    public void deleteManager(@PathVariable String managerEmail) {
        adminService.deleteManagerByEmail(managerEmail);
    }

    // Hotel, Room, Booking, Transaction
    @GetMapping("/manager/hotels")
    public List<Hotel> getAllHotels() {
        return adminService.getAllHotels();
    }

    @GetMapping("/manager/rooms")
    public List<Room> getAllRooms() {
        return adminService.getAllRooms();
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return adminService.getAllBookings();
    }

    @GetMapping("/transactions")
    public List<Transcation> getAllTransactions() {
        return adminService.getAllTransactions();
    }
}
