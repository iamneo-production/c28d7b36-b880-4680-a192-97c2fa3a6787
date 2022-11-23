package com.examly.springapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.stream.Stream;
import com.examly.springapp.models.ImageFileDB;
import java.util.List;

@Repository
public interface ImageFileDBRepository extends JpaRepository<ImageFileDB, String> {
    List<ImageFileDB> findByApplication_Id(Long appId);
}