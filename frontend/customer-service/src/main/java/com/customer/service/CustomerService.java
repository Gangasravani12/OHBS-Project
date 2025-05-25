package com.customer.service;

import java.util.List;

import com.customer.model.Customer;

public interface CustomerService {
	Customer savecustomer(Customer customer);
	List<Customer> getAllcustomers();
	public Customer getcustomer(String customerEmail);
	public Customer updatecustomer(Customer customer, String customerEmail);
	public Customer login(String customerEmail, String password);
	void deletecustomer(String customerEmail);
}
