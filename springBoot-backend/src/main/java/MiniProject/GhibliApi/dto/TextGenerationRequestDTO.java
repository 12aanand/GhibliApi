package MiniProject.GhibliApi.dto;

public class TextGenerationRequestDTO {

    private String prompt;
    private String style;

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }
}
