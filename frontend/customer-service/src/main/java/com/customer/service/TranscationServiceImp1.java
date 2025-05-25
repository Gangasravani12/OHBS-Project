package com.customer.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customer.dto.TranscationRequest;
import com.customer.model.Booking;
import com.customer.model.Customer;
import com.customer.model.PaymentStatus;
import com.customer.model.Transcation;
import com.customer.repo.BookingRepo;
import com.customer.repo.CustomerRepo;
import com.customer.repo.TranscationRepo;

@Service
public class TranscationServiceImp1 implements TranscationService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private TranscationRepo transcationRepo;

    @Autowired
    private CustomerRepo customerRepo;

//    @Override
//    public Transcation saveTransaction(TranscationRequest request) {
//        Customer customer = customerRepo.findById(request.getCustomerId())
//                .orElseThrow(() -> new IllegalArgumentException("Customer not found."));
//        Booking booking = bookingRepo.findById(request.getBookingId())
//                .orElseThrow(() -> new IllegalArgumentException("Booking not found."));
//
//        // Create new transaction and set details
//        Transcation transaction = new Transcation();
//        transaction.setCustomer(customer);
//        transaction.setBooking(booking);
//        transaction.setPaymentType(request.getPaymentType());
//     double expectedAmount;
//		double totalPaid;
//		// Automatically update payment status based on total paid amount
//        if (totalPaid >= expectedAmount) {
//            booking.setPaymentStatus(PaymentStatus.PAID);
//        } else if (totalPaid >= expectedAmount / 2) {
//            booking.setPaymentStatus(PaymentStatus.HALF_PAID);
//        } else {
//            booking.setPaymentStatus(PaymentStatus.PENDING);
//        }
//     // Set payment status for the current transaction too (not just booking)
//        if (request.getAmount() >= expectedAmount) {
//            transaction.setPaymentStatus(PaymentStatus.PAID);
//        } else if (request.getAmount() >= expectedAmount / 2) {
//            transaction.setPaymentStatus(PaymentStatus.HALF_PAID);
//        } else {
//            transaction.setPaymentStatus(PaymentStatus.PENDING);
//        }
//
//
//        transaction.setRoomType(request.getRoomType());
//        transaction.setAmount(request.getAmount());
//
//        // Calculate total expected amount for the stay
//        long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
//        double expectedAmount = days * booking.getPricePerNight();
//        transaction.setTotalAmount(expectedAmount);
//
//        // Save transaction first
//        transcationRepo.save(transaction);
//
//        // Calculate total paid amount from all transactions of this booking
//        List<Transcation> transactions = transcationRepo.findByBookingBookingId(booking.getBookingId());
//        double totalPaid = transactions.stream().mapToDouble(Transcation::getAmount).sum();
//
//        // Update booking remaining amount (avoid negative)
//        booking.setRemainingAmount(Math.max(expectedAmount - totalPaid, 0));
//
//        // Automatically update payment status based on total paid amount
//        if (totalPaid >= expectedAmount) {
//            booking.setPaymentStatus(PaymentStatus.PAID);
//        } else if (totalPaid >= expectedAmount / 2) {
//            booking.setPaymentStatus(PaymentStatus.HALF_PAID);
//        } else {
//            booking.setPaymentStatus(PaymentStatus.PENDING);
//        }
//
//        // Save updated booking
//        bookingRepo.save(booking);
//
//        return transaction;
//    }

    @Override
    public Transcation saveTransaction(TranscationRequest request) {
        Customer customer = customerRepo.findById(request.getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found."));

        Booking booking = bookingRepo.findById(request.getBookingId())
                .orElseThrow(() -> new IllegalArgumentException("Booking not found."));

        // Calculate number of days
        long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        if (days == 0) days = 1; // At least one day for same day check-in/out

        // Correct calculation for total amount
        double totalAmount = booking.getNumberOfPersons() * booking.getPricePerNight() * days;
        booking.setTotalAmount(totalAmount); // Update in booking table

        // Create new transaction
        Transcation transaction = new Transcation();
        transaction.setCustomer(customer);
        transaction.setBooking(booking);
        transaction.setPaymentType(request.getPaymentType());
        transaction.setRoomType(request.getRoomType());
        transaction.setAmount(request.getAmount());
        transaction.setTotalAmount(totalAmount); // just for tracking

        // Set payment status for this individual transaction
        if (request.getAmount() >= totalAmount) {
            transaction.setPaymentStatus(PaymentStatus.PAID);
        } else if (request.getAmount() >= totalAmount / 2) {
            transaction.setPaymentStatus(PaymentStatus.HALF_PAID);
        } else {
            transaction.setPaymentStatus(PaymentStatus.PENDING);
        }

        // Save current transaction
        transcationRepo.save(transaction);

        // Calculate total paid so far for this booking
        List<Transcation> transactions = transcationRepo.findByBookingBookingId(booking.getBookingId());
        double totalPaid = transactions.stream().mapToDouble(Transcation::getAmount).sum();

        // Update remaining amount in booking
        double remainingAmount = totalAmount - totalPaid;
        booking.setRemainingAmount(Math.max(remainingAmount, 0)); // avoid negative

        // Update overall payment status
        if (totalPaid >= totalAmount) {
            booking.setPaymentStatus(PaymentStatus.PAID);
        } else if (totalPaid >= totalAmount / 2) {
            booking.setPaymentStatus(PaymentStatus.HALF_PAID);
        } else {
            booking.setPaymentStatus(PaymentStatus.PENDING);
        }

        // Save updated booking
        bookingRepo.save(booking);

        return transaction;
    }



    @Override
    public List<Transcation> getAllTransactions() {
        return transcationRepo.findAll();
    }

    @Override
    public List<Transcation> getTransactionsByBookingId(Long bookingId) {
        return transcationRepo.findByBookingBookingId(bookingId);
    }

	@Override
	public Transcation saveTransaction(Transcation transaction) {
		// TODO Auto-generated method stub
		return null;
	}
}
