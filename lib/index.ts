#!/usr/bin/env node

import { PROGRAM_OPTIONS } from "./modules/program/cli/cli";
import { Program } from "./modules/program/program";

new Program(PROGRAM_OPTIONS).run();
