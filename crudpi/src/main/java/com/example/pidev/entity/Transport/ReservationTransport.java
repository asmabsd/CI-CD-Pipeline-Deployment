package com.example.pidev.entity.Transport;

import com.example.pidev.entity.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationTransport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String departPoint;
    private String destination;
    private Date departureHour;
    private int nbrpersonne;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "transport_id")

    private Transport transport;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")

    private User user;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDepartPoint() {
        return departPoint;
    }

    public void setDepartPoint(String departPoint) {
        this.departPoint = departPoint;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Date getDepartureHour() {
        return departureHour;
    }

    public void setDepartureHour(Date departureHour) {
        this.departureHour = departureHour;
    }

    public int getNbrpersonne() {
        return nbrpersonne;
    }

    public void setNbrpersonne(int nbrpersonne) {
        this.nbrpersonne = nbrpersonne;
    }

    public Transport getTransport() {
        return transport;
    }

    public void setTransport(Transport transport) {
        this.transport = transport;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
