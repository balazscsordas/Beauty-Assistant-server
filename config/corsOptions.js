export const corsOptions = {
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin:
        process.env.NODE_ENV === "production"
            ? "https://beautyassistant.netlify.app"
            : "http://localhost:3000"
}
