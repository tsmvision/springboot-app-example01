package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

//@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
@RequiredArgsConstructor
public class MemberDto {

    private String name;
    private String city;
    private String street;
    private String zipcode;
}
