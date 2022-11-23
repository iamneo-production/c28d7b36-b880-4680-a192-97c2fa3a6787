package com.examly.springapp.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "imagefiles")
public class ImageFileDB {
  @Id
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid2")
  private String id;

  private String name;

  private String type;

  @Lob
  private byte[] data;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "app_id", referencedColumnName = "id")
  private Application application;


  public ImageFileDB() {
  }



  public ImageFileDB(String name, String type, byte[] data, Application application) {
    this.name = name;
    this.type = type;
    this.data = data;
    this.application = application;
}



public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public byte[] getData() {
    return data;
  }

  public void setData(byte[] data) {
    this.data = data;
  }



  public Application getApplication() {
    return application;
  }



  public void setApplication(Application application) {
    this.application = application;
  }

}