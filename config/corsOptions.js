export const corsOptions = {
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin:
        process.env.NODE_ENV === "production"
            ? "https://beautyassistant.hu"
            : "http://localhost:3000"
}
