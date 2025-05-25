package com.customer.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customer.model.Booking;
import com.customer.model.Hotel;
import com.customer.model.PaymentStatus;
import com.customer.model.Room;
import com.customer.model.Transcation;
import com.customer.repo.BookingRepo;
import com.customer.repo.HotelRepo;
import com.customer.repo.RoomRepo;
import com.customer.repo.TranscationRepo;

@Service
public class BookingServiceImp implements BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private TranscationRepo transcationRepo;
    
    @Autowired private HotelRepo hotelRepo;
    @Autowired private RoomRepo roomRepo;

    @Override
    public Booking savebookings(Booking book) {
        book.setBookingStatus("BOOKED");
        

        // ✅ Fetch Hotel and Room using IDs
        Hotel hotel = hotelRepo.findById(book.getHotel().getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Room room = roomRepo.findById(book.getRoom().getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        book.setHotel(hotel);
        book.setRoom(room);
        
        // Calculate total amount
        long nights = ChronoUnit.DAYS.between(book.getCheckInDate(), book.getCheckOutDate());
        double totalAmount = book.getNumberOfPersons() * book.getPricePerNight() * nights;

        book.setTotalAmount(totalAmount);

        if (book.getPaymentType().equalsIgnoreCase("CASH")) {
            // Pay on Check-in
            book.setPaymentStatus(PaymentStatus.PENDING);
            book.setRemainingAmount(totalAmount);
            return bookingRepo.save(book);

        } else {
            // Pay Now case (ONLINE)
            double paidAmount = /* get from request or assume full payment */ totalAmount;

            PaymentStatus status;
            double remainingAmount;

            if (paidAmount >= totalAmount) {
                status = PaymentStatus.PAID;
                remainingAmount = 0.0;
            } else if (paidAmount > 0) {
                status = PaymentStatus.HALF_PAID;
                remainingAmount = totalAmount - paidAmount;
            } else {
                status = PaymentStatus.PENDING;
                remainingAmount = totalAmount;
            }

            book.setPaymentStatus(status);
            book.setRemainingAmount(remainingAmount);

            Booking savedBooking = bookingRepo.save(book);

            // Save transaction only if amount > 0
            if (paidAmount > 0) {
                Transcation txn = new Transcation();
                txn.setAmount(paidAmount);
                txn.setPaymentStatus(status);
                txn.setPaymentType(book.getPaymentType());
                txn.setBooking(savedBooking);
                transcationRepo.save(txn);
            }

            return savedBooking;
        }
    }




    @Override
    public List<Booking> getAllbookings() {
        return bookingRepo.findAll();
    }

    @Override
    public Booking getbooking(String customerEmail) {
        List<Booking> bookings = bookingRepo.findByCustomerCustomerEmail(customerEmail);
        return bookings.isEmpty() ? null : bookings.get(0); // You can return all if needed
    }

    @Override
    public Booking updatecustomer(Booking book, String customerEmail) {
        List<Booking> bookings = bookingRepo.findByCustomerCustomerEmail(customerEmail);
        if (bookings.isEmpty()) return null;

        Booking existingBooking = bookings.get(0);

        existingBooking.setCheckInDate(book.getCheckInDate());
        existingBooking.setCheckOutDate(book.getCheckOutDate());
        existingBooking.setNumberOfPersons(book.getNumberOfPersons());
        existingBooking.setHotelName(book.getHotelName());
        existingBooking.setRoomType(book.getRoomType());
        existingBooking.setLocation(book.getLocation());
        existingBooking.setPricePerNight(book.getPricePerNight());
        existingBooking.setPaymentType(book.getPaymentType());

        return bookingRepo.save(existingBooking);
    }

    @Override
    public void deletebooking(String customerEmail) {
        List<Booking> bookings = bookingRepo.findByCustomerCustomerEmail(customerEmail);
        if (!bookings.isEmpty()) {
            Booking booking = bookings.get(0);
            bookingRepo.deleteById(booking.getBookingId());
        }
    }

    // This method can be called after a transaction is saved
    public void updateBookingStatusBasedOnPayment(Long bookingId) {
        Booking booking = bookingRepo.findById(bookingId).orElse(null);
        if (booking == null) return;

        List<Transcation> transactions = transcationRepo.findByBookingBookingId(bookingId);
        double totalPaid = transactions.stream().mapToDouble(Transcation::getAmount).sum();
        double totalCost = booking.getPricePerNight(); // You can extend this by multiplying nights/persons

        if (totalPaid >= totalCost) {
            booking.setPaymentStatus(PaymentStatus.PAID);
        } else if (totalPaid > 0) {
            booking.setPaymentStatus(PaymentStatus.HALF_PAID);
        } else {
            booking.setPaymentStatus(PaymentStatus.PENDING);
        }


        booking.setBookingStatus("Booked");
        bookingRepo.save(booking);
    }
}
