package com.example.javaandreact.mapper;

import com.example.javaandreact.dto.StudentDTO;
import com.example.javaandreact.entity.Student;

public class StudentMapper {

    public static Student toEntity(StudentDTO dto) {
        Student entity = new Student();
//        entity.setId(dto.getId());
        entity.setCode(dto.getCode());
        entity.setFullName(dto.getFullName());
        entity.setGender(dto.getGender());
        entity.setGrade(dto.getGrade());
        entity.setScore(dto.getScore());
        return entity;
    }

    public static StudentDTO toDTO(Student entity) {
        StudentDTO dto = new StudentDTO();
        dto.setId(entity.getId());
        dto.setCode(entity.getCode());
        dto.setFullName(entity.getFullName());
        dto.setGender(entity.getGender());
        dto.setGrade(entity.getGrade());
        dto.setScore(entity.getScore());
        return dto;
    }
}
