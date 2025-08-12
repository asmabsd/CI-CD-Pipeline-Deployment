package com.example.pidev.repository.Transport;

import com.example.pidev.entity.Transport.FavorisTransport;
import com.example.pidev.entity.Transport.Transport;
import com.example.pidev.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavorisTransportRepository extends JpaRepository<FavorisTransport, Long> {

    List<FavorisTransport> findByUser(User user); // 🔥 Récupérer les favoris d'un utilisateur

    boolean existsByUserAndTransport(User user, Transport transport); // 🔥 Vérifier si un transport est déjà en favoris

    void deleteByUserAndTransport(User user, Transport transport); // 🔥 Supprimer un transport des favoris
}
