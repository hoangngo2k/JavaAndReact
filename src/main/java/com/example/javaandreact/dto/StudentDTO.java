package com.example.javaandreact.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class StudentDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String code;
    private String fullName;
    private String gender;
    private String grade;
    private Double score;
}
