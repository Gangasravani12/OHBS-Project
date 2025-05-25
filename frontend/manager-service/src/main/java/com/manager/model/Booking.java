package com.manager.model;

import java.time.LocalDate;
import java.util.List;

import com.manager.model.Hotel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType roomType;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String bookingStatus;

    @Column(nullable = false)
    private String paymentType;

    @Column(nullable = false)
    private Integer numberOfPersons;

    @Column(nullable = false)
    private LocalDate checkInDate;

    @Column(nullable = false)
    private LocalDate checkOutDate;

    @Column(nullable = false)
    private Double pricePerNight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    @Column(nullable = false)
    private Double remainingAmount = 0.0; // Default to 0

    @Column(nullable = false)
    private Double totalAmount;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonBackReference(value = "customer-booking")
    private Customer customer;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "booking-transactions")
    private List<Transcation> transactions;

//    @ManyToOne(optional = false)
//    @JoinColumn(name = "room_id", nullable = false)
//    private Room room;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonBackReference
    private Room room;


    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonBackReference("hotel-booking")
    private Hotel hotel;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})


    // Constructors, Getters, Setters, toString below (include new fields)

    public Booking() {}

    public Booking(Long bookingId, RoomType roomType, String location, String bookingStatus, String paymentType,
                   Integer numberOfPersons, LocalDate checkInDate, LocalDate checkOutDate, Double pricePerNight,
                   PaymentStatus paymentStatus, Double remainingAmount, Double totalAmount,
                   Customer customer, List<Transcation> transactions, Hotel hotel, Room room) {
        this.bookingId = bookingId;
        this.roomType = roomType;
        this.location = location;
        this.bookingStatus = bookingStatus;
        this.paymentType = paymentType;
        this.numberOfPersons = numberOfPersons;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.pricePerNight = pricePerNight;
        this.paymentStatus = paymentStatus;
        this.remainingAmount = remainingAmount;
        this.totalAmount = totalAmount;
        this.customer = customer;
        this.transactions = transactions;
        this.hotel = hotel;
        this.room = room;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
    
	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(String bookingStatus) {
		this.bookingStatus = bookingStatus;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Integer getNumberOfPersons() {
		return numberOfPersons;
	}

	public void setNumberOfPersons(Integer numberOfPersons) {
		this.numberOfPersons = numberOfPersons;
	}

	public LocalDate getCheckInDate() {
		return checkInDate;
	}

	public void setCheckInDate(LocalDate checkInDate) {
		this.checkInDate = checkInDate;
	}

	public LocalDate getCheckOutDate() {
		return checkOutDate;
	}

	public void setCheckOutDate(LocalDate checkOutDate) {
		this.checkOutDate = checkOutDate;
	}

	public Double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(Double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Double getRemainingAmount() {
		return remainingAmount;
	}

	public void setRemainingAmount(Double remainingAmount) {
		this.remainingAmount = remainingAmount;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<Transcation> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transcation> transactions) {
		this.transactions = transactions;
	}

	@Override
	public String toString() {
		return "Booking [bookingId=" + bookingId + ", roomType=" + roomType + ", location=" + location
				+ ", bookingStatus=" + bookingStatus + ", paymentType=" + paymentType + ", numberOfPersons="
				+ numberOfPersons + ", checkInDate=" + checkInDate + ", checkOutDate=" + checkOutDate
				+ ", pricePerNight=" + pricePerNight + ", paymentStatus=" + paymentStatus + ", remainingAmount="
				+ remainingAmount + ", totalAmount=" + totalAmount + ", customer=" + customer + ", transactions="
				+ transactions + ", hotel=" + hotel + ", room=" + room + "]";
	}

    // Keep other getters/setters and toString as-is but include new hotel and room fields
    
}
