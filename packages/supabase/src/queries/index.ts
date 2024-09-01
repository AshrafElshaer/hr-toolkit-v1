import { logger } from "@v1/logger";

export async function getUser() {
  // const supabase = createClient();

  // try {
  //   const result = await supabase.auth.getUser();

  //   return result;
  // } catch (error) {
  //   logger.error(error);

  //   throw error;
  // }
  return {
    data: {
      user: {
        id: "123",
        email: "test@test.com",
        name: "Test",
      },
    },
  };
}

export async function getUsers() {
  // const supabase = createClient();

  // try {
  //   const result = await supabase.from("users").select("*");

  //   return result;
  // } catch (error) {
  //   logger.error(error);

  //   throw error;
  // }
  return {
    data: [
      {
        id: "123",
        email: "test@test.com",
        name: "Test",
      },
    ],
  };
}
