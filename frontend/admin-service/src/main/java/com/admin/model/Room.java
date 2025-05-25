package com.admin.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    private Double pricePerNight;

    @Column(length = 1000)
    private String amenities;      // e.g., "WiFi, TV, Mini Fridge, Air Conditioner"

    @Column(length = 1000)
    private String advantages;     // e.g., "Sea View, Balcony, Soundproof Walls"

    @Column(length = 1000)
    private String roomServices;   // e.g., "24/7 Room Service, Laundry, Wake-up Call"

    @Column(length = 1000)
    private String mealsIncluded;  // e.g., "Breakfast, Dinner"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    @JsonBackReference("hotel-room")
    private Hotel hotel;
 String roomStatus = "AVAILABLE";
 @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

	public Room() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Room(Long roomId, RoomType roomType, Double pricePerNight, String amenities, String advantages,
			String roomServices, String mealsIncluded, Hotel hotel, String roomStatus) {
		super();
		this.roomId = roomId;
		this.roomType = roomType;
		this.pricePerNight = pricePerNight;
		this.amenities = amenities;
		this.advantages = advantages;
		this.roomServices = roomServices;
		this.mealsIncluded = mealsIncluded;
		this.hotel = hotel;
		this.roomStatus = roomStatus;
	}

	public Long getRoomId() {
		return roomId;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public Double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(Double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public String getAmenities() {
		return amenities;
	}

	public void setAmenities(String amenities) {
		this.amenities = amenities;
	}

	public String getAdvantages() {
		return advantages;
	}

	public void setAdvantages(String advantages) {
		this.advantages = advantages;
	}

	public String getRoomServices() {
		return roomServices;
	}

	public void setRoomServices(String roomServices) {
		this.roomServices = roomServices;
	}

	public String getMealsIncluded() {
		return mealsIncluded;
	}

	public void setMealsIncluded(String mealsIncluded) {
		this.mealsIncluded = mealsIncluded;
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public String getRoomStatus() {
		return roomStatus;
	}

	public void setRoomStatus(String roomStatus) {
		this.roomStatus = roomStatus;
	}

	@Override
	public String toString() {
		return "Room [roomId=" + roomId + ", roomType=" + roomType + ", pricePerNight=" + pricePerNight + ", amenities="
				+ amenities + ", advantages=" + advantages + ", roomServices=" + roomServices + ", mealsIncluded="
				+ mealsIncluded + ", hotel=" + hotel + ", roomStatus=" + roomStatus + "]";
	}
	
	}