package com.example.backend.controller;

import com.example.backend.dto.MemberInputDto;
import com.example.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<MemberInputDto> createNewMember(@RequestBody MemberInputDto memberDto) {
        log.info("MemberController: createNewMember");

        memberService.save(memberDto);
        return new ResponseEntity<>(memberDto, HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<MemberInputDto>> getMembers() {
        log.info("MemberController: getMembers");

        return new ResponseEntity<>(memberService.getMembers(), HttpStatus.OK);
    }
}
