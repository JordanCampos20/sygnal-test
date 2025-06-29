namespace sygnal.Utils;

public static class ConfigUtil
{
    public static string? DatabaseConnection
    {
        get
        {
            return Environment.GetEnvironmentVariable("DATABASE")
                ?? Environment.GetEnvironmentVariable("DATABASE_sygnal");
        }
    }
}