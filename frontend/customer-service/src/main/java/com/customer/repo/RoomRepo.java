package com.customer.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.customer.model.Room;

public interface RoomRepo extends CrudRepository<Room, Long> {
	List<Room> findByHotel_HotelId(Long hotelId);
}
