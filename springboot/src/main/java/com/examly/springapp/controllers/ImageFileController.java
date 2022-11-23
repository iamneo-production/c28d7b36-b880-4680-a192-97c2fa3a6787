package com.examly.springapp.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.services.ImageFileStorageServiceImpl;
import com.examly.springapp.payload.response.ImageFileResponse;
import com.examly.springapp.payload.response.MessageResponse;
import com.examly.springapp.models.ImageFileDB;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/file")
//@Controller
public class ImageFileController {

  @Autowired
  private ImageFileStorageServiceImpl storageService;

  @PostMapping("/upload/img")
  public ResponseEntity<MessageResponse> uploadImage(@RequestPart("application") String appId,@RequestPart("file") MultipartFile file) {
    String message = "";
    String type = file.getContentType();
    String img = "image/jpeg";
    //System.out.println(file.getContentType());
    if(!type.equals(img)){
      //System.out.println("Not Image");
      message = "File is not JPEG file, Upload Failed";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
    }
    try {
      storageService.store(appId, file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "! " + e;
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
    }
  }

  @PostMapping("/upload/pdf")
  public ResponseEntity<MessageResponse> uploadPDF(@RequestPart("application") String appId,@RequestPart("file") MultipartFile file) {
    String message = "";
    String type = file.getContentType();
    String pdf = "application/pdf";
    //System.out.println(file.getContentType());
    if(!type.equals(pdf)){
      System.out.println("Not PDF");
      message = "File is not PDF file, Upload Failed";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
    }
    try {
      storageService.store(appId, file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "! " + e;
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
    }
  }

  @GetMapping("/files")
  public ResponseEntity<List<ImageFileResponse>> getListFiles() {
    List<ImageFileResponse> files = storageService.getAllFiles().map(dbFile -> {
      String fileDownloadUri = ServletUriComponentsBuilder
          .fromCurrentContextPath()
          .path("/api/file/files/")
          .path(dbFile.getId())
          .toUriString();

      return new ImageFileResponse(
          dbFile.getName(),
          fileDownloadUri,
          dbFile.getType(),
          dbFile.getData().length);
    }).collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(files);
  }

  @GetMapping("/files/{id}")
  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
    ImageFileDB fileDB = storageService.getFile(id);

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
        .body(fileDB.getData());
  }

  @GetMapping(value= "/list/app/img/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ImageFileResponse getImageByApplications(@PathVariable("id") Long appId) {
    List<ImageFileDB> files = storageService.findByApplication_Id(appId);
    String filetype = "image/jpeg";
    //System.out.println(files);
    ImageFileDB img = new ImageFileDB();
    for(int i=0;i<files.size();i++){
      if(files.get(i).getType().equals(filetype)){
        img = files.get(i);
        //System.out.println(img.getType());
        break;
      }
    }
    String fileDownloadUri = ServletUriComponentsBuilder
    .fromCurrentContextPath()
    .path("/api/file/files/")
    .path(img.getId())
    .toUriString();
    return new ImageFileResponse(
          img.getName(),
          fileDownloadUri,
          img.getType(),
          img.getData().length);
      //return("yes");
  
      //return ResponseEntity.status(HttpStatus.OK).body(files);
  }

  @GetMapping(value= "/list/app/pdf/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ImageFileResponse getPDFByApplications(@PathVariable("id") Long appId) {
    List<ImageFileDB> files = storageService.findByApplication_Id(appId);
    String filetype = "application/pdf";
    //System.out.println(files);
    ImageFileDB file = new ImageFileDB();
    for(int i=0;i<files.size();i++){
      if(files.get(i).getType().equals(filetype)){
        file = files.get(i);
        //System.out.println(img.getType());
        break;
      }
    }
    String fileDownloadUri = ServletUriComponentsBuilder
    .fromCurrentContextPath()
    .path("/api/file/files/")
    .path(file.getId())
    .toUriString();
    return new ImageFileResponse(
          file.getName(),
          fileDownloadUri,
          file.getType(),
          file.getData().length);
  }


  @GetMapping(value= "/test", produces = MediaType.TEXT_PLAIN_VALUE)
  public String testing(){
      return("yes");
  }




}