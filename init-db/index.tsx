#!/usr/bin/env node

import React, { useEffect, useState } from "react";
import { render, Box, Text } from "ink";
import Spinner from "ink-spinner";
import chalk from "chalk";
import {
    initDatabase,
    createCollection,
    createAttributes,
} from "./src/appwriteInit";

// Optionally, check environment variables here before running the Ink app
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

const App = () => {
    const [currentTask, setCurrentTask] = useState<string>("Starting tasks...");
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs((prev) => [...prev, message]);
    };

    useEffect(() => {
        async function runTasks() {
            // Task 1: Initialize Database
            try {
                setCurrentTask("Initializing Appwrite Database...");
                const dbResult = await initDatabase();
                addLog(
                    chalk.green.bold(
                        `✔ Database created successfully: ${dbResult.$id}`,
                    ),
                );
            } catch (error: any) {
                addLog(
                    chalk.red(
                        `✖ Database initialization failed: ${error.message}`,
                    ),
                );
            }

            // Task 2: Create Collection
            try {
                setCurrentTask("Creating Collection...");
                await createCollection();
                addLog(
                    chalk.green.bold("✔ Collections created successfully."),
                );
            } catch (error: any) {
                addLog(
                    chalk.red(
                        `✖ Collection creation failed: ${error.message}`,
                    ),
                );
            }

            // Task 3: Create Attributes
            try {
                setCurrentTask("Creating attributes...");
                await createAttributes();
                addLog(
                    chalk.green.bold("✔ All attributes created successfully."),
                );
            } catch (error: any) {
                addLog(
                    chalk.red(
                        `✖ Attributes creation failed: ${error.message}`,
                    ),
                );
            }

            setCurrentTask("All tasks completed successfully.");
            // Allow some time for the user to see the final message, then exit.
            setTimeout(() => process.exit(0), 2000);
        }
        runTasks();
    }, []);

    return (
        <Box flexDirection="column" padding={1}>
            <Box marginBottom={1}>
                <Text>
                    <Spinner type="dots" /> {currentTask}
                </Text>
            </Box>
            <Box flexDirection="column">
                {logs.map((log, i) => (
                    <Box key={i}>
                        <Text>{log}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

render(<App />);
