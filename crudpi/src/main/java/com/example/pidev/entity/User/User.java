package com.example.pidev.entity.User;

import com.example.pidev.entity.GUIDE.ReservationGuide;
import com.example.pidev.entity.Gastronomy.Gastronomy;
import com.example.pidev.entity.GestionSouvenir.Store;
import com.example.pidev.entity.activities.Blog;
import com.example.pidev.entity.hebergement.Hebergement;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getnTel() {
        return nTel;
    }

    public void setnTel(String nTel) {
        this.nTel = nTel;
    }

    public String getNumPasseport() {
        return numPasseport;
    }

    public void setNumPasseport(String numPasseport) {
        this.numPasseport = numPasseport;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public AuthProvider getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(AuthProvider authProvider) {
        this.authProvider = authProvider;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    @Column(nullable = false)
    private String lastName;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    @Column(nullable = false)
    private String password;


    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    @Pattern(regexp = "^[0-9]{8}$", message = "Le numéro de téléphone doit contenir exactement 8 chiffres")
    @Column(nullable = true)
    private String nTel;

    @NotBlank(message = "Le numéro de passeport est obligatoire")
    @Pattern(regexp = "^[A-Za-z0-9]{9}$", message = "Le numéro de passeport doit contenir exactement 9 caractères alphanumériques")
    @Column(nullable = true)
    private String numPasseport;

    @Getter
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "auth_provider", nullable = false)
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider = AuthProvider.LOCAL;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountStatus status;
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    public boolean isUsing2FA() {
        return using2FA;
    }



    public void setUsing2FA(boolean using2FA) {
        this.using2FA = using2FA;
    }



    @Column(name = "using_2fa")
    private boolean using2FA = false;

    @JsonIgnore
    @Column(name = "secret_2fa")
    private String secret2FA;

    public String getSecret2FA() {
        return secret2FA;
    }



    public void setSecret2FA(String secret2FA) {
        this.secret2FA = secret2FA;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Role getRole() {
        return role;
    }


    public enum AuthProvider {
        LOCAL,
        GOOGLE
    }

    @Transient
    public Long getRoleId() {
        return (role != null) ? role.getId() : null;
    }



    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of((GrantedAuthority) () -> "ROLE_" + role.getName());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Constructors
    public User() {}

    public User(String firstName, String lastName, String email, String password, Role role, String nTel, String numPasseport) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.nTel = nTel;
        this.numPasseport = numPasseport;
        this.role = role;
        this.status = AccountStatus.PENDING; // Default status
    }

    // Collection mappings for related entities
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Hebergement> hebergements;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Gastronomy> gastronomy;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Store> store;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<ReservationGuide> reservationGuide;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Blog> blog;

}
