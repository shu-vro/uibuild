#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import {
    createAttributes,
    createCollection,
    initDatabase,
} from "./src/appwriteInit.ts";

// Check for required environment variables
if (
    !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT ||
    !process.env.APPWRITE_SERVER_API_KEY
) {
    console.error(
        chalk.red(
            "Missing required environment variables:\n" +
                "  NEXT_PUBLIC_APPWRITE_ENDPOINT\n" +
                "  NEXT_PUBLIC_APPWRITE_PROJECT\n" +
                "  APPWRITE_SERVER_API_KEY",
        ),
    );
    process.exit(1);
} else {
    console.log(chalk.green("Environment variables are set correctly."));
}

const program = new Command();

program.version("1.0.0").description("Appwrite DB initializer CLI Tool");

program
    .command("init")
    .description("Initialize the Appwrite database, collections and attributes")
    .action(async () => {
        try {
            const dbSpinner = ora({
                text: "Initializing Appwrite Database...",
                color: "blue",
            }).start();
            const dbResult = await initDatabase();
            dbSpinner.succeed(
                chalk.green("Database created successfully: ") + dbResult.$id,
            );

            console.log(chalk.green.bold("All tasks completed successfully."));
        } catch (error: any) {
            ora().fail(
                chalk.red("Database initialization failed:", error.message),
            );
        }

        try {
            const collectionSpinner = ora({
                text: "Creating Collection...",
                color: "blue",
            }).start();
            const collectionResult = await createCollection();
            collectionSpinner.succeed(
                chalk.green("Collections created successfully: "),
            );
        } catch (error: any) {
            ora().fail(chalk.red("Collection creation failed:", error.message));
        }

        try {
            const collectionSpinner = ora({
                text: "Creating attributes...",
                color: "blue",
            }).start();
            await createAttributes();
            collectionSpinner.succeed(
                chalk.green("All attributes created successfully: "),
            );
        } catch (error: any) {
            ora().fail(chalk.red("attributes creation failed:", error.message));
        }

        process.exit(0);
    });

program.parse(process.argv);
