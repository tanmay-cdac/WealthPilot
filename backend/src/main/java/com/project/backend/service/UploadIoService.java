package com.project.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

@Service
public class UploadIoService {

    @Value("${bytescale.accountId}")
    private String accountId;

    @Value("${bytescale.apiKey}")
    private String apiKey;

    public String uploadFile(MultipartFile file) {
        try {
            // Determine original file name and extension
            String originalName = file.getOriginalFilename();
            if (originalName == null || !originalName.contains(".")) {
                originalName = "report_" + System.currentTimeMillis() + ".pdf";
            }

            // Upload URL for Bytescale
            String uploadUrl = "https://api.bytescale.com/v2/accounts/" + accountId + "/uploads/binary";

            URI uri = new URI(uploadUrl);
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");

            // Set headers
            connection.setRequestProperty("Authorization", "Bearer " + apiKey);
            connection.setRequestProperty("Content-Type", 
                file.getContentType() != null ? file.getContentType() : "application/pdf");
            connection.setRequestProperty("X-File-Name", originalName);

            // Write file bytes
            try (OutputStream outputStream = connection.getOutputStream()) {
                outputStream.write(file.getBytes());
            }

            // Read response
            String json;
            try (InputStream responseStream = connection.getInputStream()) {
                json = new String(responseStream.readAllBytes());
            }

            // Extract file URL from JSON response
            String fileUrl = json.split("\"fileUrl\":\"")[1].split("\"")[0];

            // Append the correct extension if Bytescale doesn't preserve it
            String extension = originalName.substring(originalName.lastIndexOf('.'));
            if (!fileUrl.endsWith(extension)) {
                fileUrl = fileUrl + extension;
            }

            return fileUrl;

        } catch (Exception e) {
            throw new RuntimeException("Bytescale upload failed: " + e.getMessage(), e);
        }
    }
}
