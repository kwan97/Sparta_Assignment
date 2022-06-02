package com.sparta.assignment.model;


import com.sparta.assignment.dto.MemoRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Memo extends Timestamped {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private Long userId;


    public Memo(String title, String contents, Long userId){
        this.title = title;
        this.contents = contents;
        this.userId = userId;

    }
    public Memo(MemoRequestDto requestDto , Long userId){
        this.userId = userId;
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
    }
}
