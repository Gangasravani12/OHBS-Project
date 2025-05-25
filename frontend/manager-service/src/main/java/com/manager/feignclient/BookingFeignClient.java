package com.manager.feignclient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.manager.model.Booking;
import com.manager.model.Transcation;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface BookingFeignClient {

    // ✔ Matches: @GetMapping("/booking/all")
    @GetMapping("/customers/booking/all")
    List<Booking> getAllBookings();

    // ❌ No endpoint exists for this in CustomerController
    // If needed, implement it in customer service and add it later

    // ✔ Matches: @GetMapping("/transcation/all")
    @GetMapping("/customers/transcation/all")
    List<Transcation> getAllTranscations();

    // ✔ Matches: @GetMapping("/transcation/booking/{bookingId}")
    @GetMapping("/customers/transcation/booking/{bookingId}")
    List<Transcation> getTranscationsByBookingId(@PathVariable Long bookingId);
}

