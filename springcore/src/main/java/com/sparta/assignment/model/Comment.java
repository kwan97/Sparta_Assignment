package com.sparta.assignment.model;

import com.sparta.assignment.dto.CommentRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
public class Comment {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private Long memoId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String comments;

    public Comment(Long memoId, Long userId, String comments) {
        this.memoId = memoId;
        this.userId = userId;
        this.comments = comments;
    }
    public Comment(CommentRequestDto requestDto, Long userId){
        this.memoId = requestDto.getMemoId();
        this.userId = userId;
        this.comments = requestDto.getComments();
    }

    public void update(CommentRequestDto requestDto) {
        this.comments = requestDto.getComments();
    }
}
