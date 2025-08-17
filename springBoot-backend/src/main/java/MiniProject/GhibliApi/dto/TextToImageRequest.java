package MiniProject.GhibliApi.dto;

import java.util.List;

public class TextToImageRequest {
    private List<TextPrompt> text_prompts;
    private Integer height = 512;
    private Integer width = 512;
    private Integer steps = 50;
    private String style_preset;

    public static class TextPrompt {
        private String text;
        private Float weight = 1.0f;

        // Getters and setters
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public Float getWeight() { return weight; }
        public void setWeight(Float weight) { this.weight = weight; }
    }

    // Getters and setters
    public List<TextPrompt> getText_prompts() { return text_prompts; }
    public void setText_prompts(List<TextPrompt> text_prompts) {
        this.text_prompts = text_prompts;
    }
    public Integer getHeight() { return height; }
    public void setHeight(Integer height) { this.height = height; }
    public Integer getWidth() { return width; }
    public void setWidth(Integer width) { this.width = width; }
    public Integer getSteps() { return steps; }
    public void setSteps(Integer steps) { this.steps = steps; }
    public String getStyle_preset() { return style_preset; }
    public void setStyle_preset(String style_preset) {
        this.style_preset = style_preset;
    }
}