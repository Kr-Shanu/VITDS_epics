package com.cameraBackendMain.controller;

import com.cameraBackendMain.service.ImageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@Log4j2
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/processImage")
    public String processImage(@RequestBody String imageData) {
        // Forward imageData to imageService
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        log.info("Image received at "+ dtf.format(now));
        log.info("Image received = "+ imageData.substring(0, 70));
        return "Got your image @ "+ dtf.format(now);
//        return imageService.processImage(imageData);
    }
}