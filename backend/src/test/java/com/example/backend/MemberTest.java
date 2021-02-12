package com.example.backend;

//import com.example.backend.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

//@SpringBootTest
//@Transactional
////@Rollback(false)
//class MemberTest {
//
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Test
//     public void sampleTest() {
//
//        Member member = new Member();
//        member.setUsername("member01");
//
//        Member savedMember = memberRepository.save(member);
//        Optional<Member> findMember = memberRepository.findById(savedMember.getId());
//
//        Assertions.assertThat(savedMember).isEqualTo(findMember.get());
//    }
//}