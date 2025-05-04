import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

// .index("by_clerk_id", ["clerkId"]) → Adds a searchable index on the clerkId field.

// Makes queries like WHERE clerkId = ? fast and efficient.

// Helpful when mapping Clerk-authenticated users to your own user data.

// Example: users Table
// id	name	    email	             image	                     clerkId
// 1	Alice Doe	alice@example.com	 https://img.com/alice.png	 clerk123
// 2	Bob Smith	bob@example.com	   (null)	                     clerk456
// 3	Carol Kim	carol@example.com	 https://img.com/carol.jpg	 clerk789

// Index: "by_clerk_id" on clerkId
// This index tells the database:

// "Hey, I'm going to frequently search by clerkId, so keep an optimized map for that."

// So a query like:
// db.users
//   .where("by_clerk_id")
//   .equals("clerk456")
// Would quickly find Bob Smith, because the database doesn't have to scan the whole table — it uses the index

  plans: defineTable({
    userId: v.string(),
    name: v.string(),
    workoutPlan: v.object({
      schedule: v.array(v.string()),
      exercises: v.array(
        v.object({
          day: v.string(),
          routines: v.array(
            v.object({
              name: v.string(),
              sets: v.optional(v.number()),
              reps: v.optional(v.number()),
              duration: v.optional(v.string()),
              description: v.optional(v.string()),
              exercises: v.optional(v.array(v.string())),
            })
          ),
        })
      ),
    }),
    dietPlan: v.object({
      dailyCalories: v.number(),
      meals: v.array(
        v.object({
          name: v.string(),
          foods: v.array(v.string()),
        })
      ),
    }),
    isActive: v.boolean(),
  })
    .index("by_user_id", ["userId"])
    .index("by_active", ["isActive"]),
});
