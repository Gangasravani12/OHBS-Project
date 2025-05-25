package com.customer.service;

import java.util.List;
import com.customer.model.Booking;

public interface BookingService {
    Booking savebookings(Booking book);
    List<Booking> getAllbookings();
    Booking getbooking(String customerEmail);
    Booking updatecustomer(Booking book, String customerEmail);
    void deletebooking(String customerEmail);
    void updateBookingStatusBasedOnPayment(Long bookingId);
}