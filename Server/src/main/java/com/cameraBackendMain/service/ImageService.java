package com.cameraBackendMain.service;

import org.springframework.stereotype.Service;

@Service
public class ImageService {

    public String processImage(String imageData) {
        // Call Python ML model and process predictions
        // Return results
        return "Prediction results";
    }
}