package com.example.javaandreact.repository;

import com.example.javaandreact.entity.Role;
import com.example.javaandreact.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRole(ERole role);
}
