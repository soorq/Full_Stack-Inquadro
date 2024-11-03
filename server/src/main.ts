import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as chalk from 'chalk';
import {
    HttpException,
    HttpStatus,
    Logger,
    ValidationPipe
} from '@nestjs/common';
// import * as csurf from 'csurf';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: false
    });

    const config = app.get(ConfigService);

    const PORT = config.get('PUBLIC_PORT');
    const DOMAIN = config.get('PUBLIC_DOMAIN');

    // app.use(csurf())

    /**
     * Sets the global prefix of the app to 'api' and enables CORS with specific configurations:
     */
    app.setGlobalPrefix('v1/api');

    /**
     * Adds the cookie parser middleware to the application for handling cookies.
     * Sets a global filter using CsrfFilter for handling CSRF protection.
     */
    app.use(cookieParser());

    /**
     * Adds a global validation pipe to the NestJS application with the option to transform the payload.
     */
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true }
        })
    );

    /**
     * Enable CORS for the NestJS application with specific configurations:
     * - Allows requests from specified origins in the MOCK_APP_URLS array
     * - Rejects requests from origins not in the MOCK_APP_URLS array with a 409 Conflict status
     * - Sets credentials to true
     * - Specifies allowed headers and methods for the CORS policy
     */
    app.enableCors({
        origin: ['https://soorq.ru', 'http://localhost:3000', 'www.soorq.ru'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    /**
     * Creates a Swagger document configuration using the DocumentBuilder with title 'Test-Api', tag 'test', version '1.0.0'.
     * Then creates a Swagger document using the configuration and sets up Swagger UI at '/api' endpoint in the app.
     */
    const CFG = new DocumentBuilder()
        .setTitle('Inquadro API`s')
        .setDescription('Документация по эндпойнтам для быстрой орентации.')
        .setVersion('1.0.0')
        // .addBearerAuth(
        //   {
        //     type: 'http',
        //     scheme: 'bearer',
        //     bearerFormat: 'JWT',
        //     name: 'JWT',
        //     description: 'Enter JWT token',
        //     in: 'header',
        //   },
        //   'JWT-auth',
        // )
        .build();

    const SWAGGER = SwaggerModule.createDocument(app, CFG);

    SwaggerModule.setup('docs', app, SWAGGER, {
        swaggerOptions: {
            tagsSorter: 'alpha',
            operationsSorter: 'alpha'
        }
    });

    // Listen port
    await app.listen(PORT);

    /**
     * Checks if the module is hot and performs specific actions if true.
     */
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    process.env.NODE_ENV === 'production'
        ? Logger.log(
              `🚀  Server ready at https://${DOMAIN}:${chalk
                  .hex('#87e8de')
                  .bold(`${PORT}`)}`,
              'Bootstrap'
          )
        : Logger.log(
              `🚀  Server is listening on port http://localhost:${chalk
                  .hex('#87e8de')
                  .bold(`${PORT}`)}`,
              'Bootstrap'
          );

    Logger.log(
        `🚀  Server documentation on that link http|s://${DOMAIN}:${chalk
            .hex('#87e8de')
            .bold(PORT)}/docs`,
        'Documentation'
    );
}

bootstrap().catch(e => {
    Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
    process.exit();
});
