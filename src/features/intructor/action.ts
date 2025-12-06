"use server";

import { deleteCourse } from "@/services/course.service";
import { revalidatePath } from "next/cache";

export const deleteCourseAction = async (id: string) => {
  await deleteCourse(id);
  revalidatePath("/intructor/courses");
};
