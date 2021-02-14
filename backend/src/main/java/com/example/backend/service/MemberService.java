package com.example.backend.service;

import com.example.backend.domain.Address;
import com.example.backend.domain.Member;
import com.example.backend.dto.MemberDto;
import com.example.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<MemberDto> getMembers() {
        List<MemberDto> memberDtoList = new ArrayList<>();
        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            memberDtoList.add(
                    new MemberDto(
                            member.getId(),
                            member.getUsername(),
                            member.getAddress().getCity(),
                            member.getAddress().getStreet(),
                            member.getAddress().getZipcode())
            );
        }
        return memberDtoList;
    }

    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }

    public void save(MemberDto memberDto) {
        Member member = new Member(memberDto.getName(),
                new Address(memberDto.getCity(), memberDto.getStreet(), memberDto.getZipcode())
        );
        Member savedMember = memberRepository.save(member);
    }
}
