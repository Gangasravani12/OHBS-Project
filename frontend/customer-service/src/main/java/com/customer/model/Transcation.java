package com.customer.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Transcation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private String paymentType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType roomType;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Double totalAmount;

//    @ManyToOne
//    @JoinColumn(name = "booking_id", nullable = false)
//    @JsonBackReference(value = "booking-transactions")
//    private Booking booking;
    
    @ManyToOne
    @JoinColumn(name = "booking_id")
    @JsonBackReference
    @JsonIgnore
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private Customer customer;

    // Constructors
    public Transcation() {}

    public Transcation(Long transactionId, String paymentType, PaymentStatus paymentStatus, RoomType roomType,
                       Double amount, Double totalAmount, Booking booking, Customer customer) {
        this.transactionId = transactionId;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.roomType = roomType;
        this.amount = amount;
        this.totalAmount = totalAmount;
        this.booking = booking;
        this.customer = customer;
    }

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "Transcation [transactionId=" + transactionId + ", paymentType=" + paymentType + ", paymentStatus="
				+ paymentStatus + ", roomType=" + roomType + ", amount=" + amount + ", totalAmount=" + totalAmount
				+ ", booking=" + booking + ", customer=" + customer + "]";
	}

    
}
