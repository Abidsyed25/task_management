package com.example.demo2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserT, Long> {

    // You can define additional query methods here if needed.
    
    UserT findByEmail(String email);
}
