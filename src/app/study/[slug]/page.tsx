import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import studiesData from "@/data/studies.json";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return studiesData.studies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = studiesData.studies.find((s) => s.slug === slug);
  return {
    title: study ? `${study.title} — MISAAL` : "MISAAL",
  };
}

export default async function StudyPage({ params }: Props) {
  const { slug } = await params;
  const study = studiesData.studies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.imageContainer}>
            {study.imageUrl && (
              <Image
                src={study.imageUrl}
                alt={study.imageAlt}
                fill
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{study.title}</h1>
            <div className={styles.bodyContent}>
              <p className={styles.code}>{study.code}</p>
              {study.paragraphs.map((para, index) => (
                <p key={index} className={styles.paragraph}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
