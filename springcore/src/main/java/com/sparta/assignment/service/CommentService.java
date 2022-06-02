package com.sparta.assignment.service;

import com.sparta.assignment.dto.CommentRequestDto;
import com.sparta.assignment.model.Comment;
import com.sparta.assignment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {

    CommentRepository commentRepository;

    @Transactional
    public Long update(Long id, CommentRequestDto requestDto){
        Comment comment = commentRepository.findById(id).orElseThrow(
                ()->new NullPointerException("아이디가 존재하지 않습니다")
        );
        comment.update(requestDto);
        return comment.getId();
    }
}
