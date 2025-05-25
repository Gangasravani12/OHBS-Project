package com.admin.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.admin.model.Hotel;
import com.admin.model.Manager;
import com.admin.model.Room;

@FeignClient(name = "MANAGER-SERVICE")
public interface ManagerClient {
    @GetMapping("/manager/all")
    List<Manager> getAllManagers();

    @GetMapping("/manager/hotels")
    List<Hotel> getAllHotels();

    @GetMapping("/manager/rooms")
    List<Room> getAllRooms();

    @DeleteMapping("/manager/{managerEmail}")
    void deleteManager(@PathVariable String managerEmail);
}