package MiniProject.GhibliApi.client;

import MiniProject.GhibliApi.config.FeignConfig;
import MiniProject.GhibliApi.dto.TextToImageRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(
        name = "stabilityAiClient",
        url = "${stability.api.base-url}",
        configuration = FeignConfig.class
)
public interface StabilityAiClient {

    @PostMapping(
            value = "/v1/generation/{engine_id}/text-to-image",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.IMAGE_PNG_VALUE
    )
    ResponseEntity<byte[]> generateImageFromText(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable("engine_id") String engineId,
            @RequestBody TextToImageRequest request
    );

    @PostMapping(
            value = "/v1/generation/{engine_id}/image-to-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.IMAGE_PNG_VALUE
    )
    ResponseEntity<byte[]> generateImageFromImage(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable("engine_id") String engineId,
            @RequestPart("init_image") MultipartFile initImage,
            @RequestPart("text_prompts") String textPromptsJson,
            @RequestPart(value = "style_preset", required = false) String stylePreset
    );
}