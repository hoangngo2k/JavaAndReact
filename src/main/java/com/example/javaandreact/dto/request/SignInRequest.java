package com.example.javaandreact.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {

    private String username;
    private String password;

    public SignInRequest() {
        super();
    }

    public SignInRequest(String username, String password) {
        super();
        this.username = username;
        this.password = password;
    }
}
