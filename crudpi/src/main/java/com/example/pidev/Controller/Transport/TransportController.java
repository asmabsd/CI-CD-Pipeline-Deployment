package com.example.pidev.Controller.Transport;



import com.example.pidev.entity.Transport.Transport;
import com.example.pidev.service.Transport.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transport")
@CrossOrigin(origins = "http://localhost:4200/")
public class TransportController {

    @Autowired
    private TransportService transportService;

    @GetMapping
    public List<Transport> getAllTransports() {
        return transportService.getAllTransports();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transport> getTransportById(@PathVariable Integer id) {
        return ResponseEntity.ok(transportService.getTransportById(id));
    }

    @PostMapping("/addTransport")
//@PreAuthorize("hasRole('ADMIN')") // à activer si tu as la sécurité
    public Transport addTransport(@RequestBody Transport transport) {
        return transportService.addTransport(transport);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transport> updateTransport(@PathVariable Integer id, @RequestBody Transport transport) {
        return ResponseEntity.ok(transportService.updateTransport(id, transport));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransport(@PathVariable Integer id) {
        transportService.deleteTransport(id);
        return ResponseEntity.noContent().build();
    }
}
