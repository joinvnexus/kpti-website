/* eslint-disable @next/next/no-img-element */
import { ImagePlus, LayoutGrid, Trash2 } from "lucide-react";

import { createGalleryImage, deleteGalleryImage } from "./actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const galleryImages = await prisma.galleryImage.findMany({
    orderBy: { uploadedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/90 p-5 md:p-6">
        <h1 className="text-3xl font-bold text-foreground">Gallery Management</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Upload and organize campus photos for the public gallery section.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/80 bg-card/90 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ImagePlus className="h-5 w-5 text-primary" />
              Add New Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createGalleryImage} className="space-y-4" encType="multipart/form-data">
              <div className="space-y-2">
                <Label htmlFor="imageFile">Upload from Device</Label>
                <Input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  accept="image/*"
                />
                <p className="text-xs text-muted-foreground">
                  Accepted: JPG, PNG, WEBP. Max size 10 MB.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Image URL</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Keep this option if you want to add an external image link.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="caption">Caption (optional)</Label>
                <Input
                  id="caption"
                  name="caption"
                  placeholder="Campus training session"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Add either an image file or a direct image URL.
              </p>
              <Button type="submit" className="w-full">
                Save to Gallery
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/90 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <LayoutGrid className="h-5 w-5 text-primary" />
              Gallery Items ({galleryImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {galleryImages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No images yet. Add your first gallery image from the form.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-lg border border-border bg-background"
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={image.url}
                        alt={image.caption || "Gallery image"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-3 p-3">
                      <p className="line-clamp-2 text-sm font-medium text-foreground">
                        {image.caption || "No caption"}
                      </p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {image.url}
                      </p>
                      <form action={deleteGalleryImage.bind(null, image.id)}>
                        <Button
                          type="submit"
                          variant="destructive"
                          size="sm"
                          className="w-full"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
