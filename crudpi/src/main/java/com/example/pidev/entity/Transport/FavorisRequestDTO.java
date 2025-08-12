package com.example.pidev.entity.Transport;

public class FavorisRequestDTO {
    private Long userId;       // ✅ car User a un Long id
    private Integer transportId; // ✅ car Transport a un Integer id

    // Getters et Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getTransportId() {
        return transportId;
    }

    public void setTransportId(Integer transportId) {
        this.transportId = transportId;
    }
}
