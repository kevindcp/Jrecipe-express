const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jrecipe API",
      version: "1.0.0",
      description:
        "Simple API for the Jrecipe app developed with express, typescript and documented with Swagger",
      license: {
        name: "GPLv3",
        url: "https://www.gnu.org/licenses/gpl-3.0.en.html",
      },
      contact: {
        name: "Kevin Chacon",
        email: "kevindchaconp@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
      },
    ],
  },
  apis: ["./routes/*Routes.ts"],
};

export default swaggerOptions