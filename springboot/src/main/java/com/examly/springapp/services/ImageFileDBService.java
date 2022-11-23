package com.examly.springapp.services;

import com.examly.springapp.models.ImageFileDB;
import java.util.stream.Stream;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ImageFileDBService {
    List<ImageFileDB> findByApplication_Id(Long appId);
    ImageFileDB getFile(String id);
    Stream<ImageFileDB> getAllFiles();
}
