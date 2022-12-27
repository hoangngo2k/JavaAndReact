package com.example.javaandreact.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SignUpRequest {

    private String username;
    private String email;
    private String password;
    private Set<String> role;
}
