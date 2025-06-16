"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const dist_1 = require("../../dist");
async function POST() {
    try {
        const password = await (0, dist_1.generatePassword)({
            length: 16,
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true
        });
        return server_1.NextResponse.json({ password });
    }
    catch (error) {
        return server_1.NextResponse.json({ error: 'Failed to generate password' }, { status: 500 });
    }
}
