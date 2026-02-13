import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for storage operations (gallery images, uploaded files)
 * Note: Database operations use Prisma ORM with pooled connection
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Helper function to upload file to Supabase Storage
 * @param bucket - Storage bucket name (e.g., 'gallery', 'files')
 * @param path - File path in bucket
 * @param file - File object or Blob
 */
export async function uploadToSupabaseStorage(
  bucket: string,
  path: string,
  file: File | Blob
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return {
    path: data.path,
    url: urlData.publicUrl,
  };
}

