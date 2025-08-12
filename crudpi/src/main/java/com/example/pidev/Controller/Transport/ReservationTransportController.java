package com.example.pidev.Controller.Transport;

import com.example.pidev.entity.Transport.ReservationTransport;
import com.example.pidev.service.Transport.ReservationTransportService;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.pidev.entity.User.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservationtransport")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationTransportController {

    @Autowired
    private ReservationTransportService service;

    @PostMapping("/user/{userId}/transport/{transportId}")
    public ReservationTransport create(@PathVariable Long userId,
                                       @PathVariable Integer transportId,
                                       @RequestBody ReservationTransport reservation) {
        return service.createReservation(userId, transportId, reservation);
    }


    @GetMapping
    public List<ReservationTransport> getAll() {
        return service.getAllReservations();
    }
    @GetMapping("/user/{userId}")
    public List<ReservationTransport> getByUser(@PathVariable Long userId) {
        return service.getReservationsByUserId(userId);
    }
    @GetMapping("/{id}/remaining-capacity")
    public int getRemainingCapacity(@PathVariable Integer id) {
        return service.getRemainingCapacity(id);
    }


    @GetMapping("/{id}")
    public ReservationTransport getById(@PathVariable Integer id) {
        return service.getReservationById(id);
    }

    @PutMapping("/{id}")
    public ReservationTransport update(@PathVariable Integer id, @RequestBody ReservationTransport reservation) {
        return service.updateReservation(id, reservation);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.deleteReservation(id);
    }
}
