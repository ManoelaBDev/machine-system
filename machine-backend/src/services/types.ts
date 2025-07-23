import { Enterprise, User } from "@prisma/client"

export namespace Get {
  export type Args = {
    enterpriseId: Enterprise["id"];
    userId: User["id"];
  }
}
