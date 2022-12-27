package com.example.javaandreact.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 5, max = 25)
    @Column(unique = true, length = 25, nullable = false)
    private String code;

    @Size(min = 5, max = 60)
    @Column(length = 60, nullable = false)
    private String fullName;

    @Size(min = 2, max = 6)
    @Column(length = 6, nullable = false)
    private String gender;

    @Size(min = 1, max = 5)
    @Column(length = 5, nullable = false)
    private String grade;

    @Column(nullable = false)
    private Double score;
}
