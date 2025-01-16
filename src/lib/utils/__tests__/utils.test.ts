import { generateUUID, isUUID } from "../uuid";

describe("UUID Utils", () => {
  describe("isUUID", () => {
    it("should return true for valid UUIDs", () => {
      const validUUIDs = [
        "123e4567-e89b-4d3c-b456-556642440000",
        "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      ];

      validUUIDs.forEach((uuid) => {
        expect(isUUID(uuid)).toBe(true);
      });
    });

    it("should return false for invalid UUIDs", () => {
      const invalidUUIDs = [
        "",
        "not-a-uuid",
        "123e4567-e89b-1d3c-b456-556642440000", // wrong version number
        "123e4567-e89b-4d3c-x456-556642440000", // invalid character
        "123e4567-e89b-4d3c-b456-55664244000", // too short
        "123e4567-e89b-4d3c-b456-5566424400000", // too long
      ];

      invalidUUIDs.forEach((uuid) => {
        expect(isUUID(uuid)).toBe(false);
      });
    });
  });

  describe("generateUUID", () => {
    it("should generate valid UUID v4 strings", () => {
      // Test multiple generations to ensure consistency
      for (let i = 0; i < 1000; i++) {
        const uuid = generateUUID();
        expect(isUUID(uuid)).toBe(true);

        // Check specific UUID v4 characteristics
        expect(uuid.charAt(14)).toBe("4"); // Version 4
        expect(["8", "9", "a", "b", "A", "B"]).toContain(uuid.charAt(19)); // Variant 1
      }
    });

    it("should generate unique UUIDs", () => {
      const uuids = new Set();
      // Generate 1000 UUIDs and ensure they're all unique
      for (let i = 0; i < 1000; i++) {
        const uuid = generateUUID();
        expect(uuids.has(uuid)).toBe(false);
        uuids.add(uuid);
      }
    });
  });
});
