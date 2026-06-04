import { z } from "zod";

// ─────────────────────────────────────────────────────────
// 🛡️ WHY ZOD?
//
// JavaScript has NO runtime type checking.
// TypeScript types vanish after compilation — they're gone.
// So if an API sends bad data, your app crashes silently.
//
// Zod validates data AT RUNTIME — if it's wrong, it throws.
// Think of Zod as a security guard for your data. 💂
// ─────────────────────────────────────────────────────────

// ✅ Define a schema — the shape your data MUST follow
const UserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.number().min(18, "Must be 18 or older"),
    email: z.string().email("Invalid email format"),
    role: z.enum(["admin", "user", "editor"]),
});

// ─────────────────────────────────────────────────────────
// Example 1: ✅ Valid data — passes validation
// ─────────────────────────────────────────────────────────
const goodData = {
    name: "Sanidhya",
    age: 25,
    email: "sanidhya@example.com",
    role: "admin",
};

const result1 = UserSchema.safeParse(goodData);

if (result1.success) {
    console.log("✅ Valid:", result1.data);
} else {
    console.log("❌ Errors:", result1.error.issues);
}

// ─────────────────────────────────────────────────────────
// Example 2: ❌ Bad data — Zod catches every mistake
// ─────────────────────────────────────────────────────────
const badData = {
    name: "S",           // too short
    age: 15,             // under 18
    email: "not-email",  // invalid format
    role: "hacker",      // not in enum
};

const result2 = UserSchema.safeParse(badData);

if (result2.success) {
    console.log("✅ Valid:", result2.data);
} else {
    console.log("\n❌ Validation Errors:");
    result2.error.issues.forEach((issue) => {
        console.log(`   → ${issue.path.join(".")}: ${issue.message}`);
    });
}

// ─────────────────────────────────────────────────────────
// Example 3: 🔮 Infer TypeScript type FROM the schema
// ─────────────────────────────────────────────────────────
type User = z.infer<typeof UserSchema>;

// Now "User" is a real TypeScript type:
// {
//   name: string;
//   age: number;
//   email: string;
//   role: "admin" | "user" | "editor";
// }
//
// One schema → runtime validation + TypeScript type. No duplication.