package MiniProject.GhibliApi.controller;

import MiniProject.GhibliApi.dto.TextGenerationRequestDTO;
import MiniProject.GhibliApi.service.GhibliArtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class GenerationController {

    @Autowired
    private final GhibliArtService ghibliArtService;


    public GenerationController(GhibliArtService ghibliArtService) {
        this.ghibliArtService = ghibliArtService;
    }
    @PostMapping(value = "/generate",produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateGhibliArt(@RequestParam("image")MultipartFile image,
                                                    @RequestParam("prompt") String prompt){
        try {
            byte[] imageBytes = ghibliArtService.createGhibliArt(image, prompt);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/generate-from-text",produces = MediaType.IMAGE_PNG_VALUE )
    public ResponseEntity<byte[]> generateGhibliFromText(@RequestBody TextGenerationRequestDTO requestDTO){

        try {
             byte[] imageBytes = ghibliArtService.createGhibliArtFromText(requestDTO.getPrompt(), requestDTO.getStyle() );
             return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
