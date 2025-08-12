package com.example.pidev.repository.Transport;

import com.example.pidev.entity.Transport.ReservationTransport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationTransportRepository extends JpaRepository<ReservationTransport, Integer> {


    List<ReservationTransport> findByUserId(Long userId);
    @Query("SELECT SUM(r.nbrpersonne) FROM ReservationTransport r WHERE r.transport.id = :transportId")
    Integer getTotalReservedByTransport(@Param("transportId") Integer transportId);
}
