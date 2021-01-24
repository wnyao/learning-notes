import java.nio.file.Path;
import java.nio.file.Paths;

public class DBConnection {
    private static String connectionPath = "/home/ubuntu/workspace/creds.zip";
    private static String username = "KVUser";
    private static String password = "KVPassword";

    public static Path getConnectionPath() {
        return Paths.get(connectionPath);
    }

    public static String getUsername() {
        return username;
    }

    public static String getPassword() {
        return password;
    }
}
