export const corsOptions = {
    credentials: true,
    origin:
        process.env.NODE_ENV === "production"
            ? "https://beautyassistant.netlify.app"
            : "http://localhost:3000"
}
