package com.customer.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.customer.dto.TranscationRequest;
import com.customer.model.Transcation;

public interface TranscationRepo extends JpaRepository<Transcation, Long> {
    List<Transcation> findByBookingBookingId(Long bookingId);
}
