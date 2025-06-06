package com.customer.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.customer.model.Booking;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerCustomerEmail(String customerEmail);
    void deleteByCustomerCustomerEmail(String customerEmail);
}