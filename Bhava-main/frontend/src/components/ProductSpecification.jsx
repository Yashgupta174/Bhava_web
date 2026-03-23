import styles from "./ProductSpecification.module.css";

function ProductSpecification() {
  const specs = [
    {
      id: 0,
      title: "Temple Blessed",
      description: "Sourced from authentic temple partnerships with 500+ years of spiritual tradition",
      image: "/Temple Blessed.png"
    },
    {
      id: 1,
      title: "100% Authentic",
      description: "Pure ingredients, no synthetic additives—crafted with sacred intention",
      image: "/Authetic.png"
    },
    {
      id: 2,
      title: "Premium Quality",
      description: "Ultra-premium positioning for the devoted who value excellence",
      image: "/Premium Quality.png"
    }
  ];

  return (
    <div className={styles.productSpecificationSection}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.row}>
          {specs.map((spec) => (
            <div key={spec.id} className={styles.col}>
              <div className={styles.specCard}>
                <div className={styles.specImageContainer}>
                  <img src={spec.image} alt={spec.title} />
                </div>
                <div className={styles.specContent}>
                  <h3 className={styles.specTitle}>{spec.title}</h3>
                  <p className={styles.specDescription}>{spec.description}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSpecification;
