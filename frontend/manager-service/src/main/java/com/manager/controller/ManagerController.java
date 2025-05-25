package com.manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manager.model.Hotel;
import com.manager.model.Manager;
import com.manager.model.Room;
import com.manager.service.ManagerService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired private ManagerService managerService;

    @PostMapping(value = "/hotels", consumes = "application/json", produces = "application/json")
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return managerService.addHotel(hotel);
    }

    @PutMapping("/hotels/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        return managerService.updateHotel(id, hotel);
    }

    @DeleteMapping("/hotels/{id}")
    public void deleteHotel(@PathVariable Long id) {
        managerService.deleteHotel(id);
    }

    @GetMapping("/hotels")
    public List<Hotel> viewHotels() {
        return managerService.viewHotels();
    }


    @PostMapping(value = "/rooms", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Room addRoom(@RequestBody Room room) {
        return managerService.addRoom(room);
    }




    @PutMapping("/rooms/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return managerService.updateRoom(id, room);
    }

    @DeleteMapping("/rooms/{id}")
    public void deleteRoom(@PathVariable Long id) {
        managerService.deleteRoom(id);
    }

    @GetMapping("/rooms/hotel/{hotelId}")
    public List<Room> getRoomsByHotel(@PathVariable Long hotelId) {
        return managerService.viewRoomsByHotel(hotelId);
    }

    @GetMapping("/bookings")
    public List<com.manager.model.Booking> viewAllBookings() {
        return managerService.viewAllBookings();
    }


    @GetMapping("/transcations/booking/{bookingId}")
    public List<com.manager.model.Transcation> viewTransactionsByBookingId(@PathVariable Long bookingId) {
        return managerService.viewTranscationsByBookingId(bookingId);
    }

    @PutMapping("/rooms/{roomId}/status")
    public Room updateRoomStatus(@PathVariable Long roomId, @RequestParam String status) {
        return managerService.updateRoomStatus(roomId, status);
    }
    
 // ✅ Register a new manager
    @PostMapping("/register")
    public Manager addManager(@RequestBody Manager manager) {
        return managerService.addManager(manager);
    }

    // ✅ Login
    @GetMapping("/login")
    public Manager login(@RequestParam String managerEmail, @RequestParam String password) {
        return managerService.loginManager(managerEmail, password);
    }

    // ✅ Get all managers (admin use)
    @GetMapping("/all")
    public List<Manager> getAllManagers() {
        return managerService.getAllManagers();
    }

    // ✅ Get manager by email (admin use)
    @GetMapping("/{email}")
    public Manager getManagerByEmail(@PathVariable String email) {
        return managerService.getManagerByEmail(email);
    }

    // ✅ Update manager profile
    @PutMapping("/update/{managerEmail}")
    public Manager updateProfile(@PathVariable String managerEmail, @RequestBody Manager manager) {
        return managerService.updateManagerProfile(managerEmail, manager);
    }
    
    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return managerService.getAllRooms();
    }
    @DeleteMapping("/{managerEmail}")
    public ResponseEntity<String> deleteManager(@PathVariable String managerEmail) {
        managerService.deleteManagerByEmail(managerEmail);
        return ResponseEntity.ok("Manager deleted successfully.");
    }

}
