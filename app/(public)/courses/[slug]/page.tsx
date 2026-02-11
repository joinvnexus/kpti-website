interface CoursePageProps {
  params: { slug: string };
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Course: {params.slug}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        পরবর্তীতে এখানে ডাটাবেস থেকে এই কোর্সের বিস্তারিত তথ্য দেখানো হবে।
      </p>
    </section>
  );
}



