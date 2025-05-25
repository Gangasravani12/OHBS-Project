package com.customer.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.customer.model.Customer;
@Repository
public interface CustomerRepo extends CrudRepository<Customer, Long> {
	List<Customer> findByCustomerEmail(String customerEmail);
	Customer findByCustomerEmailAndPassword(String customerEmail, String password);

}
