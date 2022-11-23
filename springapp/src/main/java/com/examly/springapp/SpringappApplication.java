package com.examly.springapp;

import javax.annotation.Resource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;

import com.examly.springapp.services.ImageFileDBService;

@SpringBootApplication
public class SpringappApplication {
	@Resource
	ImageFileDBService storageService;

	public static void main(String[] args) {
		SpringApplication.run(SpringappApplication.class, args);
	}

	// //@Override
	// public void run(String... arg) throws Exception {
	//   //storageService.deleteAll();
	//   storageService.init();
	// }

}
