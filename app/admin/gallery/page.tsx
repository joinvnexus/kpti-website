import { ImagePlus, LayoutGrid } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/90 p-5 md:p-6">
        <h1 className="text-3xl font-bold text-foreground">Gallery Management</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Upload and organize campus photos for the public gallery section.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ImagePlus className="h-5 w-5 text-primary" />
              Upload Images
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Supabase storage upload controls can be added here to manage image assets.
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <LayoutGrid className="h-5 w-5 text-primary" />
              Gallery Items
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Thumbnail list, caption editing, and delete actions can be managed from this panel.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
