package com.example.javaandreact.controller;

import com.example.javaandreact.dto.StudentDTO;
import com.example.javaandreact.entity.Student;
import com.example.javaandreact.service.StudentService;
import com.example.javaandreact.service.impl.StudentServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentServiceImpl studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public ResponseEntity<?> getAll(Pageable pageable, @RequestParam(required = false) String search,
                                    @RequestParam(required = false, defaultValue = "0") Long min,
                                    @RequestParam(required = false, defaultValue = "0") Long max) {
        Page<Student> students = studentService.getAll(pageable, search, min, max);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PostMapping("/student")
    public ResponseEntity<?> saveStudent(@RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(studentService.saveStudent(studentDTO));
    }

    @PutMapping("/student/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(studentService.updateStudent(studentDTO, id));
    }

    @DeleteMapping("/students/{ids}")
    public ResponseEntity<?> deleteStudents(@PathVariable Collection<Long> ids) {
        studentService.deleteStudents(ids);
        return ResponseEntity.ok(true);
    }
}
