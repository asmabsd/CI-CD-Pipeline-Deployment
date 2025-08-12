package com.example.pidev.service.Transport;

import com.example.pidev.entity.Transport.FavorisTransport;
import com.example.pidev.entity.Transport.Transport;
import com.example.pidev.entity.User.User;
import com.example.pidev.repository.Transport.FavorisTransportRepository;
import com.example.pidev.repository.Transport.TransportRepository;
import com.example.pidev.repository.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavorisTransportService {

    @Autowired
    private FavorisTransportRepository favorisTransportRepository;

    @Autowired
    private TransportRepository transportRepository;

    @Autowired
    private UserRepository userRepository;

    // 👉 Ajouter un transport aux favoris
    public FavorisTransport addFavoris(Long userId, Integer transportId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Transport transport = transportRepository.findById(transportId)
                .orElseThrow(() -> new RuntimeException("Transport not found with id: " + transportId));

        FavorisTransport favori = new FavorisTransport();
        favori.setUser(user);
        favori.setTransport(transport);

        return favorisTransportRepository.save(favori);
    }


    // 👉 Supprimer un transport des favoris
    public void removeFavori(String email, Integer transportId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        Transport transport = transportRepository.findById(transportId)
                .orElseThrow(() -> new RuntimeException("Transport introuvable"));

        favorisTransportRepository.deleteByUserAndTransport(user, transport);
    }

    // 👉 Obtenir tous les transports favoris de l'utilisateur
    public List<Transport> getFavoris(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        List<FavorisTransport> favoris = favorisTransportRepository.findByUser(user);
        return favoris.stream()
                .map(FavorisTransport::getTransport)
                .collect(Collectors.toList());
    }

    // 👉 Tout vider
    public void clearFavoris(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        List<FavorisTransport> favorisList = favorisTransportRepository.findByUser(user);
        favorisTransportRepository.deleteAll(favorisList);
    }
}