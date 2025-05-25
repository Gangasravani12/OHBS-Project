package com.customer.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long bookingId;

    @Column(nullable = false)
    private String hotelName;

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


    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonBackReference(value = "customer-booking")
    private Customer customer;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "booking-transactions")
    @JsonIgnore
    private List<Transcation> transactions;
    
 // NEW: Add hotel and room relationships
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name = "hotel_id", nullable = false)
//    private Hotel hotel;
    
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonBackReference
    private Hotel hotel;


    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public Booking(Long bookingId, String hotelName, RoomType roomType, String location, String bookingStatus,
			String paymentType, Integer numberOfPersons, LocalDate checkInDate, LocalDate checkOutDate,
			Double pricePerNight, PaymentStatus paymentStatus, Double remainingAmount, Double totalAmount,
			Customer customer, List<Transcation> transactions, com.customer.model.Hotel hotel,
			com.customer.model.Room room) {
		super();
		this.bookingId = bookingId;
		this.hotelName = hotelName;
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


//	public Booking(Long bookingId, String hotelName, RoomType roomType, String location, String bookingStatus,
//			String paymentType, Integer numberOfPersons, LocalDate checkInDate, LocalDate checkOutDate,
//			Double pricePerNight, PaymentStatus paymentStatus, Double remainingAmount, Double totalAmount,
//			Customer customer, List<Transcation> transactions) {
//		super();
//		this.bookingId = bookingId;
//		this.hotelName = hotelName;
//		this.roomType = roomType;
//		this.location = location;
//		this.bookingStatus = bookingStatus;
//		this.paymentType = paymentType;
//		this.numberOfPersons = numberOfPersons;
//		this.checkInDate = checkInDate;
//		this.checkOutDate = checkOutDate;
//		this.pricePerNight = pricePerNight;
//		this.paymentStatus = paymentStatus;
//		this.remainingAmount = remainingAmount;
//		this.totalAmount = totalAmount;
//		this.customer = customer;
//		this.transactions = transactions;
//	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public String getHotelName() {
		return hotelName;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
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
	
	

	@Override
	public String toString() {
		return "Booking [bookingId=" + bookingId + ", hotelName=" + hotelName + ", roomType=" + roomType + ", location="
				+ location + ", bookingStatus=" + bookingStatus + ", paymentType=" + paymentType + ", numberOfPersons="
				+ numberOfPersons + ", checkInDate=" + checkInDate + ", checkOutDate=" + checkOutDate
				+ ", pricePerNight=" + pricePerNight + ", paymentStatus=" + paymentStatus + ", remainingAmount="
				+ remainingAmount + ", totalAmount=" + totalAmount + ", customer=" + customer + ", transactions="
				+ transactions + ", hotel=" + hotel + ", room=" + room + "]";
	}

}