package com.example.javaandreact.service.impl;

import com.example.javaandreact.dto.StudentDTO;
import com.example.javaandreact.entity.Student;
import com.example.javaandreact.mapper.StudentMapper;
import com.example.javaandreact.repository.StudentRepository;
import com.example.javaandreact.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collection;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Specification<Student> searchByFullName(String key) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("fullName"), "%" + key + "%");
    }

    public Specification<Student> filterGreaterThanOrEqualToId(Long min) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("id"), min);
    }

    public Specification<Student> filterLessThanOrEqualToId(Long max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("id"), max);
    }

    @Override
    public Page<Student> getAll(Pageable pageable, String name, Long min, Long max) {
        Specification<Student> where = null;
        if (!StringUtils.isEmpty(name)) {
            where = searchByFullName(name);
        }
        if (min >= 0) {
            if (where != null)
                where = where.and(filterGreaterThanOrEqualToId(min));
            else
                where = filterGreaterThanOrEqualToId(min);
        }
        if (max > 0) {
            if (where != null)
                where = where.and(filterLessThanOrEqualToId(max));
            else
                where = filterLessThanOrEqualToId(max);
        }
        return studentRepository.findAll(where, pageable);
    }

    @Override
    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found ID: " + id));
        return StudentMapper.toDTO(student);
    }

    @Override
    public StudentDTO saveStudent(StudentDTO studentDTO) {
        Student student = StudentMapper.toEntity(studentDTO);
        return StudentMapper.toDTO(studentRepository.save(student));
    }

    @Override
    public StudentDTO updateStudent(StudentDTO studentDTO, Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found ID"));
        student.setCode(studentDTO.getCode());
        student.setFullName(studentDTO.getFullName());
        student.setGender(studentDTO.getGender());
        student.setGrade(studentDTO.getGrade());
        student.setScore(studentDTO.getScore());
        return StudentMapper.toDTO(studentRepository.save(student));
    }

    @Override
    public void deleteStudents(Collection<Long> ids) {
        studentRepository.deleteStudentByIdIn(ids);
    }
}
