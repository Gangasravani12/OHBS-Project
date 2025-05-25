package com.admin.repo;

import com.admin.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Admin findByEmailAndPassword(String email, String password);
}
