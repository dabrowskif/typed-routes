#!/usr/bin/env node

import { Program } from "./program";

const program = new Program(process.argv);
program.run();
