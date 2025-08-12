package com.example.pidev.entity.Transport;



import com.example.pidev.entity.User.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FavorisTransport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 🔥 L'utilisateur propriétaire du favori

    @ManyToOne
    @JoinColumn(name = "transport_id")
    private Transport transport; // 🔥 Le transport mis en favori

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Transport getTransport() {
        return transport;
    }

    public void setTransport(Transport transport) {
        this.transport = transport;
    }
}
