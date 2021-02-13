package com.example.backend.service;

import com.example.backend.domain.Member;
import com.example.backend.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // join member
    public Long registerMember(Member member) {
        // validate duplicated member
        validateDuplicatedMember(member);

        Member savedMember = memberRepository.save(member);
        return savedMember.getId();
    }

    private void validateDuplicatedMember(Member member) {
        // Exception
        List<Member> foundMembers = memberRepository.findByUsername(member.getUsername());

        if (foundMembers.size() > 0) {
            throw new IllegalStateException("Member already exists");
        }
    }

    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }
}
