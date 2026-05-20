import React from "react";
import styles from "./page.module.css";
import Footer from "@/components/Footer";

function page() {
  return (
    <div className={styles.peopleRoot}>
      <main className={styles.main}>
        <div className={styles.people}>people page here</div>
      </main>
      <Footer />
    </div>
  );
}

export default page;
