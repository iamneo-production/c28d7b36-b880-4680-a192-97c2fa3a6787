package com.examly.springapp.services;

import java.io.IOException;
import java.util.stream.Stream;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import com.examly.springapp.models.Application;
import com.examly.springapp.models.ImageFileDB;
import com.examly.springapp.repository.ImageFileDBRepository;

@Service
@Transactional
public class ImageFileStorageServiceImpl implements ImageFileDBService{

  @Autowired
  private ImageFileDBRepository imageFileDBRepository;

  public ImageFileDB store(String appId, MultipartFile file) throws IOException {
    Application application = new Application();
    Long id = Long.parseLong(appId);
    application.setId(id);
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    
    //System.out.println(fileName);
    //System.out.println(application);
    
    ImageFileDB ImageFileDB = new ImageFileDB(fileName, file.getContentType(), file.getBytes(), application);

    return imageFileDBRepository.save(ImageFileDB);
  }

  @Override
  public ImageFileDB getFile(String id) {
    return imageFileDBRepository.findById(id).get();
  }
  
  @Override
  public Stream<ImageFileDB> getAllFiles() {
    return imageFileDBRepository.findAll().stream();
  }

  @Override
  public List<ImageFileDB> findByApplication_Id(Long appId) {
    
    return imageFileDBRepository.findByApplication_Id(appId);
  }
}