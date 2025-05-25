package com.customer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customer.model.Customer;
import com.customer.repo.CustomerRepo;

@Service
public class CustomerServiceImp implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public Customer savecustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    @Override
    public List<Customer> getAllcustomers() {
        return (List<Customer>) customerRepo.findAll();
    }

    @Override
    public Customer updatecustomer(Customer updatedCustomer, String customerEmail) {
        List<Customer> customers = customerRepo.findByCustomerEmail(customerEmail);
        if (!customers.isEmpty()) {
            Customer existingCustomer = customers.get(0);

            // Update fields (you can add more fields as needed)
            existingCustomer.setName(updatedCustomer.getName());
            existingCustomer.setPassword(updatedCustomer.getPassword());
            existingCustomer.setContactNumber(updatedCustomer.getContactNumber());
            existingCustomer.setAddress(updatedCustomer.getAddress());
            existingCustomer.setState(updatedCustomer.getState());
            existingCustomer.setCountry(updatedCustomer.getCountry());
            existingCustomer.setGender(updatedCustomer.getGender());
            existingCustomer.setPincode(updatedCustomer.getPincode());
            existingCustomer.setCustomerEmail(updatedCustomer.getCustomerEmail()); // ✅ updating email
            return customerRepo.save(existingCustomer);
        }
        return null;
    }

    @Override
    public Customer login(String customerEmail, String password) {
        return customerRepo.findByCustomerEmailAndPassword(customerEmail, password);
    }

    @Override
    public Customer getcustomer(String customerEmail) {
        List<Customer> customers = customerRepo.findByCustomerEmail(customerEmail);
        return customers.isEmpty() ? null : customers.get(0);
    }

    @Override
    public void deletecustomer(String customerEmail) {
        Customer customer = (Customer) customerRepo.findByCustomerEmail(customerEmail);
        if (customer != null) {
            customerRepo.delete(customer);
        } else {
            throw new IllegalArgumentException("Customer with email " + customerEmail + " not found.");
        }
    }


}
