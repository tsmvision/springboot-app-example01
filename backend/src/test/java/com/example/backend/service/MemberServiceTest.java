package com.example.backend.service;

import com.example.backend.domain.Member;
import com.example.backend.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberService memberService;

    @Test
    public void registerMemberTest() {
        // given
        Member member1 = new Member();
        member1.setUsername("luke");

        Long savedId = memberService.registerMember(member1);

        assertThat(savedId).isEqualTo(member1.getId());
    }

    @Test
    public void duplicatedMemberTest() {
        // given
        Member member1 = new Member();
        member1.setUsername("luke");

        Member member2 = new Member();
        member2.setUsername("luke");

        memberService.registerMember(member1);

        assertThatThrownBy(() -> {
            memberService.registerMember(member2);
        })
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Member already exists");
    }
}