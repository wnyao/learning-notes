import java.util.ArrayList;
import java.util.List;

public class LanguageList {
    private final List<String> languages = new ArrayList<>();

    public boolean isEmpty() {
      return this.languages.size() == 0;
    }

    public void addLanguage(String language) {
      this.languages.add(language);
    }

    public void removeLanguage(String language) {
      int index = this.languages.indexOf(language);
      this.languages.remove(index);
    }

    public String firstLanguage() {
      return this.languages.getFirst();
    }

    public int count() {
      return this.languages.size();
    }

    public boolean containsLanguage(String language) {
      return this.languages.contains(language);
    }

    public boolean isExciting() {
      return this.languages.contains("Java") || this.languages.contains("Kotlin");
    }
}
