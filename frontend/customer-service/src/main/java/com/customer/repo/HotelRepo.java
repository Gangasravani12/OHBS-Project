package com.customer.repo;

import org.springframework.data.repository.CrudRepository;

import com.customer.model.Hotel;

public interface HotelRepo extends CrudRepository<Hotel, Long> {

}
