package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

//@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class MemberInputDto {

    private Long id;
    private String name;
    private String city;
    private String street;
    private String zipcode;

    public MemberInputDto(Long id, String name, String city, String street, String zipcode) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.street = street;
        this.zipcode = zipcode;
    }
}
