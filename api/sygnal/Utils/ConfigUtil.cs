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

    public static string CorsName
    {
        get
        {
            return "SygnalCors";
        }
    }

    public static string CorsUrl
    {
        get
        {
            return "https://sygnal.jasmim.dev";
        }
    }
}