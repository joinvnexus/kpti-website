import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us - KPTI",
  description: "Get in touch with Kulaura Professional Technology Institute.",
};

export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">যোগাযোগ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">আমাদের ঠিকানা</h2>
            <div className="flex items-start space-x-3 text-slate-600">
              <MapPin className="w-5 h-5 mt-1 shrink-0" />
              <p>
                Kulaura Professional Technology Institute (KPTI) <br />
                Kulaura, Moulvibazar, Sylhet <br />
                BTEB Code: 62040
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">ফোন ও ইমেইল</h2>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>01777-301073</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>01797-755856</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>kptibd@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Map Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14546.992211475757!2d92.0308!3d24.5205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751755100000001%3A0x0!2zMjTCsDMxJzEzLjgiTiA5MsKwMDEnNTAuOSJF!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg shadow-sm"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">মেসেজ পাঠান</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">নাম</label>
              <Input placeholder="আপনার নাম" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ফোন / ইমেইল</label>
              <Input placeholder="আপনার যোগাযোগের মাধ্যম" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">মেসেজ</label>
              <Textarea placeholder="কি জানতে চান..." rows={4} />
            </div>
            <Button className="w-full">বার্তা পাঠান</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
