package com.example.demo2;

import com.example.demo2.Entity2;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;


@Component
public interface Entityrepo extends JpaRepository<Entity2, Long> {

    // You can define additional query methods here if needed.
	List<Entity2> findAllByNameAndAge(String name, int age);

}
