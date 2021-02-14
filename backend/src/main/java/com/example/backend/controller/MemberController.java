package com.example.backend.controller;

import com.example.backend.dto.MemberDto;
import com.example.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<MemberDto> createNewMember(@RequestBody MemberDto memberDto) {
        log.info("MemberController: createNewMember");

        memberService.save(memberDto);
        return new ResponseEntity<>(memberDto, HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<MemberDto>> getMembers() {
        log.info("MemberController: getMembers");

        return new ResponseEntity<>(memberService.getMembers(), HttpStatus.OK);
    }
}
