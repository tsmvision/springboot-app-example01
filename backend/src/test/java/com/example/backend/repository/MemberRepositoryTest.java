package com.example.backend.repository;

import com.example.backend.domain.Address;
import com.example.backend.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void saveTest() {
        Member member01 = new Member();
        Address address01 = new Address("mason", "1234 abc street", "12421");

        member01.setAddress(address01);
        member01.setUsername("member01");

        memberRepository.save(member01);

        Optional<Member> foundMember = memberRepository.findById(member01.getId());

        assertEquals(foundMember.get(), member01);
    }
}