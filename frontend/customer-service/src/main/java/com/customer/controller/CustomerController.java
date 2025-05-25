package com.customer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.customer.dto.TranscationRequest;
import com.customer.model.Booking;
import com.customer.model.Customer;
import com.customer.model.Transcation;
import com.customer.service.BookingService;
import com.customer.service.CustomerService;
import com.customer.service.TranscationService;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "*") // Optional: for frontend integration
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private TranscationService transactionService;
    // Create a new customer
    @PostMapping("/register")
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customerService.savecustomer(customer);
    }

    // Get all customers
    @GetMapping("/getallcustomers")
    public List<Customer> getAllCustomers() {
        return customerService.getAllcustomers();
    }
    
 // Get customer by email
    @GetMapping("/{email}")
    public Customer getCustomerByEmail(@PathVariable("email") String customerEmail) {
        return customerService.getcustomer(customerEmail);
    }


    // Update customer by old email
    @PutMapping("/update/{oldEmail}")
    public Customer updateCustomer(@RequestBody Customer customer, @PathVariable String oldEmail) {
        return customerService.updatecustomer(customer, oldEmail);
    }

    // Login customer
    @PostMapping("/login")
    public Customer login(@RequestParam String customerEmail, @RequestParam String password) {
        return customerService.login(customerEmail, password);
    }
    
    //=================== Booking controller====================
    
    @PostMapping("/booking/save")
    
    public Booking saveBooking(@RequestBody Booking booking) {
        return bookingService.savebookings(booking);
    }


    @GetMapping("/booking/all")
    public List<Booking> getAllBookings() {
        return bookingService.getAllbookings();
    }

    @GetMapping("/booking/{CustomerEmail}")
    public Booking getBooking(@PathVariable String customerEmail) {
        return bookingService.getbooking(customerEmail);
    }

    @PutMapping("/booking/{customerEmail}")
    public Booking updateBooking(@RequestBody Booking booking, @PathVariable String customerEmail) {
        return bookingService.updatecustomer(booking, customerEmail);
    }

    @DeleteMapping("/booking/{customerEmail}")
    public void deleteBooking(@PathVariable String customerEmail) {
        bookingService.deletebooking(customerEmail);
    }
    
    //============================ Transcations controller====================
    
    @PostMapping("/add")
    public ResponseEntity<?> createTransaction(@RequestBody TranscationRequest request) {
        try {
            Transcation saved = transactionService.saveTransaction(request);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/transcation/all")
    public ResponseEntity<?> getAllTransactions() {
    	 return ResponseEntity.ok(transactionService.getAllTransactions());
    }


//    @GetMapping("/transcation/all")
//    public List<Transcation> getAllTransactions() {
//        return transactionService.getAllTransactions();
//    }

    @GetMapping("/transcation/booking/{bookingId}")
    public List<Transcation> getTransactionsByBooking(@PathVariable Long bookingId) {
        return transactionService.getTransactionsByBookingId(bookingId);
    }
    
    @DeleteMapping("/{customerEmail}")
    public void deleteCustomer(@PathVariable String customerEmail) {
        customerService.deletecustomer(customerEmail);
    }

}
