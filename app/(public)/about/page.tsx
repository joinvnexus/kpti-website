export const metadata = {
  title: "About Us - KPTI",
  description: "Learn about Kulaura Professional Technology Institute (KPTI).",
};

export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About KPTI</h1>
      <div className="prose lg:prose-xl text-slate-700">
        <p>
          <strong>Kulaura Professional Technology Institute (KPTI)</strong> is a
          premier technical training center located in Kulaura, Moulvibazar. We
          are approved by the <strong>Bangladesh Technical Education Board (BTEB)</strong>,
          Institute Code: <strong>62040</strong>.
        </p>
        <p className="mt-4">
          Our mission is to empower the youth with practical computer skills and
          spoken English proficiency, enabling them to succeed in the global job
          market and freelancing industry.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>BTEB Approved Certification</li>
          <li>Experienced Instructors</li>
          <li>Modern Computer Lab</li>
          <li>Job & Internship Support</li>
          <li>Spoken English for Career Growth</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Location</h2>
        <p>
          We are conveniently located in the heart of Kulaura town. Visit us to see our
          facilities.
        </p>
        <div className="mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14546.992211475757!2d92.0308!3d24.5205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751755100000001%3A0x0!2zMjTCsDMxJzEzLjgiTiA5MsKwMDEnNTAuOSJF!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="KPTI Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
