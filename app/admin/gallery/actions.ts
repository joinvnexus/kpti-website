"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

const galleryImageSchema = z.object({
  url: z.string().optional(),
  caption: z
    .string()
    .max(160, "Caption can be at most 160 characters.")
    .optional(),
});

const maxUploadSize = 10 * 1024 * 1024; // 10 MB

function normalizeCaption(value: string | undefined): string | null {
  const caption = value?.trim();
  return caption ? caption : null;
}

function extractStoragePathFromPublicUrl(url: string, bucket: string): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  if (!url.includes(marker)) {
    return null;
  }

  const path = url.split(marker)[1]?.split("?")[0];
  return path ? decodeURIComponent(path) : null;
}

export async function createGalleryImage(formData: FormData) {
  const raw = {
    url: formData.get("url"),
    caption: formData.get("caption"),
  };
  const imageFile = formData.get("imageFile");

  const parsed = galleryImageSchema.safeParse({
    url: typeof raw.url === "string" ? raw.url.trim() : "",
    caption: typeof raw.caption === "string" ? raw.caption.trim() : undefined,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid gallery data.");
  }

  const urlInput = parsed.data.url?.trim() || "";
  const file =
    imageFile instanceof File && imageFile.size > 0 ? imageFile : null;

  if (!file && !urlInput) {
    throw new Error("Please upload an image file or provide a valid image link.");
  }

  if (file) {
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }
    if (file.size > maxUploadSize) {
      throw new Error("Image must be smaller than 10 MB.");
    }
  }

  let finalUrl = urlInput;

  if (file) {
    const supabase = getSupabaseAdminClient();
    const fileExt =
      file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const filePath = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(data.path);
    finalUrl = urlData.publicUrl;
  } else {
    const urlValidation = z.string().url("Please enter a valid image URL.");
    const validatedUrl = urlValidation.safeParse(finalUrl);
    if (!validatedUrl.success) {
      throw new Error(validatedUrl.error.issues[0]?.message || "Invalid image URL.");
    }
  }

  await prisma.galleryImage.create({
    data: {
      url: finalUrl,
      caption: normalizeCaption(parsed.data.caption),
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: number) {
  const image = await prisma.galleryImage.findUnique({
    where: { id },
    select: { url: true },
  });

  if (!image) {
    return;
  }

  const storagePath = extractStoragePathFromPublicUrl(image.url, "gallery");
  if (storagePath) {
    try {
      const supabase = getSupabaseAdminClient();
      await supabase.storage.from("gallery").remove([storagePath]);
    } catch {
      // Ignore storage removal errors and continue DB cleanup.
    }
  }

  await prisma.galleryImage.delete({
    where: { id },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/");
  revalidatePath("/gallery");
}
