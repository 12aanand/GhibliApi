package MiniProject.GhibliApi.service;

import MiniProject.GhibliApi.client.StabilityAiClient;
import MiniProject.GhibliApi.dto.TextToImageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class GhibliArtService {

    @Autowired
    private final StabilityAiClient stabilityAiClient;

    private String apiKey;

    public GhibliArtService(StabilityAiClient stabilityAiClient) {
        this.stabilityAiClient = stabilityAiClient;
    }

    public byte[] createGhibliArtFromText(String prompt, String style) {
        String finalPrompt = prompt + " in the beautiful, detailed anime style of studio ghibli.";
        String engineId = "stable-diffusion-xl-1024-v1-0"; // Updated to current recommended engine
        String stylePreset = style.equals("general") ? "anime" : style.replace("_", "-");

        // Create proper request payload
        TextToImageRequest request = new TextToImageRequest();

        // Create text prompt with weight
        TextToImageRequest.TextPrompt textPrompt = new TextToImageRequest.TextPrompt();
        textPrompt.setText(finalPrompt);
        textPrompt.setWeight(1.0f);

        request.setText_prompts(List.of(textPrompt));
        request.setSteps(50); // Quality setting
        request.setStyle_preset(stylePreset);

        // Call the correct text-to-image endpoint
        return stabilityAiClient.generateImageFromText(
                "Bearer " + apiKey, // Note the space after Bearer
                engineId,
                request
        ).getBody();
    }

    public byte[] createGhibliArt(MultipartFile image, String prompt) throws IOException {
        String engineId = "stable-diffusion-xl-1024-v1-0";
        String finalPrompt = prompt + " in the beautiful, detailed anime style of studio ghibli.";
        String stylePreset = "anime";

        // Create proper text prompts JSON
        String textPromptsJson = "[{\"text\":\"" + finalPrompt + "\",\"weight\":1}]";

        return stabilityAiClient.generateImageFromImage(
                "Bearer " + apiKey,
                engineId,
                image,
                textPromptsJson,
                stylePreset
        ).getBody();
    }
}