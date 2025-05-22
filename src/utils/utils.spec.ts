import { colorGenerator, setCurrentUser } from "./utils";
import { describe, it, expect, afterEach } from 'vitest'

describe("colorGenerator", () => {
  it("Generate an HSL color based on id", () => {
    const id = 10;
    const result = colorGenerator(id);
    
    const expectedHue = (id * 137.508) % 360;
    const expectedColor = `hsl(${expectedHue.toFixed(0)}, 70%, 50%)`;

    expect(result).toBe(expectedColor);
  });

  it("if id is 0, returns hsl with hue 0", () => {
    expect(colorGenerator(0)).toBe("hsl(0, 70%, 50%)");
  });
});

describe("setCurrentUser", () => {
  afterEach(() => {
    localStorage.clear();
  });

	it("should create user and posts in localStorage if they don't exist", () => {
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("posts")).toBeNull();

    const user = setCurrentUser();

    expect(localStorage.getItem("user")).not.toBeNull();
    expect(localStorage.getItem("posts")).not.toBeNull();

    const userStorage = JSON.parse(localStorage.getItem("user")!);
    expect(userStorage).toMatchObject(user);
    expect(JSON.parse(localStorage.getItem("posts")!)).toEqual([]);
  });

	it("should not overwrite user or posts if they already exist", () => {
    const storedUser = { id: 1, name: "Stored User" };
    const storedPosts = [{ id: 1, content: "Hola" }];
    localStorage.setItem("user", JSON.stringify(storedUser));
    localStorage.setItem("posts", JSON.stringify(storedPosts));

    const user = setCurrentUser();

    expect(localStorage.getItem("user")).toBe(JSON.stringify(storedUser));
    expect(localStorage.getItem("posts")).toBe(JSON.stringify(storedPosts));
  });
});
