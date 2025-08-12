package com.example.pidev.service.Transport;

import com.example.pidev.entity.Transport.ReservationTransport;
import com.example.pidev.entity.Transport.Transport;
import com.example.pidev.entity.User.User;
import com.example.pidev.repository.Transport.ReservationTransportRepository;
import com.example.pidev.repository.Transport.TransportRepository;
import com.example.pidev.repository.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationTransportService {

    @Autowired
    private ReservationTransportRepository reservationRepository;

    @Autowired
    private TransportRepository transportRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ReservationTransport> getAllReservations() {
        return reservationRepository.findAll();
    }

    public ReservationTransport getReservationById(Integer id) {
        return reservationRepository.findById(id).orElse(null);
    }
    public List<ReservationTransport> getReservationsByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public ReservationTransport createReservation(Long userId, Integer transportId, ReservationTransport reservation) {
        if (userId == null || userId == 0 || transportId == null || transportId == 0) {
            throw new IllegalArgumentException("userId ou transportId invalide.");
        }

        Optional<Transport> transportOpt = transportRepository.findById(transportId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (transportOpt.isPresent() && userOpt.isPresent()) {
            reservation.setTransport(transportOpt.get());
            reservation.setUser(userOpt.get());
            return reservationRepository.save(reservation);
        } else {
            throw new IllegalArgumentException("Utilisateur ou transport non trouvé.");
        }
    }


    public ReservationTransport updateReservation(Integer id, ReservationTransport updatedReservation) {
        Optional<ReservationTransport> existing = reservationRepository.findById(id);
        if (existing.isPresent()) {
            ReservationTransport reservation = existing.get();
            reservation.setDepartPoint(updatedReservation.getDepartPoint());
            reservation.setDestination(updatedReservation.getDestination());
            reservation.setDepartureHour(updatedReservation.getDepartureHour());
            reservation.setNbrpersonne(updatedReservation.getNbrpersonne());
            reservation.setUser(updatedReservation.getUser());
            reservation.setTransport(updatedReservation.getTransport());
            return reservationRepository.save(reservation);
        }
        return null;
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }

    public int getRemainingCapacity(Integer transportId) {
        Transport transport = transportRepository.findById(transportId)
                .orElseThrow(() -> new RuntimeException("Transport non trouvé avec ID : " + transportId));

        Integer totalReserved = reservationRepository.getTotalReservedByTransport(transportId);
        if (totalReserved == null) {
            totalReserved = 0;
        }

        int totalCapacity = Integer.parseInt(transport.getCapacity());  // 👈 conversion ici

        return totalCapacity - totalReserved;
    }


}
