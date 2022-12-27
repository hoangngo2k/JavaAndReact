package com.example.javaandreact.service;

import com.example.javaandreact.dto.StudentDTO;
import com.example.javaandreact.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;

public interface StudentService {

    Page<Student> getAll(Pageable pageable, String name, Long min, Long max);
    StudentDTO getStudentById(Long id);
    StudentDTO saveStudent(StudentDTO studentDTO);
    StudentDTO updateStudent(StudentDTO studentDTO, Long id);
    void deleteStudents(Collection<Long> ids);
}
