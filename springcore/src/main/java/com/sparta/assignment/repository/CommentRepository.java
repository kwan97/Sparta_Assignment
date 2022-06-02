package com.sparta.assignment.repository;

import com.sparta.assignment.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByMemoId(Long memoId);
}
