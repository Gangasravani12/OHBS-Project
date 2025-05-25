package com.admin.feign;

import com.admin.model.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerClient {
    @GetMapping("/customers/getallcustomers")
    List<Customer> getAllCustomers();

    @GetMapping("/customers/booking/all")
    List<Booking> getAllBookings();

    @GetMapping("/customers/transcation/all")
    List<Transcation> getAllTransactions();

    @DeleteMapping("/customers/{customerEmail}")
    void deleteCustomer(@PathVariable String email);
}