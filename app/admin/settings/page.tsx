import { CreditCard, Globe, School, Settings2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/90 p-5 md:p-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Manage institute information, payment configuration, and public site behavior.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <School className="h-5 w-5 text-primary" />
              Institute Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Update institute name, address, contact details, and key profile information.
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Configure bKash merchant credentials and payment callback behavior.
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Globe className="h-5 w-5 text-primary" />
              SEO and Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Manage global title templates, descriptions, and social share settings.
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Settings2 className="h-5 w-5 text-primary" />
              System Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Add future controls for admin preferences, backups, and maintenance mode.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
