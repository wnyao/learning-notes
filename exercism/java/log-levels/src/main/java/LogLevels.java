import java.lang.String;

public class LogLevels {
  public static String message(String logLine) {
    int colonIndex = logLine.indexOf(' ');
    return logLine.substring(colonIndex).trim();
  }

  public static String logLevel(String logLine) {
    String type = logLine.substring(logLine.indexOf('[') + 1, logLine.indexOf(']'));
    return type.toLowerCase();
  }

  public static String reformat(String logLine) {
    String type = logLevel(logLine);
    String msg = message(logLine);
    return msg + " (" + type + ")";
  }
}
