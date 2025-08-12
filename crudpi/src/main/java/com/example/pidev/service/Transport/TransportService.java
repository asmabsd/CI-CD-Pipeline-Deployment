package com.example.pidev.service.Transport;



import com.example.pidev.entity.Transport.Transport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.pidev.repository.Transport.TransportRepository;

import java.util.List;

@Service
public class TransportService {

    @Autowired
    private TransportRepository transportRepository;

    public List<Transport> getAllTransports() {
        return transportRepository.findAll();
    }

    public Transport getTransportById(Integer id) {
        return transportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transport introuvable avec id : " + id));
    }

    public Transport addTransport(Transport transport) {
        return transportRepository.save(transport);
    }


    public Transport updateTransport(Integer id, Transport updatedTransport) {
        Transport transport = getTransportById(id);

        transport.setType(updatedTransport.getType());
        transport.setDisponibilite(updatedTransport.getDisponibilite());
        transport.setLocation(updatedTransport.getLocation());
        transport.setDescription(updatedTransport.getDescription());
        transport.setCapacity(updatedTransport.getCapacity());
        transport.setPrice(updatedTransport.getPrice());


        return transportRepository.save(transport);
    }

    public void deleteTransport(Integer id) {
        transportRepository.deleteById(id);
    }
}
