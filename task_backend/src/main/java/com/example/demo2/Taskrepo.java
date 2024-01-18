package com.example.demo2;

import com.example.demo2.Task2;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;


@Component
public interface Taskrepo extends JpaRepository<Task2, Long> {

    // You can define additional query methods here if needed.
	List<Task2> findByEmail(String email);

}
