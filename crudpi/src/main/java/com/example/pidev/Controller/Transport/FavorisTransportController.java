package com.example.pidev.Controller.Transport;

import com.example.pidev.entity.Transport.FavorisRequestDTO;
import com.example.pidev.entity.Transport.FavorisTransport;
import com.example.pidev.entity.Transport.Transport;
import com.example.pidev.service.Transport.FavorisTransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/favoris")
@CrossOrigin(origins = "http://localhost:4200") // ⚡ Autoriser les requêtes Angular si besoin
public class FavorisTransportController {

    @Autowired
    private FavorisTransportService favorisTransportService;

    // 🔵 Récupérer tous les favoris de l'utilisateur connecté
    @GetMapping
    public List<Transport> getFavoris(Principal principal) {

        String email = principal.getName();
        return favorisTransportService.getFavoris(email);
    }

    // 🟢 Ajouter un favori
    @PostMapping("/add")
    public ResponseEntity<FavorisTransport> addFavoris(@RequestBody FavorisRequestDTO favorisRequest) {
        FavorisTransport favori = favorisTransportService.addFavoris(favorisRequest.getUserId(), favorisRequest.getTransportId());
        return ResponseEntity.ok(favori);
    }



    // 🔴 Supprimer un favori
    @DeleteMapping("/remove/{transportId}")
    public void removeFavori(@PathVariable Integer transportId, Principal principal) {

        String email = principal.getName();
        favorisTransportService.removeFavori(email, transportId);
    }

    // ⚫ Tout vider
    @DeleteMapping("/clear")
    public void clearFavoris(Principal principal) {
        String email = principal.getName();
        favorisTransportService.clearFavoris(email);
    }

    // 🔹 Classe interne pour récupérer l'ID du transport en POST
    static class AddFavoriRequest {
        private Integer transportId;

        public Integer getTransportId() {
            return transportId;
        }

        public void setTransportId(Integer transportId) {
            this.transportId = transportId;
        }
    }
}